import { motion } from 'framer-motion';
import styled from 'styled-components';

export const LoginPage = styled.div`
  height: 100%;
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Paragraph = styled.p`
  font-size: 24px;
  line-height: 40px;
  margin: 32px 0;
  opacity: 0.8;
`;

export const Connect = styled(motion.a)`
  display: flex;
  width: 120px;
  height: 48px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  background-color: #fff;
  color: #000;
  cursor: pointer;
  text-decoration: none;
`;
