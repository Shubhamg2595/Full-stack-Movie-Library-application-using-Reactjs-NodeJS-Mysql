/*
 *
 * MovieCard reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, UPDATE_WATCHLIST } from './constants';

export const initialState = {
  isLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const movieCardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case UPDATE_WATCHLIST:
        draft.isLoading = true;
    }
  });

export default movieCardReducer;
