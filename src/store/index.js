import { compose, applyMiddleware, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";

import storage from "localforage";

import rootReducer from "./Reducers";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./Sagas";

const persistConfig = {
  storage,
  key: "root",
  timeout: 5000,
  blacklist: ["searchResults", "token"],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

function configureStore() {
  const devOn = window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const composeEnhancers = devOn
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
  const middleware = [sagaMiddleware];

  if (devOn) {
    middleware.unshift(logger);
  }

  const middlewares =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? [logger, sagaMiddleware]
      : [sagaMiddleware];

  let store = createStore(
    persistedReducer,
    {},
    composeEnhancers(applyMiddleware(...middlewares))
  );
  let persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return [store, persistor];
}

export default configureStore;
