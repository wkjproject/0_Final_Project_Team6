import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'; // 비동기 액션 처리를 위한 미들웨어
import promiseMiddleware from 'redux-promise';
import { userNameReducer } from './reducer/userNameReducer'; // 리듀서를 import
import { composeWithDevTools } from 'redux-devtools-extension';
import { userAddrReducer } from './reducer/userAddrReducer';
import { projNameReducer } from './reducer/projNameReducer';
import { projStatusReducer } from './reducer/projStatusReducer';
import { authReducer } from './reducer/authReducer';
import { userPhoneNumReducer } from './reducer/userPhoneNumReducer';
import { userMailReducer } from './reducer/userMailReducer';
import { projPlaceAddrReducer } from './reducer/projPlaceAddrReducer';
import { idReducer } from './reducer/idReducer';
import { userDataReducer } from './reducer/userDataReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 저장 엔진을 선택할 수 있습니다.

// 일단은 이렇게 변수 하나당 한개의 리듀서로 가다가
// 최종안 나오면 user끼리 project끼리 합치는게 나을거같아요.

const rootReducer = combineReducers({
  userName: userNameReducer,
  userPhoneNum: userPhoneNumReducer,
  userAddr: userAddrReducer,
  projName: projNameReducer,
  userMail: userMailReducer,
  projStatus: projStatusReducer,
  auth: authReducer,
  projPlaceAddr: projPlaceAddrReducer,
  _id: idReducer,
  userData: userDataReducer,
});

const persistConfig = {
  key: 'root', // 로컬 스토리지의 키
  storage, // 저장 엔진
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk, promiseMiddleware))
);

export const persistor = persistStore(store);
