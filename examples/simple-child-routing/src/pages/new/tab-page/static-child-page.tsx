import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledDiv = styled.div`
  padding: 10px;
  background-color: #1976d2;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

export const StaticChild = () => {
  return (
    <StyledDiv>
      <h2 id="static-child">Static-child</h2>
    </StyledDiv>
  );
};
