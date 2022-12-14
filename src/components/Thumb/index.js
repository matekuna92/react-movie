import React from 'react';
import PropTypes from 'prop-types';
// styles
import { Image } from './thumb.styles';
import { Link } from 'react-router-dom';

const Thumb = ({ image, movieId, clickable }) => (
  <div>
    {clickable ? (    // on Home page the thumbnails of movies should be clickable to go to the movieId url, but we also use this
                      // Thumb component for the movie poster on each individual Movie page, where it should not be clickable
      <Link to={`/${movieId}`}>
        <Image src={image} alt='Movie Thumb' />
      </Link>
    ) : (
      <Image src={image} alt='Movie Thumb' />
    )}
  </div>
);

Thumb.propTypes = {
  image: PropTypes.string,
  movieId: PropTypes.string,
  clickable: PropTypes.bool
};

export default Thumb;
