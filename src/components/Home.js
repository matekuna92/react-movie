import React, { useState, useEffect } from 'react';
// Configuration
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';
// API
import API from '../API';

// Components

// Hook
import { useHomeFetch } from '../hooks/useHomeFetch';
// Image
import NoImage from '../images/no_image.jpg';

const Home = () => {
  const { state, loading, error } = useHomeFetch();     // using destructuring to get those properties from the object which we exported

  console.log('State:', state);

  return <div> Home Page </div>;
};

export default Home;
