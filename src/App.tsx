import { Route, Routes } from "react-router-dom";
import { MovieInfo } from "./components/MovieInfo";
import { Dashboard } from "./components/Dashboard";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { FavoriteMovies } from "./components/FavoriteMovies";
import { SearchMovie } from "./components/SearchMovie";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="/" element={<SearchMovie />} />
        <Route path="movie/:imdbID" element={<MovieInfo />} />
        <Route path="favorite-movies" element={<FavoriteMovies />} />
      </Route>
    </Routes>
  );
};
