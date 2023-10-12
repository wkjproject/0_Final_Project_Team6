import './App.css';

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
      {/* <ProjectData></ProjectData> */}

      <BrowserRouter>
        <Header />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/openProj' element={<OpenProj />} />
          <Route path='/newProj' element={<NewProj />} />
          <Route path='/deadlineProj' element={<DeadlineProj />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/idpwFind' element={<IdpwFind />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
