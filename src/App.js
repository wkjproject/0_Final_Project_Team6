import './App.css';

//import ProjectData from './components/ProjectData';
import ProjectData2 from '../src/components/ProjectData/ProjectDetail/ProjectData2';
import RewardSelect from '../src/components/ProjectData/RewardSelect/RewardSelect';

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
import ManageProj from './components/Pages/ManageProj';

import ReduxTest from './components/Pages/ReduxTest';
import Auth from './components/HigherOrderComponents/Auth';
import PopularProj from './components/Pages/PopularProj';
import ProjectPay from './components/ProjectData/ProjectPay/ProjectPay';
import Mypage from './components/Pages/Mypage/Mypage';
import CreateProj from './components/Pages/MemberService/CreateProj/CreateProj';
import WaitingProj from './components/Pages/WaitingProject/WaitingProj';
import ComingProj from './components/Pages/ComingProject/ComingProj';
import ManageUsers from './components/Pages/ManageUsers';

import Footer from './components/Footer/Footer';
import FundingStatus from './components/Pages/FundingStatus';
import ModifyProj from './components/Pages/MemberService/ModifyProj/ModifyProj';
import { ProjApiProvider } from '../src/context/ProjectsApiContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 5,
      },
    },
  });
  //null => 아무나 출입이 가능한 페이지
  //true => 로그인한 유저만 출입이 가능한 페이지
  //false => 로그인 한 유저는 출입 불가능한 페이지
  //3번째 인자 true 하면 관리자만 출입가능. default 값 false
  const AuthLogin = Auth(Login, false);
  const AuthSignup = Auth(Signup, false);
  const AuthHome = Auth(Home, null);
  const AuthMypage = Auth(Mypage, true);
  const AuthManageProj = Auth(ManageProj, true, true);
  const AuthManageUsers = Auth(ManageUsers, true, true);
  const AuthFundingStatus = Auth(FundingStatus, true);
  const AuthModifyProj = Auth(ModifyProj, true);
  return (
    <div className='App'>
      {/* <ProjectData></ProjectData> */}

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/home' element={<AuthHome />}>
            <Route index element={<PopularProj />} />
            <Route path='openProj' element={<OpenProj />} />
            <Route path='newProj' element={<NewProj />} />
            <Route path='deadlineProj' element={<DeadlineProj />} />
            <Route path='searchPage' element={<SearchPage />} />
            <Route path='searchPage/:keyword' element={<SearchPage />} />
          </Route>
          <Route
            path='/project2'
            element={
              <ProjApiProvider>
                <QueryClientProvider client={queryClient}>
                  <ProjectData2 />
                </QueryClientProvider>
              </ProjApiProvider>
            }
          />
          <Route path='/login' element={<AuthLogin />} />
          <Route path='/signup' element={<AuthSignup />} />
          <Route path='/idpwFind' element={<IdpwFind />} />
          <Route path='/*' element={<NotFound />} />
          <Route path='/projectPay' element={<ProjectPay />} />
          <Route
            path='/reward'
            element={
              <ProjApiProvider>
                <QueryClientProvider client={queryClient}>
                  <RewardSelect />
                </QueryClientProvider>
              </ProjApiProvider>
            }
          />
          <Route path='/reduxTest' element={<ReduxTest />} />
          <Route
            path='/manageProj'
            element={
              <ProjApiProvider>
                <QueryClientProvider client={queryClient}>
                  <AuthManageProj />
                </QueryClientProvider>
              </ProjApiProvider>
            }
          />
          <Route
            path='/comingProj'
            element={
              <ProjApiProvider>
                <QueryClientProvider client={queryClient}>
                  <ComingProj />
                </QueryClientProvider>
              </ProjApiProvider>
            }
          />
          <Route
            path='/waitingProj'
            element={
              <ProjApiProvider>
                <QueryClientProvider client={queryClient}>
                  <WaitingProj />
                </QueryClientProvider>
              </ProjApiProvider>
            }
          />
          <Route path='/mypage' element={<AuthMypage />} />
          <Route path='/createProj' element={<CreateProj />} />
          <Route path='/manageUsers' element={<AuthManageUsers />} />
          <Route path='/manageUsers' element={<ManageUsers />} />
          <Route path='/fundingStatus' element={<AuthFundingStatus />} />
          <Route path='/modifyProj' element={<AuthModifyProj />} />
        </Routes>
      </BrowserRouter>
      <Footer />
      {/* <hr /> */}
      {/* <hr /> */}
      {/* <ProjectData2></ProjectData2> */}
    </div>
  );
}

export default App;
