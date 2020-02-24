/*
 *
 * Home actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_MOVIES,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_ERROR,
  FETCH_NEXT_MOVIESET,
  FETCH_PREV_MOVIESET,
  APPEND_RATING_TO_MOVIECARD,
  SET_LOADER,
  FETCH_WATCHLIST,
  FETCH_WATCHLIST_SUCCESS,
  UPDATE_WATCHLIST,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getAllMovies() {
  return {
    type: FETCH_MOVIES,
  };
}
export function getAllMoviesSuccess(payload) {
  return {
    type: FETCH_MOVIES_SUCCESS,
    payload,
  };
}
export function getAllMoviesError(error) {
  return {
    type: FETCH_MOVIES_ERROR,
    error,
  };
}
export function fetchNextSetOfMovies() {
  return {
    type: FETCH_NEXT_MOVIESET,
  };
}
export function fetchPrevSetOfMovies() {
  return {
    type: FETCH_PREV_MOVIESET,
  };
}

export function appendRatingToMovie(movieId, rating) {
  return {
    type: APPEND_RATING_TO_MOVIECARD,
    movieId,
    rating,
  };
}
export function setLoader(bool) {
  return {
    type: SET_LOADER,
    bool,
  };
}

export function getWatchList() {
  return {
    type: FETCH_WATCHLIST,
  };
}

export function getWatchListSuccess(payload) {
  return {
    type: FETCH_WATCHLIST_SUCCESS,
    payload,
  };
}
export function updateWatchlist(payload, movieDetails) {
  return {
    type: UPDATE_WATCHLIST,
    payload,
    movieDetails,
  };
}
