import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './user/Login';
import Signin from './user/Signin';
import Home from './user/Home'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as actionName from './store/action'
import axios from 'axios';
import ListRecipes from './recipes/ListRecipe';
import AllRecipe from './recipes/AllRecipe';
import FormRecipe from './recipes/FormRecipe';
import ShoppingList from './shopping/ShoppingList';

function App() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(`http://localhost:8080/api/category`)
      .then(res => {
        dispatch({ type: actionName.SET_CATEGORIES, data: res?.data })
      })
      .catch(err => {
        alert(err.response?.data);
      });
    

  }, [])
  return (<>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/home' element={<Home />} />
      <Route path='/recipe' element={<ListRecipes />} />
      <Route path='/edit' element={<FormRecipe />} />
      <Route path='/show' element={<AllRecipe />} />
      <Route path='/buy' element={<ShoppingList />} />
    </Routes>
  </>);
}

export default App;
