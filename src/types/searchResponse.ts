export type SearchResponse = {
  Search: SearchMovie[];
  totalResults: string;
  Response: string;
};

export type SearchMovie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};
