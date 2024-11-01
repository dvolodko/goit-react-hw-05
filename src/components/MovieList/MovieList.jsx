import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

function MovieList({ moviesData }) {
  const location = useLocation();
  return (
    <ul className={css.movieList}>
      {moviesData.map((movie) => {
        return (
          <li key={movie.id} className={css.movieCard}>
            <Link
              to={`/movies/${movie.id}`}
              state={location}
              className={css.movieLink}>
              <div className={css.posterWrapper}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>
              <h2 className={css.movieTitle}>{movie.title}</h2>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default MovieList;
