import { IconButton, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { useParams } from "react-router-dom";
import { Movie } from "../types/movie";
import { YoutubeSearchResult } from "../types/youtubeSearchResult";
import { observer } from "mobx-react-lite";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import movieStore from "../movieStore";
import "../styles/movie-info.css";

export const MovieInfo = observer(() => {
  const apiKey = "AIzaSyDkGyqsi7jzSo7zHs-KI5ZanxmaaRAqGy4";

  const { favoriteMovies, toggleFavorite } = movieStore;

  const { imdbID } = useParams();
  const { data: movie, isFetching: isMovieDataFetching } = useQuery<Movie>({
    queryKey: ["movie", imdbID],
    queryFn: async () => {
      return API.get("/", {
        params: { apiKey: "3fd7ed54", i: imdbID },
      }).then((response) => response.data);
    },
  });

  const { data: trailerUrl, isFetching: isTrailerFetching } = useQuery({
    queryKey: ["trailer", [movie?.Title]],
    queryFn: async () => {
      const query = `${movie?.Title} trailer`;
      const result = await axios.get<YoutubeSearchResult>(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(
          query
        )}&key=${apiKey}`
      );
      const videoId = result.data.items[0].id.videoId;
      return `https://www.youtube.com/embed/${videoId}`;
    },
  });

  if (isMovieDataFetching || isTrailerFetching) return <div>Loading...</div>;

  if (movie)
    return (
      <div className="movie-info">
        <Typography variant="h4">{movie?.Title}</Typography>
        <div className="movie-desc">
          <div className="movie-details">
            <Typography>{movie?.Country}</Typography>
            <Typography>{movie?.Year}</Typography>
            <Typography>{movie?.Genre}</Typography>
          </div>
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
        </div>
        <div className="movie-content">
          <img
            className="movie-poster"
            src={movie?.Poster}
            alt={movie?.Title}
          />
          <iframe
            src={trailerUrl}
            title="Трейлер фильма"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="movie-people">
          <div>
            <Typography variant="h6">Actors</Typography>
            <Typography>{movie?.Actors}</Typography>
          </div>
          <div>
            <Typography variant="h6">Director</Typography>
            <Typography>{movie?.Director}</Typography>
          </div>
          <div>
            <Typography variant="h6">Ratings</Typography>
            <div className="movie-ratings">
              {movie?.Ratings.map((rating, index) => (
                <div key={index}>
                  <Typography variant="body1">{rating.Source}</Typography>
                  <Typography>{rating.Value}</Typography>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="movie-plot">
          <Typography variant="h6">Plot</Typography>
          <Typography className="movie-plot" sx={{ marginTop: 2 }}>
            {movie?.Plot}
          </Typography>
        </div>
      </div>
    );
});
