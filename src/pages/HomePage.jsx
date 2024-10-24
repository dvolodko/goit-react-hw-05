import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../js/tmdb-api';
import MovieList from '../components/MovieList/MovieList';

function HomePage() {
  const [moviesData, setMoviesData] = useState([]);
  useEffect(() => {
    async function fetchTrendingMoviesHandler() {
      try {
        const data = await fetchTrendingMovies();
        setMoviesData(data.results);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchTrendingMoviesHandler();
  }, []);

  return (
    <main>
      <div className="container">
        <h1>Trending today</h1>
        <MovieList moviesData={moviesData} />
      </div>
    </main>
  );
}

export default HomePage;
