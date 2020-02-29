import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ParentComponentWithChildRoutes } from '../../../../../../src/reactRouterAdvance';

const StyledDiv = styled.div`
  padding: 10px;
  background-color: #1976d2;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

export const DynamicPathChildPage = ({ childRoutes }: ParentComponentWithChildRoutes) => {
  return (
    <StyledDiv>
      <br />
      <h2 id="dynamic-path-child-page">Dynamic-path-child-page</h2>
      <Link to="/tab-page/dynamic-path-child-page/555/static-child">Link to dynamic parent static child</Link>
      <Link to="/tab-page/dynamic-path-child-page/1233/second-static-child">
        Link to dynamic parent second static child
      </Link>
      <div>{childRoutes}</div>
    </StyledDiv>
  );
};
