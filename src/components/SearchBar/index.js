import React, { useState, useEffect, useRef } from 'react';
// Image
import searchIcon from '../../images/search-icon.svg';
// Styles
import { Wrapper, Content } from './searchbar.styles';

// Controlled component: input field will be controlled by React, input field will be based on the value in the state
// When the local state changes, useEffect will be used
const SearchBar = ({ setSearchTerm }) => {
  const [state, setState] = useState('');

  console.log('state:', state);

  return (
    <Wrapper>
      <Content>
        <img src={searchIcon} alt='Search Icon' />
        <input
          type='text'
          placeholder='Search Movie'
          onChange={event => setState(event.currentTarget.value)}  // **
          value={state}

          /* ** we need this inline function to invoke function with the value, so we can provide the function with value
          Otherwise it wont work, it would run the function instantly. But we want the input to change only when event occurs.
          If we dont want to send in arguments, we just want to trigger the function on change,
          we could use: onChange={setState(event.currentTarget.value)}. But we want to send in the argument of the current value, thats
          why we need the inline function
          Every time the input changes, it triggers the setState function and it every time replaces the value ('' initial value)
          from the text input in the state and the value is displayed in the textbox itself
          */



        />
      </Content>
    </Wrapper>
  )
}

export default SearchBar;
