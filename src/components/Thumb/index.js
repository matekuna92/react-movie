import React from 'react';
// styles
import { Image } from './thumb.styles';

const Thumb = ({ image, movieId, cilckable }) => (
  <div>
    <Image src={image} alt='Movie Thumb' />
  </div>
)

export default Thumb;
