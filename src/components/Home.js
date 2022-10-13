import React, { useState } from 'react';
// Configuration
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';
// Components

// Hook

// Image
import NoImage from '../images/no_image.jpg';

const Home = () => {
  const [state, setState] = useState();
// if we wouldnt use destructuring:
// const state = useState();
// state would return an array, and we could access state, and setter with: state[0], state[1]. Destructuring is better

const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);

  return <div> Home Page </div>;
};

export default Home;
