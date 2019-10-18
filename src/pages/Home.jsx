import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { motion, AnimatePresence } from "framer-motion";
import Track from "../components/Track";
import { Slider } from "@material-ui/core";
import {
  PauseIcon,
  PlayIcon,
  PreviousIcon,
  NextIcon,
  RepeatIcon,
  VolumeIcon
} from "../components/Icons";
import Sidebar from "../components/Sidebar";
import { MorphReplace } from "react-svg-morph";

const HomeWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 80px 200px 48px 48px 200px;
  grid-row-gap: 56px;
  grid-template-areas: "header" "player" "seeker" "controls" "next-tracks";
`;

const PlayerView = styled(motion.div)`
  width: 100%;
  grid-area: player;
`;

const WrapperView = styled.div`
  max-width: 720px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  height: 100%;
`;

const CurrentTrackDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  grid-column: 1 / span 5;
`;

const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const TrackName = styled.h1`
  font-size: 32px;
  line-height: 48px;
  font-weight: 600;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const AlbumName = styled.p`
  font-size: 24px;
  line-height: 32px;
  opacity: 0.8;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SpotifyButton = styled(motion.a)`
  all: unset;
  cursor: pointer;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  text-decoration: underline;
`;

const CoverArt = styled(motion.img)`
  height: 100%;
  border-radius: 4px;
  grid-column: 6 / span 2;
`;

const SeekerView = styled.div`
  grid-area: seeker;
`;

const ControlsView = styled.div`
  grid-area: controls;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
  position: relative;
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
  max-width: 720px;
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

const ArtistName = styled.div`
  font-size: 16px;
  line-height: 24px;
  opacity: 0.6;
  margin-top: 8px;
`;

const NextTracksView = styled.div`
  width: 100%;
`;

const NextTracksWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 4px;
  padding: 24px;
  grid-area: next-tracks;
  max-width: 720px;
  margin: 0 auto;
`;

const Caption = styled.div`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  margin-bottom: 20px;
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
  topTracks,
  topTracksURIS,
  setBackgroundImage
}) {
  const onRepeatButtonPressed = () => {
    handleRepeat();
  };

  useEffect(() => {
    setBackgroundImage(currentTrack.album.images[2].url);
  }, [setBackgroundImage, currentTrack.album.images]);

  return (
    <HomeWrapper>
      <Header toggleSidebar={toggleSidebar} avatarSource={avatar} />
      <AnimatePresence>
        {isSiderbarOpen && (
          <Sidebar
            favouriteTrackURIS={favouriteTrackURIS}
            favouriteTracks={favouriteTracks}
            topTracks={topTracks}
            topTracksURIS={topTracksURIS}
            toggleSidebar={toggleSidebar}
            token={token}
          />
        )}
      </AnimatePresence>
      <PlayerView
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.9 }}
      >
        <WrapperView>
          <CurrentTrackDetails>
            <TrackInfo>
              <TrackName>{currentTrack.name}</TrackName>
              <AlbumName>{currentTrack.album.name}</AlbumName>
              <ArtistName>
                {currentTrack.artists
                  .map(artist => {
                    return artist.name;
                  })
                  .join(", ")}
              </ArtistName>
            </TrackInfo>
            <SpotifyButton
              whileTap={{
                scale: 0.96
              }}
              target="_blank"
              href={`https://open.spotify.com/track/${currentTrack.id}`}
            >
              Open in Spotify
            </SpotifyButton>
          </CurrentTrackDetails>
          <CoverArt src={currentTrack.album.images[2].url} />
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
            backgroundColor: "#fff",
            color: "#000",
            borderColor: "#fff"
          }}
          whileTap={{
            scale: 0.96
          }}
          className={`${isRepeatModeOn && "active"}`}
          isRepeatModeOn={isRepeatModeOn}
          onClick={() => onRepeatButtonPressed()}
        >
          <RepeatButtonIcon>
            <RepeatIcon />
          </RepeatButtonIcon>
          <RepeatButtonLabel>Once More</RepeatButtonLabel>
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
            <MorphReplace width={48} height={48}>
              {isPlaying ? (
                <PauseIcon key={isPlaying} />
              ) : (
                <PlayIcon key={"playIcon"} />
              )}
            </MorphReplace>
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

      <NextTracksView>
        <NextTracksWrapper>
          <Caption>Up Next</Caption>
          {nextTracks.map(track => (
            <Track
              key={track.id}
              trackName={track.name}
              trackCover={track.album.images[2].url}
              trackAlbum={track.album.name}
              trackDuration={track.duration_ms}
              trackArtists={track.artists}
            />
          ))}
        </NextTracksWrapper>
      </NextTracksView>
    </HomeWrapper>
  );
}
