import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';
import API from '../API';
// Components
import Grid from './Grid';
import Spinner from './Spinner';
import BreadCrumb from './BreadCrumb';
import MovieInfo from './MovieInfo';
import MovieInfoBar from './MovieInfoBar';
import Actor from './Actor';
// Hook
//import { useMovieFetch } from '../hooks/useMovieFetch';
// Image
import NoImage from '../images/no_image.jpg';

//const Movie = () => {

class Movie extends Component {
 //   const { movieId } = useParams();    // destructure movieId only from the useParams. Naming comes from the :/movieId in the App.js
 //   const { state: movie, loading, error } = useMovieFetch(movieId);       // get the movieId from the router
 //   console.log('movie:', movie);

 state = {
    movie: {},
    loading: true,
    error: false
 };
 
 fetchMovie = async () => {
    // destructure out props, where we sent in the MovieWithParams, so we can access the prop called params...
    const { movieId } = this.props.params; // access the params from props

    try {
      //  setLoading(true);
     //   setError(false);
     this.setState({ loading: true, error: false });

    
        // grab the data from endpoint
        const movie = await API.fetchMovie(movieId);    console.log('movie:', movie);
        const credits = await API.fetchCredits(movieId);
        // get directors only
        const directors = credits.crew.filter(
            member => member.job === 'Director'
        );

        this.setState({
           movie: {
            ...movie,
            actors: credits.cast,
            directors           // ES6! (same as directors: directors)
           },
           loading: false
        });

     //   setLoading(false);

    } catch (e) {
      //  setError(true);
      this.setState({ loading: false, error: true });
    }
};

componentDidMount() {
    this.fetchMovie();
}

 render() {
    const { movie, loading, error } = this.state;

    if(loading) return <Spinner />
    if(error) return <div> Something went wrong... </div>
    
    return (
        <>
            <BreadCrumb movieTitle={movie.original_title} />
            <MovieInfo movie={movie} />
            <MovieInfoBar 
                time={movie.runtime}
                budget={movie.budget}
                revenue={movie.revenue}
            />
            <Grid header='Actors'>
                {movie.actors.map(actor => (
                    <Actor
                        key={actor.credit_id}
                        name={actor.name}
                        character={actor.character}
                        imageUrl={
                            actor.profile_path
                            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                            : NoImage
                        }
                    />
                ))}
            </Grid>
        </>
    );
 } 
};

// in class component there's no good way to grab params with react-router, removed functionality, so we export this to work:
const MovieWithParams = props => <Movie {...props} params={useParams()} />;

//export default Movie;
export default MovieWithParams;