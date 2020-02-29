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

export const DynamicPathChildPage = ({ child }: { child: any }) => {
  return (
    <StyledDiv>
      <br />
      <h2 id="dynamic-path-child-page">Dynamic-path-child-page</h2>
      <Link to="/tab-page/dynamic-path-child-page/555/static-child">Dynamic parent static child</Link>
      <div>{child}</div>
    </StyledDiv>
  );
};
