//import { combineReducers } from 'redux'

import {
  GET_POSTS,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
} from "../actions/actions";

export const initialState = {
  data: {},
  loading: false,
  hasErrors: false,
  error: "",
};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        loading: true,
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
        hasErrors: false,
      };
    case GET_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        hasErrors: true,
        error: action.error,
      };
    default:
      return state;
  }
}
