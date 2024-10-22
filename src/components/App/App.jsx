import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFoundPage from '../../pages/NotFoundPage';
import Navigation from '../Navigation/Navigation';
import css from './App.module.css';
// import { useState, useEffect } from 'react';

const HomePage = lazy(() => import('../../pages/HomePage'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage'));
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage'));
const MovieCast = lazy(() => import('../MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews'));

function App() {
  return (
    <div className={css.container}>
      <Navigation />
      <Suspense fallback={<div>Loading page...</div>}>
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
