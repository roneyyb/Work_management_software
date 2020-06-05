import { createStore, applyMiddleware } from 'redux';
import {AsyncStorage} from 'react-native';
import ReduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import appReducer from '../reducer';
import { DESTROY_STATE } from '../actions/types';

const rootReducer = (state, action) => {
  if (action.type == DESTROY_STATE) {
    state = undefined;
  }

  return appReducer(state, action);
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['show', 'task', 'worklist', 'auth', 'signup']
};

const persistreducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistreducer, {}, applyMiddleware(ReduxThunk));
const persistor = persistStore(store);
//dont use capital letter here it causes error

export { persistor, store };
