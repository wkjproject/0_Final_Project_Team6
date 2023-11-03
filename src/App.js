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
import { ToastContainer } from 'react-toastify';

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
  const AuthOpenProj = Auth(OpenProj, null);
  const AuthNewProj = Auth(NewProj, null);
  const AuthDeadlineProj = Auth(DeadlineProj, null);
  const AuthSearchPage = Auth(SearchPage, null);
  const AuthProjectData2 = Auth(ProjectData2, null);
  const AuthIdpwFind = Auth(IdpwFind, false);
  const AuthProjectPay = Auth(ProjectPay, true);
  const AuthComingProj = Auth(ComingProj, true);
  const AuthWaitingProj = Auth(WaitingProj, true, true);
  const AuthCreateProj = Auth(CreateProj, true);
  return (
    <div className='App'>
      {/* <ProjectData></ProjectData> */}

      <BrowserRouter>
        <ToastContainer
          position='top-center'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
        <Header />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/home' element={<AuthHome />}>
            <Route index element={<PopularProj />} />
            <Route path='openProj' element={<AuthOpenProj />} />
            <Route path='newProj' element={<AuthNewProj />} />
            <Route path='deadlineProj' element={<AuthDeadlineProj />} />
            <Route path='searchPage' element={<AuthSearchPage />} />
            <Route path='searchPage/:keyword' element={<AuthSearchPage />} />
          </Route>
          <Route
            path='/project2'
            element={
              <ProjApiProvider>
                <QueryClientProvider client={queryClient}>
                  <AuthProjectData2 />
                </QueryClientProvider>
              </ProjApiProvider>
            }
          />
          <Route
            path='/project2/:projectId'
            element={
              <ProjApiProvider>
                <QueryClientProvider client={queryClient}>
                  <AuthProjectData2 />
                </QueryClientProvider>
              </ProjApiProvider>
            }
          />
          <Route path='/login' element={<AuthLogin />} />
          <Route path='/signup' element={<AuthSignup />} />
          <Route path='/idpwFind' element={<AuthIdpwFind />} />
          <Route path='/*' element={<NotFound />} />
          <Route path='/projectPay' element={<AuthProjectPay />} />
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
                  <AuthComingProj />
                </QueryClientProvider>
              </ProjApiProvider>
            }
          />
          <Route
            path='/waitingProj'
            element={
              <ProjApiProvider>
                <QueryClientProvider client={queryClient}>
                  <AuthWaitingProj />
                </QueryClientProvider>
              </ProjApiProvider>
            }
          />
          <Route path='/mypage' element={<AuthMypage />} />
          <Route path='/createProj' element={<AuthCreateProj />} />
          <Route path='/manageUsers' element={<AuthManageUsers />} />
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
