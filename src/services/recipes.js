import axios from "axios"
import Swal from "sweetalert2";
import * as actionName from '../store/action'

export const getRecipesDispatch=()=>{
    return dispatch =>{
        axios.get('http://localhost:8080/api/recipe').then(res => {
            dispatch({ type: actionName.SET_RECIPES, data: res.data })
        })
        .catch(err => {
             Swal.fire({icon: 'error',title: err.response?.data})
        });
    }
}
export const addRecipe=(recipe)=>{
    return axios.post('http://localhost:8080/api/recipe',recipe)
}

export const updateRecipe=(recipe)=>{
    return axios.post('http://localhost:8080/api/recipe/edit',recipe)
}
export const deleteRecipe = (recipeId)=>{
    return axios.post(`http://localhost:8080/api/recipe/delete/${recipeId}`)
}
