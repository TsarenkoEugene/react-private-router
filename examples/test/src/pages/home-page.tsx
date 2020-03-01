import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { StyledDiv } from '../../components/styled-div';

export const HomePage = () => {
  return (
    <StyledDiv>
      <h2 id="main-page">Main page</h2>
      <Link to="/independant-page">link to independant page</Link>
      <Link to="/tab-page">link to tab page</Link>
    </StyledDiv>
  );
};
