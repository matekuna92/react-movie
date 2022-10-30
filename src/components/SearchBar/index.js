import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
// Image
import searchIcon from '../../images/search-icon.svg';
// Styles
import { Wrapper, Content } from './searchbar.styles';

// Controlled component: input field will be controlled by React, input field will be based on the value in the state
// When the local state changes, useEffect will be used
const SearchBar = ({ setSearchTerm }) => {
  const [state, setState] = useState('');
  const initial = useRef(true);

  // useEffect always trigger on initial render. But we want to trigger it only when user type something in: useRef.. useRef wont trigger a rerender, like state
  useEffect(() => {
    if(initial.current) {   // holds the initial's current value
      initial.current = false;  // when it's true we know that it's the INITIAL RENDER. With this code snippet we can avoid initial render in useEffect
                                // So it will only triggered when user types into the input
      return;
    }
    const timer = setTimeout(() => {
      setSearchTerm(state);
    }, 500)

    return () => clearTimeout(timer);   // to avoid creating multiply timers on every render
  }, [setSearchTerm, state])

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
  );
};

SearchBar.propTypes = {
  callback: PropTypes.func
};

export default SearchBar;
