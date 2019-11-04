import React from 'react';
import styled from 'styled-components';
import { Switch, Router, Link } from 'react-router-dom';

const StyledDiv = styled.div`
  padding: 10px;
  background-color: blue;
  color: white;
`;

export const SecondPage = ({ childRoutes }: { childRoutes: any }) => (
  <StyledDiv>
    Test page
    {console.log('tst')}
    {/* {console.log('CHILD', childs)} */}
    <Link to="/test/1234">Link page</Link>
    <Switch>{childRoutes}</Switch>
  </StyledDiv>
);
