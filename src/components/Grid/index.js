import React from 'react';
import PropTypes from 'prop-types';
// styles
import { Wrapper, Content } from './grid.styles';

const Grid = ({ header, children }) => (    // destructuring of the props.header, props.childen
  <Wrapper>
    <h1> {header} </h1>
    <Content> {children} </Content>
  </Wrapper>
);

Grid.propTypes = {
  header: PropTypes.string,
  // no need to check children, because thats a built-in prop
};

export default Grid;
