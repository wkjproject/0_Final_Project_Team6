import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './components/LoginPage/Login';
import { Home } from './components/HomePage/Home';

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <div className='App'>
            <h1>최종 프로젝트 팀6</h1>
          </div>
        }
      />
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  );
}

export default App;
