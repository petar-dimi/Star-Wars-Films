export interface DataType {
  data: {
    allFilms: AllFilmsType;
  };
}

export interface AllFilmsType{
  films: FilmsType[];
}

export interface FilmsType{
  id: string;
  title: string;
  director: string;
  releaseDate: string;
  producers: string[];
}