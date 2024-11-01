import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './MovieCast.module.css';
import { fetchMovieCast } from '../../js/tmdb-api';

function MovieCast() {
  const [movieCastData, setMovieCastData] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { movieId } = useParams();

  useEffect(() => {
    async function fetchMovieHandler() {
      try {
        setError(false);
        const data = await fetchMovieCast(movieId);
        setMovieCastData(data.cast);
      } catch (error) {
        setError(true);
        setErrorMessage(error.message);
        console.log(error.message);
      }
    }
    fetchMovieHandler();
  }, [movieId]);

  return (
    <div>
      {error ? (
        <p>{errorMessage}</p>
      ) : (
        <ul className={css.movieCastList}>
          {movieCastData.length === 0 ? (
            <p>There is no cast data for this movie</p>
          ) : (
            movieCastData.map((profile) => (
              <li key={profile.id} className={css.movieCastItem}>
                <div className={css.profileImageWrapper}>
                  <img
                    src={`https://image.tmdb.org/t/p/w185${profile.profile_path}`}
                    alt={profile.name}
                  />
                </div>
                <p>{profile.name}</p>
                <p>Character: {profile.character}</p>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default MovieCast;
