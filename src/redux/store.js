import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import UserReducer from "./reducers/UserReducer";
import DataReducer from "./reducers/DataReducer";
import UiReducer from "./reducers/UiReducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: UserReducer,
  data: DataReducer,
  UI: UiReducer
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
