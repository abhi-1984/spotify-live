import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SidebarWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 360px;
  bottom: 0;
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.9);
`;

const SidebarHeader = styled.div`
  width: 100%;
  height: 64px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const SidebarTitle = styled.div`
  font-size: 20px;
  line-height: 32px;
  font-weight: 600;
`;

const CloseView = styled.div`
  width: 64px;
  height: 32px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  cursor: pointer;
`;

const SidebarBody = styled.div`
  width: 100%;
  height: calc(100% - 64px);
  overflow-y: scroll;
`;

const TrackRow = styled(motion.div)`
  width: 100%;
  padding: 16px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0);
  display: grid;
  grid-template-columns: 48px 1fr;
  grid-gap: 16px;
`;

const TrackCover = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 4px;
  margin-right: 16px;
`;

const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TrackName = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
`;

const TrackArtist = styled.div`
  font-size: 14px;
  line-height: 20px;
  opacity: 0.6;
`;

export default function Sidebar({
  toggleSidebar,
  favouriteTrackURIS,
  favouriteTracks,
  token,
}) {
  const playTracks = (uris, selectedUri) => {
    console.log('uris are ', uris);
    fetch('https://api.spotify.com/v1/me/player/play', {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uris: uris,
        offset: { uri: selectedUri },
      }),
    });
  };

  return (
    <SidebarWrapper>
      <SidebarHeader>
        <SidebarTitle>Browse</SidebarTitle>
        <CloseView onClick={toggleSidebar}>close</CloseView>
      </SidebarHeader>
      {console.log('favouriteTracks ', favouriteTracks)}
      <SidebarBody>
        {favouriteTracks.map(track => (
          <TrackRow
            whileHover={{
              backgroundColor: 'rgba(255,255,255,0.08)',
            }}
            whileTap={{
              scale: 0.95,
            }}
            key={track.track.id}
            onClick={() => playTracks(favouriteTrackURIS, track.track.uri)}
          >
            <TrackCover src={track.track.album.images[2].url} />
            <TrackInfo>
              <TrackName>{track.track.name}</TrackName>
              <TrackArtist>
                {track.track.artists.map(artist => artist.name).join(',')}
              </TrackArtist>
            </TrackInfo>
          </TrackRow>
        ))}
      </SidebarBody>
    </SidebarWrapper>
  );
}
