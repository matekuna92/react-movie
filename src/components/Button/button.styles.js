import styled from 'styled-components';

export const Wrapper = styled.button`
  display: block;
  background: var(--darkGrey);
  width: 25%;
  min-width: 200px;
  height: 60px;
  border-radius: 30px;
  color: var(--white);
  border: 0;
  outline: none;
  font-size: var(--fontBig);
  margin: 0 auto;
  transition: all 0.4s;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;
