import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { FiSearch } from 'react-icons/fi';
import { fetchMovies } from '../js/tmdb-api';
import MovieList from '../components/MovieList/MovieList';

function MoviesPage() {
  const [query, setQuery] = useState('');
  const [moviesData, setMoviesData] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get('movie') ?? '';

  useEffect(() => {
    async function fetchMoviesHandler() {
      try {
        setError(false);
        const data = await fetchMovies(movieName);
        if (data.results.length === 0) {
          toast('There is no results with this search query', {
            icon: '🙈',
            position: 'top-right',
            duration: 4000,
          });
          return;
        }
        toast.success(`Hooray! We've found ${data.total_results} movies!`, {
          position: 'top-right',
          duration: 4000,
        });
        setMoviesData(data.results);
      } catch (error) {
        setError(true);
        setErrorMessage(error.message);
        toast.error(error.message, { position: 'top-right', duration: 4000 });
      }
    }
    if (movieName) {
      fetchMoviesHandler();
    }
  }, [movieName]);

  function updateQueryString(movie) {
    const nextParams = movie !== '' ? { movie } : {};
    setSearchParams(nextParams);
  }

  function submitHandler(e) {
    e.preventDefault();
    if (!query) {
      toast.error('Search query can`t be empty', { position: 'top-right' });
    } else {
      updateQueryString(query);
      onSubmitReset();
      e.target.reset();
    }
  }

  function onSubmitReset() {
    setQuery('');
    setMoviesData([]);
  }

  return (
    <div>
      <Toaster />
      <form onSubmit={submitHandler} className="movieSearchForm">
        <input
          name="input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className="movieSearchInput"
        />
        <button type="submit" className="movieSearchSubmitButton">
          <FiSearch />
          Search
        </button>
      </form>
      {error ? <p>{errorMessage}</p> : <MovieList moviesData={moviesData} />}
    </div>
  );
}

export default MoviesPage;
