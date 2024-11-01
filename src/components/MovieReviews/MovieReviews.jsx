import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './MovieReviews.module.css';
import { fetchMovieReviews } from '../../js/tmdb-api';

function MovieReviews() {
  const [movieReviewsData, setMovieReviewsData] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { movieId } = useParams();

  useEffect(() => {
    async function fetchMovieHandler() {
      try {
        setError(false);
        const data = await fetchMovieReviews(movieId);
        setMovieReviewsData(data.results);
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
        <ul className={css.movieReviewsList}>
          {movieReviewsData.length === 0 ? (
            <p>There is no reviews available for this movie</p>
          ) : (
            movieReviewsData.map((review) => (
              <li key={review.id} className={css.movieReviewsItem}>
                <p>Author: {review.author}</p>
                <p>{review.content}</p>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default MovieReviews;
