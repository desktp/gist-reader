import { combineReducers } from "redux";

export default function getRootReducer(NavigationReducer) {
    return combineReducers({
        nav: NavigationReducer
    });
};
