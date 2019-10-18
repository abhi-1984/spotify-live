import React, { Fragment } from 'react';
import './App.css';
import styled from 'styled-components';
import axios from 'axios';
import { SpotifyApiContext } from 'react-spotify-api';
import Login from './pages/Login';
import Home from './pages/Home';
import Vibrant from 'node-vibrant';
import { Switch, Route, Redirect } from 'react-router-dom';

const AppWrapper = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${props =>
    props.backDrop
      ? props.backDrop
      : `linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgb(0, 0, 0)),
    linear-gradient(90deg, rgb(255, 0, 136), rgb(0, 153, 255))`};
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    z-index: -1;
  }
`;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      user: null,
      deviceId: null,
      isLoggedIn: false,
      error: '',
      isRepeatModeOn: false,
      playing: false,
      position: 0,
      duration: 1,
      playingInfo: null,
      positionSliderValue: 50,
      volumeSliderValue: 50,
      positionTimestamp: '00:00',
      durationTimestamp: '00:00',
      player_init_error: false,
      favouriteTrackURIS: [],
      favouriteTracks: [],
      isSiderbarOpen: false,
      topTracks: [],
      topTracksURIS: [],
      backDrop: '',
    };
    this.playerCheckInterval = null;
  }

  setBackgroundImage = url => {
    Vibrant.from(url)
      .getPalette()
      .then(palette => {
        let rgb = palette.DarkMuted._rgb.join(',');
        let rgb2 = palette.DarkVibrant._rgb.join(', ');
        let color = 'rgba(' + rgb + ', 0.24)';
        let color2 = 'rgba(' + rgb2 + ', 0.32)';

        let bgImage = `linear-gradient(${color}, ${color2} 85%)`;
        console.log('bg image is ', bgImage);
        this.setState({ backDrop: bgImage });
      });
  };

  getHashParams = () => {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  };

  handleLogin = () => {
    const { token } = this.state;
    if (token !== '') {
      this.setState({ isLoggedIn: true });
      this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
    }
  };

  setupUserAndAccessToken = () => {
    let params = this.getHashParams();
    const { user } = this.state;
    if (!user) {
      if ('access_token' in params) {
        axios
          .get('https://api.spotify.com/v1/me', {
            headers: {
              Authorization: `Bearer ${params.access_token}`,
            },
          })
          .then(response => {
            let user = {
              access_token: params.access_token,
              displayName: response.data.display_name,
              email: response.data.email,
              id: response.data.id,
              type: response.data.type,
              country: response.data.country,
              avatar: response.data.images[0].url,
            };
            this.setState({
              user,
              token: user.access_token,
            });
            this.handleLogin();
            this.fetchUserTracks();
            this.fetchTopTracks();
          })

          .catch(err => console.log(err));
      } else {
        window.location = window.location.href =
          'https://accounts.spotify.com/authorize?client_id=1de3c263e4104300871dc8963f1314dc&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-modify-playback-state%20user-read-private%20user-read-email%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/home/';
      }
    }
  };

  checkForPlayer = () => {
    const { token } = this.state;

    if (window.Spotify) {
      clearInterval(this.playerCheckInterval);
      this.player = new window.Spotify.Player({
        name: 'Spotify Live',
        getOAuthToken: cb => {
          cb(token);
        },
      });
    }

    if (this.player) {
      this.createEventHandlers();
      this.player.connect();
    }
  };

  createEventHandlers = () => {
    this.player.on('initialization_error', e => {
      console.error('Initialization error ', e);
      this.setState({ player_init_error: true });
    });
    this.player.on('authentication_error', e =>
      console.error('Authentication error ', e),
    );
    this.player.on('account_error', e => console.error('Account error ', e));
    this.player.on('playback_error', e => console.error('Playback error ', e));

    this.player.on('player_state_changed', state => {
      if (state) {
        let { duration, position } = state;
        let value = (position * 100) / duration;
        this.setState({
          playingInfo: state,
          playing: !state.paused,
          positionSliderValue: value,
        });
        if (this.props.isPlaying === state.paused) {
          this.props.setIsPlaying(!state.paused);
        }
      }
    });

    this.player.on('ready', data => {
      let { device_id } = data;
      this.setState({ deviceId: device_id }, () => {
        this.transferPlaybackHere();
      });
      this.player.getVolume().then(volumeIntensity => {
        let volume = volumeIntensity * 100;
        this.setState({ volumeSliderValue: volume });
      });
      this.positionCheckInterval = setInterval(() => {
        this.checkChangePosition();
      }, 1000);
    });
  };

  checkChangePosition = () => {
    this.player.getCurrentState().then(state => {
      if (state && this.state.playing) {
        let { duration, position } = state;
        let positionSliderValue = (position * 100) / duration;

        if (positionSliderValue !== this.state.positionSliderValue) {
          this.setState({
            positionSliderValue,
          });
        }

        let positionTimestamp = this.milisToMinutesAndSeconds(state.position);
        let durationTimestamp = this.milisToMinutesAndSeconds(state.duration);
        this.setState({ positionTimestamp, durationTimestamp });
      }
    });
  };

  transferPlaybackHere = () => {
    const { token } = this.state;

    fetch('https://api.spotify.com/v1/me/player', {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        play: false,
        device_ids: [this.state.deviceId],
      }),
    });
  };

  onPrevClick = () => {
    this.player.previousTrack();
    this.setState({ isRepeatModeOn: false });
  };

  onPlayClick = () => {
    this.player.togglePlay();
  };

  onNextClick = () => {
    this.player.nextTrack();
    this.setState({ isRepeatModeOn: false });
  };

  onSeekSliderChange = (e, value) => {
    let duration = this.state.playingInfo.duration;
    let seek = Math.floor((value * duration) / 100);
    this.setState({ positionSliderValue: value });
    this.player.seek(seek).then(() => {
      console.log(`Seek song to ${seek} ms`);
    });
  };

  onVolumeSliderChange = (e, value) => {
    console.log('volume e is ', e, ' and value is ', value);
    let volume = value / 100;
    this.setState({ volumeSliderValue: value });
    this.player.setVolume(volume);
  };

  toggleRepeat = uri => {
    fetch('https://api.spotify.com/v1/me/player/repeat?state=track', {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${this.state.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        device_ids: [this.state.deviceId],
      }),
    }).then(this.setState({ isRepeatModeOn: true }));
  };

  milisToMinutesAndSeconds = mil => {
    let minutes = Math.floor(mil / 60000);
    let seconds = ((mil % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  };

  fetchUserTracks = () => {
    let uris = [];
    const { token } = this.state;

    console.log('token is ', token);

    axios
      .get('https://api.spotify.com/v1/me/tracks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 50,
        },
      })
      .then(response => {
        console.log('track response is ', response);

        response.data.items.map(track => uris.push(track.track.uri));
        this.setState({
          favouriteTrackURIS: uris,
          favouriteTracks: response.data.items,
        });
      })
      .catch(err => console.log(err));
  };

  fetchTopTracks = () => {
    let uris = [];
    const { token } = this.state;

    console.log('token is ', token);

    axios
      .get('https://api.spotify.com/v1/me/top/tracks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 50,
        },
      })
      .then(response => {
        console.log('top track response is ', response.data.items);
        response.data.items.map(track => uris.push(track.uri));
        this.setState({
          topTracksURIS: uris,
          topTracks: response.data.items,
        });
      })
      .catch(err => console.log(err));
  };

  toggleSidebar = () => {
    this.setState({
      isSiderbarOpen: !this.state.isSiderbarOpen,
    });
  };

  handleRepeat = () => {
    const { isRepeatModeOn, playingInfo } = this.state;

    if (!isRepeatModeOn) {
      fetch('https://api.spotify.com/v1/me/player/repeat?state=track', {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${this.state.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          device_ids: [this.state.deviceId],
        }),
      }).then(this.setState({ isRepeatModeOn: true }));
    } else {
      fetch('https://api.spotify.com/v1/me/player/repeat?state=off', {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${this.state.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          device_ids: [this.state.deviceId],
        }),
      }).then(this.setState({ isRepeatModeOn: false }));
    }
  };

  componentDidMount() {
    this.setupUserAndAccessToken();
  }

  render() {
    const {
      isLoggedIn,
      playingInfo,
      user,
      token,
      positionTimestamp,
      durationTimestamp,
      volumeSliderValue,
      positionSliderValue,
      isRepeatModeOn,
      playing,
      isSiderbarOpen,
      favouriteTrackURIS,
      favouriteTracks,
      topTracks,
      topTracksURIS,
      backDrop,
    } = this.state;

    return (
      <Switch>
        <SpotifyApiContext.Provider value={token}>
          <AppWrapper backDrop={backDrop}>
            {isLoggedIn && this.player && playingInfo ? (
              <Fragment>
                <Route exact path="/home">
                  <Home
                    currentPosition={positionTimestamp}
                    sliderPositionValue={positionSliderValue}
                    currentvolume={volumeSliderValue}
                    setBackgroundImage={this.setBackgroundImage}
                    onVolumeChange={this.onVolumeSliderChange}
                    onSeek={this.onSeekSliderChange}
                    isRepeatModeOn={isRepeatModeOn}
                    handleRepeat={() => this.handleRepeat()}
                    toggleSidebar={this.toggleSidebar}
                    handlePreviousClick={this.onPrevClick}
                    handleNextClick={this.onNextClick}
                    handleTogglePlay={this.onPlayClick}
                    totalDuration={durationTimestamp}
                    isPlaying={playing}
                    nextTracks={playingInfo.track_window.next_tracks}
                    currentTrack={playingInfo.track_window.current_track}
                    avatar={user.avatar}
                    favouriteTrackURIS={favouriteTrackURIS}
                    favouriteTracks={favouriteTracks}
                    token={token}
                    isSiderbarOpen={isSiderbarOpen}
                    topTracks={topTracks}
                    topTracksURIS={topTracksURIS}
                  />
                </Route>
              </Fragment>
            ) : (
              <Route path="/login" exact>
                <Login />
              </Route>
            )}
          </AppWrapper>
        </SpotifyApiContext.Provider>
      </Switch>
    );
  }
}
