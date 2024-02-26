import { useState, useEffect } from "react";
import MovieBox from "./MovieBox";
import "./App.css";
import icon from "./media/search-icon.png";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [keyword, setKeyword] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(
      `https://www.omdbapi.com?apikey=${process.env.REACT_APP_KEY}&s=${title}`
    );
    const data = await response.json();

    setMovies(data.Search);
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      searchMovies(keyword);
    }
  };

  useEffect(() => {
    searchMovies("Avengers");
  }, []);

  return (
    <div className="app">
      <h1>Movflix</h1>

      <div className="search">
        <input
          placeholder="Search for a movie"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleSearch}
        />

        <img src={icon} alt="search" onClick={() => searchMovies(keyword)} />
      </div>

      {movies.length ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieBox key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div>
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
