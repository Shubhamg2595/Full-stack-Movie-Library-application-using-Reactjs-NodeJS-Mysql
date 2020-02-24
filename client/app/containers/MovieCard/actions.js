/*
 *
 * MovieCard actions
 *
 */

import {
  DEFAULT_ACTION,
  UPDATE_WATCHLIST,
  UPDATE_WATCHLIST_SUCCESS,
  GET_RATINGS_BY_MOVIE_ID,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function updateWatchList(payload) {
  return {
    type: UPDATE_WATCHLIST,
    payload,
  };
}

export function updateWatchListSuccess(payload) {
  return {
    type: UPDATE_WATCHLIST_SUCCESS,
    payload,
  };
}

export function getRatingForMovie(movieId) {
  return {
    type: GET_RATINGS_BY_MOVIE_ID,
    movieId,
  };
}
