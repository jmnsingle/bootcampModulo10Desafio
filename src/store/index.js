import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import createStore from './createStore';
import persistReducers from './persistReducer';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middleawares = [sagaMiddleware];

const store = createStore(persistReducers(rootReducer), middleawares);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
