import { makeAutoObservable } from "mobx";
import { Movie } from "./types/movie";
import { SearchMovie } from "./types/searchResponse";

class MovieStore {
  favoriteMovies: SearchMovie[] = [];
  moviesList = [];
  movieTitle: string = "";
  selectedMovie: Movie | null = null;

  toggleFavorite = (movie: SearchMovie) => {
    if (
      this.favoriteMovies
        .map((favMovie) => favMovie.imdbID)
        .includes(movie.imdbID)
    ) {
      this.favoriteMovies = this.favoriteMovies.filter(
        (favorite) => favorite.imdbID !== movie.imdbID
      );
    } else {
      this.favoriteMovies.push(movie);
    }
  };

  setSelectedMovie = (movie: Movie) => {
    this.selectedMovie = movie;
  };

  setMovieTitle = (title: string) => {
    this.movieTitle = title;
  };

  constructor() {
    makeAutoObservable(this);
  }
}

export default new MovieStore();
