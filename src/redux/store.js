import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'; // 비동기 액션 처리를 위한 미들웨어
import promiseMiddleware from 'redux-promise';
import { userNameReducer } from './reducer/userNameReducer'; // 리듀서를 import
import { composeWithDevTools } from 'redux-devtools-extension';
import { userAddrReducer } from './reducer/userAddrReducer';
import { projNameReducer } from './reducer/projNameReducer';
import { authReducer } from './reducer/authReducer';
// 일단은 이렇게 변수 하나당 한개의 리듀서로 가다가
// 최종안 나오면 user끼리 project끼리 합치는게 나을거같아요.

const rootReducer = combineReducers({
  userName: userNameReducer,
  userAddr: userAddrReducer,
  projName: projNameReducer,
  auth: authReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, promiseMiddleware))
);
