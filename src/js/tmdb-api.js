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
  // params: {},
};

async function fetchTrendingMovies() {
  const response = await axios.get('trending/movie/week', config);

  return response.data;
}

export { fetchTrendingMovies };
