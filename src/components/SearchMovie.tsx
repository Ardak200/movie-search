import {
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import movieStore from "../movieStore";
import { API } from "../api";
import { SearchResponse } from "../types/searchResponse";
import { useQuery } from "@tanstack/react-query";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { observer } from "mobx-react-lite";
import "../styles/search-movie-cards.css";

export const SearchMovie = observer(() => {
  const navigate = useNavigate();

  const { movieTitle, setMovieTitle, toggleFavorite, favoriteMovies } =
    movieStore;
  console.log(movieTitle);

  const { data: searchResponse, isFetching } = useQuery<SearchResponse>({
    queryKey: ["search", movieTitle],
    queryFn: async () => {
      return API.get("/", {
        params: { apiKey: "3fd7ed54", s: movieTitle },
      }).then((response) => response.data);
    },
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        id="search"
        label="Search"
        variant="standard"
        value={movieTitle}
        onChange={(e) => setMovieTitle(e.target.value)}
      />
      {isFetching ? (
        <Typography variant="h3">Loading...</Typography>
      ) : (
        <div className="search-movie-cards">
          {searchResponse?.Search?.map((searchMovie) => (
            <Card
              key={searchMovie.imdbID}
              onClick={() => navigate(`movie/${searchMovie.imdbID}`)}
            >
              <img src={searchMovie.Poster} />
              <CardContent>
                <Typography variant="h5">{searchMovie.Title}</Typography>
                <Typography variant="body1">
                  Год выпуска: {searchMovie.Year}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(searchMovie);
                  }}
                >
                  <FavoriteIcon
                    color={
                      favoriteMovies
                        .map((movie) => movie.imdbID)
                        .includes(searchMovie.imdbID)
                        ? "secondary"
                        : "disabled"
                    }
                  />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </div>
      )}
    </Box>
  );
});
