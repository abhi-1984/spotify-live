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
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const Link = styled.div`
  margin: 0 24px;
  color: ${props => (props.activeLink ? '#fff' : 'rgba(255,255,255,0.6)')};
  position: relative;
  cursor: pointer;
`;

const Label = styled.div`
  font-size: 20px;
  line-height: 32px;
  font-weight: 500;
`;

const ComingSoonTag = styled.div`
  position: absolute;
  padding: 3px;
  border-radius: 2px;
  background-color: #ff932f;
  color: #000;
  font-size: 10px;
  top: -2px;
  right: -40px;
  text-transform: uppercase;
  font-weight: 700;
`;

export default function Header({ avatarSource }) {
  return (
    <HeaderWrapper>
      <LogoIcon />
      <Links>
        <Link activeLink={true}>
          <Label>Favourites</Label>
        </Link>
        <Link>
          <Label>For You</Label>
          <ComingSoonTag>Soon</ComingSoonTag>
        </Link>
      </Links>
      <Avatar alt="Spotify Live" src={avatarSource} />
    </HeaderWrapper>
  );
}
