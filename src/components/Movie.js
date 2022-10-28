import React from 'react';
import { useParams } from 'react-router-dom';
// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';
// Components
import Grid from './Grid';
import Spinner from './Spinner';
// Hook
import { useMovieFetch } from '../hooks/useMovieFetch';
// Image
import NoImage from '../images/no_image.jpg';

const Movie = () => {
    const { movieId } = useParams();    // destructure movieId only from the useParams. Naming comes from the :/movieId in the App.js
    const { state: movie, loading, error } = useMovieFetch(movieId);       // get the movieId from the router
    console.log('movie:', movie);

    return (
        <>
            <div> Movie </div>
        </>
    );
};

export default Movie;