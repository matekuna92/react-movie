import { useState, useEffect, useCallback } from 'react';
import API from '../API';
import { isPersistedState } from '../helpers';

export const useMovieFetch = movieId => {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchMovie = useCallback(async () => {
        try {
            setLoading(true);
            setError(false);
        
            // grab the data from endpoint
            const movie = await API.fetchMovie(movieId);    console.log('movie:', movie);
            const credits = await API.fetchCredits(movieId);
            // get directors only
            const directors = credits.crew.filter(
                member => member.job === 'Director'
            );

            setState({
                ...movie,
                actors: credits.cast,
                directors           // ES6! (same as directors: directors)
            });

            setLoading(false);

        } catch (e) {
            setError(true);
        }
    }, [movieId]);

    // we only fetch once, useEffect will change if the movieId changes
    useEffect(() => {

        // check if there is something in the session storage
        const sessionState = isPersistedState(movieId);     // each movie will be stored in the session state with its own movieId
        if(sessionState) {
            setState(sessionState);
            setLoading(false);
            return;
        }

        fetchMovie();
    }, [movieId, fetchMovie]);    // if we place the fetchMovie function outside of useEffect, it requires the fetchmovie dependency as well
        // but then it gives an error for the function, because the fetchMovie function gets recreated on every rerender, so
        // useEffect think it's a new function every time, so it causes infinite loop. To fix this, we need to wrap the function inside
        // useCallback, so function wont be recreated unless the movieId changes!
        // it's not always needed, we can keep the fetchMovie() function inside useEffect as originally, so it works

    // Write to session storage useEffect
    useEffect( () => {
        sessionStorage.setItem(movieId, JSON.stringify(state));
    }, [movieId, state]);

    return { state, loading, error };
}