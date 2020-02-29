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

export const DynamicParentSecondStaticChild = () => {
  return (
    <StyledDiv>
      <Link to="/">Back to home page</Link>
      <h2 id="dynamic-parent-static-child">Dynamic-parent-second-static-child</h2>
    </StyledDiv>
  );
};
