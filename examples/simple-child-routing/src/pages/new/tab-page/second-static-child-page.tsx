import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  padding: 10px;
  background-color: #1976d2;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

export const SecondStaticChild = () => {
  return (
    <StyledDiv>
      <h2 id="second-static-child">Second Static-child</h2>
    </StyledDiv>
  );
};
