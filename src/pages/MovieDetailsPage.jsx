import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../js/tmdb-api';
import MovieDetails from '../components/MovieDetails/MovieDetails';

function MovieDetailsPage() {
  const [movieData, setMovieData] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { movieId } = useParams();

  useEffect(() => {
    async function fetchMovieHandler() {
      try {
        setError(false);
        const data = await fetchMovieDetails(movieId);
        setMovieData(data);
      } catch (error) {
        setError(true);
        setErrorMessage(error.message);
        console.log(error.message);
      }
    }
    fetchMovieHandler();
  }, [movieId]);

  return (
    <main>
      <div className="container">
        {error ? <p>{errorMessage}</p> : <MovieDetails movieData={movieData} />}
      </div>
    </main>
  );
}

export default MovieDetailsPage;
