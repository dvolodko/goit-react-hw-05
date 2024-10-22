import clsx from 'clsx';
import css from './Navigation.module.css';
import { NavLink } from 'react-router-dom';

function buildLinkClass({ isActive }) {
  return clsx(css.link, isActive && css.active);
}

function Navigation() {
  return (
    <header className={css.header}>
      <nav>
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={buildLinkClass}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
}

export default Navigation;
