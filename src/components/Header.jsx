import React from 'react';
import styled from 'styled-components';
import { LogoIcon } from './Icons';

const HeaderWrapper = styled.div`
  width: 100%;
  padding: 0 40px;
  grid-area: header;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 40px;
`;

const MenuIcon = styled.div`
  width: 24px;
  height: 24px;
  display: grid;
  grid-template-rows: repeat(2, 2px);
  justify-items: center;
  align-items: center;
  grid-row-gap: 8px;
  cursor: pointer;
  align-content: center;
`;

const IconStick = styled.div`
  width: 16px;
  height: 100%;
  background-color: #fff;
  border-radius: 2px;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

export default function Header({ avatarSource, toggleSidebar }) {
  return (
    <HeaderWrapper>
      <LogoIcon />
      <RightSection>
        <MenuIcon onClick={toggleSidebar}>
          <IconStick />
          <IconStick />
        </MenuIcon>
        <Avatar alt="Spotify Live" src={avatarSource} />
      </RightSection>
    </HeaderWrapper>
  );
}
