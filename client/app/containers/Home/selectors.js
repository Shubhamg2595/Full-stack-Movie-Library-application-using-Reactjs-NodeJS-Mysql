import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the home state domain
 */

const selectHomeDomain = state => state.home || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Home
 */

const makeSelectHome = () =>
  createSelector(
    selectHomeDomain,
    substate => substate,
  );
const selectAllMovies = () =>
  createSelector(
    selectHomeDomain,
    substate => substate.movies,
  );
const selectWatchList = () =>
  createSelector(
    selectHomeDomain,
    substate => substate.watchList,
  );
const selectHasMoreMovies = () =>
  createSelector(
    selectHomeDomain,
    substate => substate.hasmore,
  );
const selectHasPrevMovies = () =>
  createSelector(
    selectHomeDomain,
    substate => substate.hasprev,
  );
const selectCurrentPage = () =>
  createSelector(
    selectHomeDomain,
    substate => substate.page,
  );
const selectLoader = () =>
  createSelector(
    selectHomeDomain,
    substate => substate.isLoading,
  );

export default makeSelectHome;
export {
  selectHomeDomain,
  selectAllMovies,
  selectHasMoreMovies,
  selectHasPrevMovies,
  selectCurrentPage,
  selectLoader,
  selectWatchList,
};
