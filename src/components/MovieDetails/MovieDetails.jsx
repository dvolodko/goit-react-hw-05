import { Suspense } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import BarLoader from 'react-spinners/BarLoader';
import css from './MovieDetails.module.css';

const override = {
  display: 'block',
  margin: '32px auto 0',
};

function MovieDetails({
  movieData: {
    poster_path,
    title,
    release_date = 'n/a-0',
    vote_average = 0,
    overview,
    genres = [],
  },
}) {
  const location = useLocation();
  const backLinkHref = location.state ?? '/';

  return (
    <>
      <Link to={backLinkHref}>Go back</Link>
      <div className={css.movieDetailsWrapper}>
        <div className={css.posterWrapper}>
          <img
            src={`https://image.tmdb.org/t/p/w342${poster_path}`}
            alt={title}
          />
        </div>
        <div className={css.movieDetailsDescription}>
          <h1>
            {title} ({release_date.split('-')[0]})
          </h1>
          <div className={css.voteScore}>
            <img
              className={css.voteScoreImg}
              src="https://em-content.zobj.net/source/apple/391/star_2b50.png"
              alt="star emoji"
            />
            <p>{vote_average.toFixed(2)}</p>
          </div>
          <h2>Overview</h2>
          <p className={css.movieDetailsOverview}>{overview}</p>
          <h2>Genres</h2>
          <p className={css.movieDetailsGenres}>
            {genres.map((genre) => {
              return <span key={genre.id}>{genre.name}</span>;
            })}
          </p>
        </div>
      </div>
      <ul>
        <li>
          <Link to="cast" state={backLinkHref}>
            Cast
          </Link>
        </li>
        <li>
          <Link to="reviews" state={backLinkHref}>
            Reviews
          </Link>
        </li>
      </ul>

      <Suspense
        fallback={
          <BarLoader
            loading={true}
            height={4}
            width={320}
            cssOverride={override}
            color="orangered"
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        }>
        <Outlet />
      </Suspense>
    </>
  );
}

export default MovieDetails;
