import * as types from '../actions/types';
import initialState from './initialState';
import { browserHistory } from 'react-router';

export default function advanceSearchReducer(state = initialState.advanceSearch, action) {
  switch(action.type) {
    case types.FETCH_NEW_ADVANCE_SEARCH_RESULT_SUCCESS:
      browserHistory.push('search');
      return Object.assign({}, state, action.advanceSearch, {
        start: action.length,
        length: action.length,
        hasNext: action.hasNext
      });

    case types.FETCH_MORE_ADVANCE_SEARCH_RESULT_SUCCESS:
      return Object.assign({}, state, action.advanceSearch, {
        start: state.start + action.length,
        length: action.length,
        hasNext: action.hasNext
      });

    default:
      return state;
  }
}
