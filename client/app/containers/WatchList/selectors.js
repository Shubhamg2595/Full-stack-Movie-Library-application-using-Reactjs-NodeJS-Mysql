import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the watchList state domain
 */

const selectWatchListDomain = state => state.watchList || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by WatchList
 */

const makeSelectWatchList = () =>
  createSelector(
    selectWatchListDomain,
    substate => substate,
  );

export default makeSelectWatchList;
export { selectWatchListDomain };
