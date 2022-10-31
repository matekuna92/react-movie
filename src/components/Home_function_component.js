import React, { Component } from 'react';
// Configuration
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';
// API
import API from '../API';
// Components
import HeroImage from './HeroImage';
import Grid from './Grid';
import Thumb from './Thumb';
import Spinner from './Spinner';
import SearchBar from './SearchBar';
import Button from './Button';
// Hook
import { useHomeFetch } from '../hooks/useHomeFetch';
// Image
import NoImage from '../images/no_image.jpg';

const initialState = {      // if we want to reset
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
}

//const Home = () => {
class Home extends Component {


 // const { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore } = useHomeFetch();
 state = {
    movies: initialState,
    searchTerm: '',
    isLoadingMore: false,
    loading: false,
    error: false
 }

    fetchMovies = async (page, searchTerm = '') => {
        try {
            // !! we dont have seperate states to use setError, etc., so we set the properties inside the state*
        //  setError(false);  // no error
        // setLoading(true);
        this.setState({ error: false, loading: true}); // *

        const movies = await API.fetchMovies(searchTerm, page);

        this.setState(prevState => ({
            ...prevState,
            movies: {
                ...movies,                
                results:
                page > 1 ? [...prevState.movies.results, ...movies.results] : [...movies.results]
            },    
            loading: false
        }));
        }
        catch(error) {
            //   setError(true);
            // setLoading(false);
            this.setState({ error: true, loading: false });
        }   
};

// do something, when state updated. trigger callback function when a new state is set
handleSearch = searchTerm => {
    this.setState({ movie: initialState, searchTerm }, () => {      // searchTerm: searchTerm ES6
        this.fetchMovies(1, this.state.searchTerm);
    }); 
}

handleLoadMore = () => {
    this.fetchMovies(this.state.movies.page + 1, this.state.searchTerm);
}

componentDidMount() {
    this.fetchMovies(1);
}

render() {
    // instead of writing out this.state on every property (searchTerm -> this.state.searchTerm) we can destructure properties from state to use short form
    const { searchTerm, movies, loading, error } = this.state;

    return (
        <>
          {!searchTerm && movies.results[0] ?
            <HeroImage
              image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${movies.results[0].backdrop_path}`}
              title={movies.results[0].original_title}
              text={movies.results[0].overview}
            />
          : null
          }
    
          <SearchBar setSearchTerm={this.handleSearch} />
          <Grid header={searchTerm ? 'Search Result' : 'Popular Movies'}>
            {movies.results.map(movie => (
            <Thumb
              key={movie.id}
              clickable={true}
              image={movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path : NoImage} 
              movieId={movie.id}
            />
            ))}
          </Grid>
          {loading && <Spinner /> }
          {movies.page < movies.total_pages && !loading && (  
            <Button text='Load More' callback={this.handleLoadMore} />                     
          )}
        </>
    );
}

if(error) {
  return <div> Something went wrong. </div>
}

  /* return (
    <>
      {!searchTerm && state.results[0] ?
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
          title={state.results[0].original_title}
          text={state.results[0].overview}
        />
      : null
      }

      <SearchBar setSearchTerm={setSearchTerm} />
      <Grid header={searchTerm ? 'Search Result' : 'Popular Movies'}>
        {state.results.map(movie => (
        <Thumb
          key={movie.id}
          clickable={true}
          image={movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path : NoImage} 
          movieId={movie.id}
        />
        ))}
      </Grid>
      {loading && <Spinner /> }
      {state.page < state.total_pages && !loading && (  
        <Button text='Load More' callback={() => setIsLoadingMore(true)} />                     
      )}
    </>
    ); */
};

export default Home;
