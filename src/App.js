import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './user/Login';
import Signin from './user/Signin';
import Home from './user/Home'

function App() {
  return (<>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login />} />
      <Route path='/signin' element={<Signin/>}/>
    </Routes>
  </>);
}

export default App;
