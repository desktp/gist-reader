import { combineReducers } from "redux";
import AppReducer from './AppReducer';

export default function getRootReducer(NavigationReducer) {
    return combineReducers({
        nav: NavigationReducer,
        app: AppReducer
    });
};
