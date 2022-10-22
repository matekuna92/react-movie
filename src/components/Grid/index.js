import React from 'react';
// styles
import { Wrapper, Content } from './grid.styles';

const Grid = ({ header, children }) => (    // destructuring of the props.header, props.childen
  <Wrapper>
    <h1> {header} </h1>
    <Content> {children} </Content>
  </Wrapper>
)

export default Grid;
