import { takeLatest, select, put } from 'redux-saga/effects';
import axios from 'axios';
import { UPDATE_WATCHLIST, GET_RATINGS_BY_MOVIE_ID } from './constants';
import { selectAllMovies } from '../Home/selectors';
import { appendRatingToMovie, updateWatchlist } from '../Home/actions';

export function* updateWatchListSaga(action) {
  const baseURL = 'http://localhost:8080/movies/watchList/';
  const response = yield axios.put(baseURL, action.payload);
  if (response.data.code === 200) {
    yield put(updateWatchlist(action.payload, response.data.movie));
  }
}

export function* getMovieRatingSaga(action) {
  const { movieId } = action;
  const movieDetails = yield select(selectAllMovies());
  if (movieDetails && movieDetails[movieId]) {
    if (movieDetails[movieId].rating === undefined) {
      const baseURL = 'http://localhost:8080/rating';
      const URL = `${baseURL}/${movieId}`;
      const response = yield axios.get(URL);
      if (response.status === 200) {
        yield put(appendRatingToMovie(movieId, response.data.rating));
      }
    }
  }
}

// Individual exports for testing
export default function* movieCardSaga() {
  yield takeLatest(UPDATE_WATCHLIST, updateWatchListSaga);
  yield takeLatest(GET_RATINGS_BY_MOVIE_ID, getMovieRatingSaga);
}
