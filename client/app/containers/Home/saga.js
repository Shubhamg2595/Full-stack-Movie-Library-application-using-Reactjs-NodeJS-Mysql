import { takeLatest, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_MOVIES, FETCH_WATCHLIST } from './constants';
import { selectCurrentPage } from './selectors';
import {
  getAllMoviesError,
  getAllMoviesSuccess,
  getWatchListSuccess,
} from './actions';
// Individual exports for testing

export function* getAllMoviesSaga() {
  try {
    const currentPage = yield select(selectCurrentPage());

    const baseURL = 'http://localhost:8080/movies/allMovies';
    const URL = `${baseURL}/${currentPage}`;

    const response = yield axios.get(URL);
    if (response.status === 200) {
      yield put(getAllMoviesSuccess(response.data));
    }
  } catch (err) {
    yield put(getAllMoviesError({ error: 'no_data_found ' }));
    console.log('ERROR IN getAllMoviesSaga', err);
  }
}

export function* getWatchListSaga() {
  try {
    const baseURL = 'http://localhost:8080/movies/watchList';
    const response = yield axios.get(baseURL);
    if (response.status === 200) {
      yield put(getWatchListSuccess(response.data.watchList));
    }
  } catch (err) {
    console.log('ERROR in getWatchListSaga', err);
  }
}

export default function* homeSaga() {
  yield takeLatest(FETCH_MOVIES, getAllMoviesSaga);
  yield takeLatest(FETCH_WATCHLIST, getWatchListSaga);
}
