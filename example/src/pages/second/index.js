import React from 'react';
import styled from 'styled-components';
import { Switch, Router, Link } from 'react-router-dom';

const StyledDiv = styled.div`
  padding: 10px;
  background-color: blue;
  color: white;
`;

export const SecondPage = ({ childRoutes }) => (
  <StyledDiv>
    Test page
    {/* {console.log('CHILD', childs)} */}
    <Link to="/test/1234">Link page</Link>
    {childRoutes}
  </StyledDiv>
);
