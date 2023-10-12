import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'; // 비동기 액션 처리를 위한 미들웨어
import { userNameReducer } from './reducer/userNameReducer'; // 리듀서를 import
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  userName: userNameReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
