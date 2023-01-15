import { useReducer } from "react";
import { UPDATE_ACCOUNT_STATUS } from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_ACCOUNT_STATUS:
            return {
                ...state,
                isLoggedIn: !action.isLoggedIn,
            };
        default:
            return state;
    }
};

export function useAccountReducer(initialState) {
    return useReducer(reducer, initialState);
}
