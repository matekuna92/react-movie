//import React, { useState, useEffect, useRef } from 'react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Image
import searchIcon from '../../images/search-icon.svg';
// Styles
import { Wrapper, Content } from './searchbar.styles';

//const SearchBar = ({ setSearchTerm }) => {
//  const [state, setState] = useState('');
//  const initial = useRef(true);

// !!! in classes you can have only ONE state, while with hooks multiply states can be created
class SearchBar extends Component {
    state = {
        value: ''
    };

    timeout = null;

    // !!! 3 lifecycle methods: ComponentDidMount, ComponentDidUpdate, ComponentWillUnmount
    componentDidUpdate(__prevProps, prevState) {
        if(this.state.value !== prevState.value) {
            const { setSearchTerm } = this.props;

            clearTimeout(this.timeout);

            this.timeout = setTimeout(() => {
                const value = this.state;
                setSearchTerm(value);
              }, 500) 
        }
    }

    render() {
        return (
            <Wrapper>
              <Content>
                <img src={searchIcon} alt='Search Icon' />
                <input
                  type='text'
                  placeholder='Search Movie'
                  onChange={event => this.setState({ value: event.currentTarget.value })}  // **
                  value={this.state.value}
                />
              </Content>
            </Wrapper>
          );
    }

/*   useEffect(() => {
    if(initial.current) {  
      initial.current = false;  
                                
      return;
    }
    const timer = setTimeout(() => {
      setSearchTerm(state);
    }, 500)

    return () => clearTimeout(timer);
  }, [setSearchTerm, state]) */
};

SearchBar.propTypes = {
  callback: PropTypes.func
};

export default SearchBar;
