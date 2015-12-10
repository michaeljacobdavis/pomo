import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import timer from '../middleware/timer';
import rootReducer from '../reducers';

const finalCreateStore = compose(
  applyMiddleware(thunk, timer)
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
}
