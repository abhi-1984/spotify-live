import React from 'react';
import styled from 'styled-components';

const TrackWrapper = styled.div`
  width: 100%;
`;

const TrackCover = styled.img`
  width: 100%;
  height: 160px;
  margin-bottom: 16px;
  border-radius: 4px;
  object-fit: cover;
  object-position: center;
`;

const TrackName = styled.div`
  font-size: 20px;
  line-height: 20px;
  margin-bottom: 8px;
  width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TrackAlbum = styled.div`
  font-size: 16px;
  line-height: 16px;
  opacity: 0.7;
  width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default function Track({ trackName, trackCover, trackAlbum }) {
  return (
    <TrackWrapper>
      <TrackCover src={trackCover} alt={trackName} />
      <TrackName>{trackName}</TrackName>
      <TrackAlbum>{trackAlbum}</TrackAlbum>
    </TrackWrapper>
  );
}
