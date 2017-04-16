import * as types from '../actions/types';
import initialState from './initialState';

export default function searchAutoCompleteReducer(state = initialState.searchAutoComplete, action) {
  switch(action.type) {
    case types.FETCH_SEARCH_AUTO_COMPLETE_SUCCESS:
      return action.searchAutoComplete;

    default:
      return state;
  }
}
