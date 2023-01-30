import { useReducer } from 'react';
import { UPDATE_ACCOUNT_STATUS, UPDATE_USER_NAME } from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_ACCOUNT_STATUS:
      console.log('UPDATE_ACCOUNT_STATUS dispatched');
      return {
        ...state,
        isLoggedIn: !action.isLoggedIn,
      };
    case UPDATE_USER_NAME:
      console.log('UPDATE_USER_NAME dispatched');
      return {
        ...state,
        userName: action.userName,
      };
    default:
      return state;
  }
};

export function useAccountReducer(initialState) {
  return useReducer(reducer, initialState);
}
