import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './user/Login';
import Signin from './user/Signin';
import Home from './user/Home'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import * as actionName from './store/action'
import Recipes from './recipes/rex';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(`http://localhost:8080/api/category`)
      .then(res => {
        dispatch({ type: actionName.SET_CATEGORIES, data: res.data })
      })
      .catch(err => {
        console.log(err.response.data);
        alert(err.response.data);
      });
    axios.get(`http://localhost:8080/api/recipe`)
      .then(res => {
        dispatch({ type: actionName.SET_RECIPES, data: res.data })
      })
      .catch(err => {
        console.log(err.response.data);
        alert(err.response.data);
      });
  }, [])
  return (<>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/home' element={<Home />} />
      <Route path='recipe' element={<Recipes/>}/>
    </Routes>
  </>);
}

export default App;
