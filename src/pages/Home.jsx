import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { motion, AnimatePresence } from 'framer-motion';
import Track from '../components/Track';
import { Slider } from '@material-ui/core';
import {
  PauseIcon,
  PlayIcon,
  PreviousIcon,
  NextIcon,
  RepeatIcon,
  VolumeIcon,
} from '../components/Icons';
import Sidebar from '../components/Sidebar';

const HomeWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 80px minmax(50vh, 1fr) 48px 48px;
  grid-row-gap: 40px;
  grid-template-areas: 'header' 'player' 'seeker' 'controls' 'spacer';
`;

const PlayerView = styled.div`
  width: 100%;
  grid-area: player;
`;

const WrapperView = styled.div`
  max-width: 96vw;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
`;

const PlayerDetailsView = styled.div`
  flex: 1;
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const CurrentTrackDetails = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const TrackName = styled.h1`
  font-size: 40px;
  line-height: 48px;
  font-weight: 600;
  margin-bottom: 4px;
  width: 480px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const AlbumName = styled.p`
  font-size: 24px;
  line-height: 32px;
  opacity: 0.7;
  width: 480px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SpotifyButton = styled(motion.a)`
  all: unset;
  cursor: pointer;
  border-radius: 24px;
  width: 148px;
  height: 48px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
`;

const SeekerView = styled.div`
  grid-area: seeker;
`;

const ControlsView = styled.div`
  grid-area: controls;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 96vw;
  width: 100%;
  margin: 0 auto;
  position: relative;
`;

const CoverArt = styled.img`
  height: 100%;
  border-radius: 4px;
`;

const NextTracks = styled(motion.div)``;

const Caption = styled.div`
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  margin-bottom: 16px;
  font-weight: 600;
  opacity: 0.4;
`;

const NextTracksWrapper = styled.div`
  display: grid;
  grid-gap: 64px;
  grid-template-columns: repeat(2, 240px);
`;

const DurationSlider = styled(Slider)``;

const PositionDuration = styled.div`
  grid-area: 2 / 1;
  font-size: 16px;
  line-height: 20px;
`;

const TotalDuration = styled.div`
  grid-area: 2 / 3;
  font-size: 16px;
  line-height: 20px;
  text-align: right;
`;

const Wrapper = styled.div`
  max-width: 96vw;
  margin: 0 auto;
  height: 100%;
  display: grid;
`;

const ControlGroup = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RepeatButton = styled(motion.button)`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 18px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.2);

  &.active {
    background-color: #fff !important;
    border-color: #fff !important;
    color: #000 !important;
    svg path {
      fill: #000 !important;
    }
  }

  &:hover {
    svg path {
      fill: #000;
    }
  }
`;

const RepeatButtonIcon = styled.div`
  margin-right: 6px;
`;

const RepeatButtonLabel = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
`;

const Control = styled(motion.button)`
  all: unset;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 12px;
`;

const VolumeControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 208px;

  .MuiSlider-root {
    width: 160px;
  }
`;

export default function Home({
  avatar,
  currentTrack,
  currentPosition,
  totalDuration,
  onSeek,
  sliderPositionValue,
  isPlaying,
  isRepeatModeOn,
  handleRepeat,
  handlePreviousClick,
  handleNextClick,
  handleTogglePlay,
  currentVolume,
  onVolumeChange,
  nextTracks,
  toggleSidebar,
  favouriteTrackURIS,
  favouriteTracks,
  token,
  isSiderbarOpen,
}) {
  const onRepeatButtonPressed = () => {
    handleRepeat();
  };

  return (
    <HomeWrapper>
      <Header toggleSidebar={toggleSidebar} avatarSource={avatar} />
      <AnimatePresence>
        {isSiderbarOpen && (
          <Sidebar
            favouriteTrackURIS={favouriteTrackURIS}
            favouriteTracks={favouriteTracks}
            toggleSidebar={toggleSidebar}
            token={token}
          />
        )}
      </AnimatePresence>
      <PlayerView>
        <WrapperView>
          <CoverArt src={currentTrack.album.images[2].url} />
          <PlayerDetailsView>
            <CurrentTrackDetails>
              <TrackInfo>
                <TrackName>{currentTrack.name}</TrackName>
                <AlbumName>{currentTrack.album.name}</AlbumName>
              </TrackInfo>
              <SpotifyButton
                whileHover={{
                  scale: 1.08,
                  backgroundColor: '#fff',
                  color: '#000',
                  borderColor: '#fff',
                }}
                whileTap={{
                  scale: 0.96,
                }}
                target="_blank"
                href={`https://open.spotify.com/track/${currentTrack.id}`}
              >
                Open in Spotify
              </SpotifyButton>
            </CurrentTrackDetails>
            <NextTracks>
              {console.log('next tracks are', nextTracks)}
              <Caption>Up Next</Caption>
              <NextTracksWrapper>
                {nextTracks.map(track => (
                  <Track
                    key={track.id}
                    trackName={track.name}
                    trackCover={track.album.images[2].url}
                    trackAlbum={track.album.name}
                    trackDuration={track.duration_ms}
                  />
                ))}
              </NextTracksWrapper>
            </NextTracks>
          </PlayerDetailsView>
        </WrapperView>
      </PlayerView>

      <SeekerView>
        <Wrapper>
          <DurationSlider value={sliderPositionValue} onChange={onSeek} />
          <PositionDuration>{currentPosition}</PositionDuration>
          <TotalDuration>{totalDuration}</TotalDuration>
        </Wrapper>
      </SeekerView>
      <ControlsView>
        <RepeatButton
          whileHover={{
            scale: 1.08,
            backgroundColor: '#fff',
            color: '#000',
            borderColor: '#fff',
          }}
          whileTap={{
            scale: 0.96,
          }}
          className={`${isRepeatModeOn && 'active'}`}
          isRepeatModeOn={isRepeatModeOn}
          onClick={() => onRepeatButtonPressed()}
        >
          <RepeatButtonIcon>
            <RepeatIcon />
          </RepeatButtonIcon>
          <RepeatButtonLabel>On Repeat</RepeatButtonLabel>
        </RepeatButton>
        <ControlGroup>
          <Control
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            onClick={handlePreviousClick}
          >
            <PreviousIcon />
          </Control>
          <Control
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleTogglePlay}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </Control>
          <Control
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleNextClick}
          >
            <NextIcon />
          </Control>
        </ControlGroup>
        <VolumeControl>
          <VolumeIcon />
          <Slider
            defaultValue={50}
            value={currentVolume}
            onChange={onVolumeChange}
          />
        </VolumeControl>
      </ControlsView>
    </HomeWrapper>
  );
}
