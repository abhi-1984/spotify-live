import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SidebarWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 360px;
  bottom: 0;
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 10;
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

const CloseView = styled(motion.div)`
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

const SidebarBody = styled(motion.div)`
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

const Tabs = styled.div`
  width: 100%;
  margin: 16px auto;
  margin-top: 20px;
  height: 40px;
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const Tab = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  color: ${props => (props.isActive ? '#fff' : 'rgba(255,255,255,0.6)')};
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom-color: ${props =>
    props.isActive ? '#fff' : 'rgba(255,255,255,0.08)'};
  transition: all 300ms ease-in-out;
  &:hover {
    color: #fff;
  }
`;

const list = {
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.05,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
};

const items = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 10 },
};

export default function Sidebar({
  toggleSidebar,
  favouriteTrackURIS,
  favouriteTracks,
  token,
  topTracks,
  topTracksURIS,
}) {
  const [tabs, setTabs] = useState(['Favourites', 'For You']);
  const [activeTab, setActiveTab] = useState('Favourites');

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
    }).then(toggleSidebar());
  };

  useEffect(() => {
    const handleEsc = event => {
      if (event.keyCode === 27) {
        toggleSidebar();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [toggleSidebar]);

  return (
    <SidebarWrapper
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.3 }}
    >
      <SidebarHeader>
        <SidebarTitle>Browse</SidebarTitle>
        <CloseView
          whileHover={{
            scale: 1.08,
            backgroundColor: '#fff',
            color: '#000',
          }}
          whileTap={{
            scale: 0.96,
          }}
          onClick={toggleSidebar}
        >
          close
        </CloseView>
      </SidebarHeader>
      {console.log('topTracks ', topTracks)}
      <Tabs>
        {tabs.map((tab, index) => (
          <Tab
            onClick={() => setActiveTab(tab)}
            key={index}
            isActive={activeTab === tab}
          >
            {tab}
          </Tab>
        ))}
      </Tabs>
      <SidebarBody initial="hidden" animate="visible" variants={list}>
        {activeTab === 'Favourites' &&
          favouriteTracks.map((track, index) => (
            <TrackRow
              whileHover={{
                backgroundColor: 'rgba(255,255,255,0.08)',
              }}
              whileTap={{
                scale: 0.95,
              }}
              variants={items}
              key={index}
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
        {activeTab === 'For You' &&
          topTracks.map((track, index) => (
            <TrackRow
              whileHover={{
                backgroundColor: 'rgba(255,255,255,0.08)',
              }}
              whileTap={{
                scale: 0.95,
              }}
              variants={items}
              key={index}
              onClick={() => playTracks(topTracksURIS, track.uri)}
            >
              <TrackCover src={track.album.images[2].url} />
              <TrackInfo>
                <TrackName>{track.name}</TrackName>
                <TrackArtist>
                  {track.artists.map(artist => artist.name).join(',')}
                </TrackArtist>
              </TrackInfo>
            </TrackRow>
          ))}
      </SidebarBody>
    </SidebarWrapper>
  );
}
