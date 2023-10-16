import './App.css';
import './components/ProjectData2.css';
//import ProjectData from './components/ProjectData';
import ProjectData2 from './components/ProjectData2';
import RewardSelect from './components/RewardSelect';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Pages/Home';
import OpenProj from './components/Pages/OpenProj';
import NewProj from './components/Pages/NewProj';
import DeadlineProj from './components/Pages/DeadlineProj';
import SearchPage from './components/Pages/SearchPage';
import Signup from './components/Pages/MemberService/Signup';
import NotFound from './components/Pages/NotFound';
import LandingPage from './components/LandingPage/LandingPage';
import { Login } from './components/Pages/MemberService/Login';
import IdpwFind from './components/Pages/MemberService/IdpwFind';

import ReduxTest from './components/Pages/ReduxTest';
import Auth from './components/HigherOrderComponents/Auth';

function App() {
  //null => 아무나 출입이 가능한 페이지
  //true => 로그인한 유저만 출입이 가능한 페이지
  //false => 로그인 한 유저는 출입 불가능한 페이지
  //3번째 인자 true 하면 관리자만 출입가능. default 값 false
  const AuthLogin = Auth(Login, false);
  const AuthSignup = Auth(Signup, false);
  const AuthHome = Auth(Home, null);
  return (
    <div className='App'>
      {/* <ProjectData></ProjectData> */}

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/home' element={<AuthHome />} />
          <Route path='/openProj' element={<OpenProj />} />
          <Route path='/newProj' element={<NewProj />} />
          <Route path='/deadlineProj' element={<DeadlineProj />} />
          <Route path='/searchPage' element={<SearchPage />} />
          <Route path='/login' element={<AuthLogin />} />
          <Route path='/signup' element={<AuthSignup />} />
          <Route path='/idpwFind' element={<IdpwFind />} />
          <Route path='/*' element={<NotFound />} />
          <Route path='/project2' element={<ProjectData2 />} />
          <Route path='/reward' element={<RewardSelect />} />
          <Route path='/reduxTest' element={<ReduxTest />} />
        </Routes>
      </BrowserRouter>
      {/* <hr /> */}
      {/* <hr /> */}
      {/* <ProjectData2></ProjectData2> */}
    </div>
  );
}

export default App;
