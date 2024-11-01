import axios from 'axios';

const KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDZmNzAzZDBlOWY5MTAwOGRiZGNiYzg5MzM0YjM4MSIsIm5iZiI6MTcyODk5MjQ0MC4xOTU0NTgsInN1YiI6IjYzYmU3MDRhNWJlMDBlMDA3YzVhYjljMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mY4IqXmdWBwhS76EfCKDOc4UztsNGqusbTIQauZSHAk';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const config = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${KEY}`,
  },
  params: {
    include_adult: false,
    language: 'en-US',
  },
};

async function fetchTrendingMovies() {
  return await fetch('trending/movie/day');
}

async function fetchMovieDetails(id) {
  return await fetch(`movie/${id}`);
}

async function fetchMovieCast(id) {
  return await fetch(`movie/${id}/credits`);
}

async function fetchMovieReviews(id) {
  return await fetch(`movie/${id}/reviews`);
}

async function fetchMovies(query) {
  config.params.query = query;
  return await fetch('search/movie');
}

async function fetch(url) {
  const response = await axios.get(url, config);

  return response.data;
}

export {
  fetchTrendingMovies,
  fetchMovieDetails,
  fetchMovieCast,
  fetchMovieReviews,
  fetchMovies,
};
