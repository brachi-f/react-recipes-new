import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './user/Login';
import Signin from './user/Signin';
import Home from './user/Home'
import Categories from './categories/Categories';

function App() {
  return (<>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login />} />
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/category' element={<Categories/>}/>
    </Routes>
  </>);
}

export default App;
