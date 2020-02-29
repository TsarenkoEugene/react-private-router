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

export const IndependentPage = () => {
  return (
    <StyledDiv>
      <h2 id="independent-page">Independant page</h2>
      <Link to="/">Back to home page</Link>
    </StyledDiv>
  );
};
