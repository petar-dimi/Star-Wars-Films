import { cleanup, render, screen } from "@testing-library/react";
import FilmContainer from "../components/FilmComponent";
import { allFilmsData } from "../mocks/AllFilms";
import { translations } from "../Translations/translations"; 

describe('FilmContainer', () => {
  afterEach(() => {
    cleanup();
  });

  const props = {
    film: allFilmsData.allFilms.films[0],
    translation: translations.en.cards, 
  };

  it('should render the correct information in the component', () => {
    render(
      <FilmContainer {...props} />
    );

    expect(screen.getByText(/A New Hope/i)).toBeInTheDocument();
    expect(screen.getByText(/George Lucas/i)).toBeInTheDocument();
    expect(screen.getByText(/1977-05-25/i)).toBeInTheDocument();
    expect(screen.getByText(/Gary Kurtz/i)).toBeInTheDocument();
  });
});
