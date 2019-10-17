import React from 'react';
import styled from 'styled-components';
import { LogoIcon, MenuIcon } from './Icons';

const HeaderWrapper = styled.div`
  width: 100%;
  grid-area: header;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
`;

const Wrapper = styled.div`
  max-width: 720px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  display: flex;
  border-radius: 50%;
  margin-left: 80px;

  margin-left: 8px;
`;

const Link = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const LinkLabel = styled.div`
  font-size: 14px;
  line-height: 20px;
  text-transform: uppercase;
  margin-left: 8px;
  letter-spacing: 0.6px;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  justify-content: space-between;
`;

export default function Header({ avatarSource, toggleSidebar }) {
  return (
    <HeaderWrapper>
      <Wrapper>
        <LogoIcon />
        <RightSection>
          <Link onClick={toggleSidebar}>
            <MenuIcon />
            <LinkLabel>Browse</LinkLabel>
          </Link>
          <Avatar alt="Spotify Live" src={avatarSource} />
        </RightSection>
      </Wrapper>
    </HeaderWrapper>
  );
}
