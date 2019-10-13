import React from 'react';
import { LoginPage, Paragraph, Connect } from '../styles/LoginStyles';
import { LogoIcon } from '../components/Icons';

export default function Login() {
  return (
    <LoginPage
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <LogoIcon />
      <Paragraph>
        Soundtrack your life with Spotify. Choose what you want to listen to, or
        let Spotify surprise you.
      </Paragraph>
      <Connect
        href={
          'https://accounts.spotify.com/authorize?client_id=1de3c263e4104300871dc8963f1314dc&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-modify-playback-state%20user-read-private%20user-read-email%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/'
        }
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.96, backgroundColor: '#D1D0D3' }}
      >
        Connect
      </Connect>
    </LoginPage>
  );
}
