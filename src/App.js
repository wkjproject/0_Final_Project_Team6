import './App.css';
import './components/ProjectPage.css';
//import ProjectData from './components/ProjectData';
import ProjectData2 from './components/ProjectData2';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Pages/Home';
import OpenProj from './components/Pages/OpenProj';
import NewProj from './components/Pages/NewProj';
import DeadlineProj from './components/Pages/DeadlineProj';
import SearchPage from './components/Pages/SearchPage';
import Login from './components/Pages/Login';
import Signup from './components/Pages/Signup';
import NotFound from './components/Pages/NotFound';
import LandingPage from './components/LandingPage/LandingPage';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Pages/Home';
import OpenProj from './components/Pages/OpenProj';
import NewProj from './components/Pages/NewProj';
import DeadlineProj from './components/Pages/DeadlineProj';
import { Login } from './components/Pages/MemberService/Login';
import Signup from './components/Pages/MemberService/Signup';
import NotFound from './components/Pages/NotFound';
import IdpwFind from './components/Pages/MemberService/IdpwFind';

function App() {
  return (
    <div className='App'>
      <h1>최종 프로젝트 팀6</h1>
    </div>
  );
}

export default App;
