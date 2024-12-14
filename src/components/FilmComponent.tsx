import React from 'react';
import { FilmsType } from '../types/IndexType';

interface FilmContainerProps {
  film: FilmsType;
  translation: { title: string; release: string; director: string; producers: string };
  
}

const FilmContainer: React.FC<FilmContainerProps> = ({ film, translation }) => {
  return (
    <>
      <h3>{translation.title} {film?.title}</h3>
      <p>{translation.release} {film?.releaseDate}</p>
      <p>{translation.director} {film?.director}</p>
      <p>{translation.producers} {film?.producers[0]}</p>
    </>
  );
};

export default FilmContainer;


