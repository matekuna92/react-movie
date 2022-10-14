import { useState, useEffect, useRef } from 'react';
// Configuration
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';
// API
import API from '../API';

const initialState = {      // if we want to reset
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0
}

export const useHomeFetch = () => {

  const [state, setState] = useState(initialState);
  // if we wouldnt use destructuring:
  // const state = useState();
  // state would return an array, and we could access state, and setter with: state[0], state[1]. Destructuring is better

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchMovies = async (page, searchTerm = '') => {
      try {
        setError(false);  // no error
        setLoading(true);

        const movies = await API.fetchMovies(searchTerm, page);

        // if we load more movies, we want to append the new movies to the state, not wiping the old ones out
        setState(prevState => ({    // ({ - returning object - parenthesis needed. Without it it would mark the scope of the function
          ...movies,                // when setting a state we always have to use it with a new value, never mutating it. If we mutate state direct, it WONT trigger a rerender
          results:
            page > 1 ? [...prevState.results, ...movies.results] : [...movies.results]
        }));
      }
      catch(error) {
        setError(true);
      }

      setLoading(false);  // loading = false, when we gragged all the movies (loading spinner should disappear for example, if we implement that to show up during fetch)
  }

  // Initial render
  useEffect( () => {
    fetchMovies(1);
  }, []);   // can specify dependencies, when to run this function. If empty array, it only run only on mount, when we mount the Home component

  return { state, loading, error };     // state: state, loading: loading, error: error -> ES6 automatically handles this
}
