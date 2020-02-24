import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the movieCard state domain
 */

const selectMovieCardDomain = state => state.movieCard || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MovieCard
 */

const makeSelectMovieCard = () =>
  createSelector(
    selectMovieCardDomain,
    substate => substate,
  );

export default makeSelectMovieCard;
export { selectMovieCardDomain };
