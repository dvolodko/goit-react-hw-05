import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../js/tmdb-api';
import MovieList from '../components/MovieList/MovieList';

function HomePage() {
  const [moviesData, setMoviesData] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchTrendingMoviesHandler() {
      try {
        setError(false);
        const data = await fetchTrendingMovies();
        setMoviesData(data.results);
      } catch (error) {
        setError(true);
        setErrorMessage(error.message);
        console.log(error.message);
      }
    }
    fetchTrendingMoviesHandler();
  }, []);

  return (
    <main>
      <div className="container">
        <h1>Trending today</h1>
        {error ? <p>{errorMessage}</p> : <MovieList moviesData={moviesData} />}
      </div>
    </main>
  );
}

export default HomePage;
