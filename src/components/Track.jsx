import React from 'react';
import styled from 'styled-components';

const TrackWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 48px 1fr 80px;
  align-items: center;
  grid-gap: 16px;
  margin-bottom: 20px;
`;

const TrackCover = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 4px;
  object-fit: cover;
  object-position: center;
`;

const TrackName = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TrackAlbum = styled.div`
  font-size: 16px;
  line-height: 24px;
  opacity: 0.7;
  /* width: 320px; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TrackInfo = styled.div``;

const TrackDuration = styled.div`
  text-align: right;
`;

const milisToMinutesAndSeconds = mil => {
  let minutes = Math.floor(mil / 60000);
  let seconds = ((mil % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};

export default function Track({
  trackName,
  trackCover,
  trackAlbum,
  trackArtists,
  trackDuration,
}) {
  return (
    <TrackWrapper>
      <TrackCover src={trackCover} alt={trackName} />
      <TrackInfo>
        <TrackName>{trackName}</TrackName>
        <TrackAlbum>{trackAlbum}</TrackAlbum>
      </TrackInfo>

      <TrackDuration>{milisToMinutesAndSeconds(trackDuration)}</TrackDuration>
    </TrackWrapper>
  );
}
