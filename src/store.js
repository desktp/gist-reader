import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import getRootReducer from "./reducers";

export default function getStore(NavigationReducer) {
    const store = createStore(
        getRootReducer(NavigationReducer),
        undefined,
        applyMiddleware(thunk)
    );

    return store;
}
