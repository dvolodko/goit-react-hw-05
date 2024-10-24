import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { fetchMovie } from '../js/tmdb-api';

function MovieDetailsPage() {
  const [movieData, setMovieData] = useState(null);

  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = location.state ?? '/';

  useEffect(() => {
    async function fetchMovieHandler() {
      try {
        const data = await fetchMovie(movieId);
        setMovieData(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchMovieHandler();
  }, [movieId]);

  const posterPath = movieData
    ? movieData.poster_path
    : '/1E5baAaEse26fej7uHcjOgEE2t2.jpg';
  const title = movieData ? movieData.title : 'movie title';
  const releaseDate = movieData ? movieData.release_date : '2024-12-12';
  const voteAverage = movieData ? movieData.vote_average : 'n/a';
  const overview = movieData ? movieData.overview : 'n/a';
  const genres = movieData ? movieData.genres : [{ id: 1, name: 'n/a' }];

  return (
    <main>
      <Link to={backLinkHref}>Go back</Link>
      <div>Movie Details Page 😔</div>
      <img src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt={title} />
      <h1>
        {title} ({releaseDate.split('-')[0]})
      </h1>
      <img
        src="https://em-content.zobj.net/source/apple/391/star_2b50.png"
        alt="star emoji"
      />
      <p>{voteAverage}</p>
      <h2>Overview</h2>
      <p>{overview}</p>
      <h2>Genres</h2>
      <p>
        {genres.map((genre) => {
          return <span key={genre.id}>{genre.name}</span>;
        })}
      </p>
    </main>
  );
}

export default MovieDetailsPage;
