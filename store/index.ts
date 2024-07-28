import createSagaMiddleware from 'redux-saga';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { setContext, fork } from 'redux-saga/effects';

type ContextType = {};

function* rootSaga(context: ContextType) {
  yield setContext(context);
  // TODO: connect watcher forks
}

const configureAppStore = (context = {}): EnhancedStore => {
  const saga = createSagaMiddleware();

  const store = configureStore({
    reducer: {},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga),
  });

  saga.run(rootSaga, context);

  return store;
};

export default configureAppStore;
