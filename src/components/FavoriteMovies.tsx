import { observer } from "mobx-react-lite";
import movieStore from "../movieStore";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import "../styles/favorite-movies.css";
import { useNavigate } from "react-router-dom";

export const FavoriteMovies = observer(() => {
  const { favoriteMovies, toggleFavorite } = movieStore;

  const navigate = useNavigate();

  return (
    <div className="favorite-movies">
      {favoriteMovies.map((movie) => (
        <Card
          sx={{ cursor: "pointer" }}
          key={movie.imdbID}
          onClick={() => navigate(`/movie/${movie.imdbID}`)}
        >
          <img src={movie.Poster} />
          <CardContent>
            <Typography variant="h5">{movie.Title}</Typography>
            <Typography variant="body1">Год выпуска: {movie.Year}</Typography>
          </CardContent>
          <CardActions>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(movie);
              }}
            >
              <FavoriteIcon
                color={
                  favoriteMovies
                    .map((movie) => movie.imdbID)
                    .includes(movie.imdbID)
                    ? "secondary"
                    : "disabled"
                }
              />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </div>
  );
});
