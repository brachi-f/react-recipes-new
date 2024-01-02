
//reducer.js

import axios from 'axios';
import * as actionsName from './action';
const intialState = {
    recipies: [],
    categories: [],
    selectedRecipe: null,
    user: null,
    shoppingList: []
}
const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionsName.SET_CATEGORIES:
            {
                let categories = actionsName.getCategories()
                return { ...state, categories };
            }
        case actionsName.ADD_RECIPE:
            {
                return { ...state }
            }
        case actionsName.ADD_CATEGORY:
            {
                return { ...state }
            }
        case actionsName.ADD_PRODUCT:
            {
                return { ...state }
            }
        case actionsName.DELETE_PRODUCT:
            {
                return { ...state }
            }
        case actionsName.DELET_ERECIPE:
            {
                return { ...state }
            }
        case actionsName.SET_USER:
            {
                return { ...state, user: action.user }
            }
        case actionsName.UPDATE_PRODUCT:
            {
                return { ...state }
            }
        case actionsName.UPDATE_RECIPE:
            {
                return { ...state }
            }
        default:
            {
                // let recipies = [];
                // let categories = [];

                // axios.get(`http://localhost:8080/api/recipe`)
                //     .then(res => recipies = res.data)
                //     .catch(err => alert(err.response.data));

                // axios.get(`http://localhost:8080/api/category`)
                //     .then(res => categories = res.data)
                //     .catch(err => alert(err.response.data));

                // return { ...state, recipies, categories };
                return {...state}

            }
    }
}
export default reducer;


