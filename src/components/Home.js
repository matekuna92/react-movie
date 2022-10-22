import React, { useState, useEffect } from 'react';
// Configuration
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';
// Components
import HeroImage from './HeroImage';
import Grid from './Grid';
import Thumb from './Thumb';
// Hook
import { useHomeFetch } from '../hooks/useHomeFetch';
// Image
import NoImage from '../images/no_image.jpg';

const Home = () => {
  const { state, loading, error } = useHomeFetch();     // using destructuring to get those properties from the object which we exported (export const useHomeFetch)

  console.log('State:', state);
 // return <div> Home Page </div>;

 // in jsx you can only return one parent element, so if we have more components, we have to wrap them with ()
 // React Fragments: Can return a Component inside empty brackets, if we dont want to create <div> around the component:
 // <> <HeroImage /> </>

 // check if there is any movie to avoid error, if we dont have any
  return (
    <>
      {state.results[0] ?
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
          title={state.results[0].original_title}
          text={state.results[0].overview}
        />
      : null
      }

      <Grid header='Popular Movies'>
        {state.results.map(movie => (
        //  <div key={movie.id}> {movie.title} </div>
        <Thumb
          key={movie.id}
          clickable={true}
          image={movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path : NoImage}  // old style instead of template literals :)
          movieId={movie.id}
        />
        ))}
      </Grid>
    </>
    )
};

export default Home;
