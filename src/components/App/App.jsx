import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import BarLoader from 'react-spinners/BarLoader';
import NotFoundPage from '../../pages/NotFoundPage';
import Navigation from '../Navigation/Navigation';
import css from './App.module.css';
// import { useState, useEffect } from 'react';

const HomePage = lazy(() => import('../../pages/HomePage'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage'));
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage'));
const MovieCast = lazy(() => import('../MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews'));

const override = {
  display: 'block',
  margin: '32px auto 0',
};

function App() {
  return (
    <div className={css.container}>
      <Navigation />
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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
