/*
 *
 * Home reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  FETCH_MOVIES,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_ERROR,
  FETCH_NEXT_MOVIESET,
  FETCH_PREV_MOVIESET,
  APPEND_RATING_TO_MOVIECARD,
  SET_LOADER,
  FETCH_WATCHLIST_SUCCESS,
  UPDATE_WATCHLIST,
} from './constants';

export const initialState = {
  isLoading: false,
  error: null,
  movies: {},
  hasmore: false,
  hasprev: false,
  page: 1,
  watchList: {},
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SET_LOADER:
        draft.isLoading = action.bool;
        break;
      case FETCH_MOVIES:
        draft.isLoading = true;
        break;
      case FETCH_MOVIES_ERROR:
        draft.isLoading = false;
        draft.error = action.error;
        break;
      case FETCH_MOVIES_SUCCESS:
        draft.isLoading = false;
        draft.movies = reduceArrayOfObjectsToMap(
          action.payload.movies,
          'movieId',
        );
        draft.hasmore = action.payload.hasmore;
        draft.hasprev = action.payload.hasprev;
        break;
      case FETCH_NEXT_MOVIESET:
        draft.page += 1;

        break;
      case FETCH_PREV_MOVIESET:
        if (state.page > 1) {
          draft.page -= 1;
        }
        break;
      case APPEND_RATING_TO_MOVIECARD:
        draft.movies[action.movieId] = {
          ...state.movies[action.movieId],
          rating: action.rating,
        };
        break;
      case FETCH_WATCHLIST_SUCCESS:
        draft.watchList = reduceArrayOfObjectsToMap(action.payload, 'movieId');
        break;
      case UPDATE_WATCHLIST:
        if (action.payload.task === 'add') {
          const movieData = { 0: action.movieDetails };
          if (Object.keys(state.watchList).length === 0) {
            draft.watchList = reduceArrayOfObjectsToMap(movieData, 'movieId');
          } else {
            draft.watchList = {
              ...draft.watchList,
              [action.movieDetails.movieId]: reduceArrayOfObjectsToMap(
                movieData,
                'movieId',
              )[action.movieDetails.movieId],
            };
          }
          draft.movies[action.movieDetails.movieId].watched = 1;
        }

        if (action.payload.task === 'remove') {
          delete draft.watchList[action.payload.movieId];
          draft.movies[action.movieDetails.movieId].watched = 0;
        }

        break;
    }
  });

export default homeReducer;

function reduceArrayOfObjectsToMap(array, objKey) {
  const reducedMap = {};
  Object.keys(array).map(key => {
    reducedMap[array[key][objKey]] = {
      ...array[key],
    };
    return null;
  });
  return reducedMap;
}
