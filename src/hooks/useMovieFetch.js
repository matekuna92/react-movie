import { useState, useEffect } from 'react';
import API from '../API';

export const useMovieFetch = movieId => {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // we only fetch once, useEffect will change if the movieId changes
    useEffect(() => {
        const fetchMovie = async () => {
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
        };

        fetchMovie();
    }, [movieId]);

    return { state, loading, error };
}