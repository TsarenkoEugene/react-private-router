import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledDiv = styled.div`
  padding: 10px;
  background-color: #81d4fa;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

export const HomePage = () => {
  return (
    <StyledDiv>
      <h2 id="main-page">Main page</h2>
      <Link to="/independant-page">link to independant page</Link>
      <Link to="/tab-page">link to tab page</Link>
    </StyledDiv>
  );
};
