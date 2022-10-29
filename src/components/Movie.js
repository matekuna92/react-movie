import React from 'react';
import { useParams } from 'react-router-dom';
// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';
// Components
import Grid from './Grid';
import Spinner from './Spinner';
import BreadCrumb from './BreadCrumb';
// Hook
import { useMovieFetch } from '../hooks/useMovieFetch';
// Image
import NoImage from '../images/no_image.jpg';

const Movie = () => {
    const { movieId } = useParams();    // destructure movieId only from the useParams. Naming comes from the :/movieId in the App.js
    const { state: movie, loading, error } = useMovieFetch(movieId);       // get the movieId from the router
    console.log('movie:', movie);

    if(loading) return <Spinner />
    if(error) return <div> Something went wrong... </div>
    
    return (
        <>
            <BreadCrumb movieTitle={movie.original_title} />
        </>
    );
};

export default Movie;