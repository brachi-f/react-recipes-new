import axios from 'axios';
import * as actionsName from './action';
import { act } from 'react-dom/test-utils';
import { getProducts } from '../services/shoppingList';
const intialState = {
    recipes: [], 
    categories: [],
    selectedRecipe: null,
    user: null,
    shoppingList: [],
    difficulties: []
}
const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionsName.SET_CATEGORIES:
            {
                return { ...state, categories: action.data };
            }
        case actionsName.SET_RECIPES:
            {
                return { ...state, recipes: action.data };
            }
        case actionsName.ADD_RECIPE:
            {
                const recipes = intialState.recipes;
                recipes.push(action.data)
                return { ...state, recipes }
            }

        case actionsName.ADD_PRODUCT:
            {
                let shoppingList = intialState.shoppingList;
                shoppingList.push(action.data)
                return { ...state, shoppingList }
            }
        case actionsName.UPDATE_PRODUCT:
            {
                let shoppingList = intialState.shoppingList;
                shoppingList[action.index] = action.data;
                return { ...state, shoppingList }
            }
        case actionsName.DELETE_PRODUCT:
            {
                let shoppingList = intialState.shoppingList;
                shoppingList = shoppingList.filter(s=>s.Id!=action.id);
                console.log("reducer delete product after delete: ",shoppingList)
                return { ...state, shoppingList }
            }
        case actionsName.DELETE_RECIPE:
            {
                let recipes = intialState.recipes.filter(r => r != action.data);
                return { ...state, recipes }
            }
        case actionsName.SET_USER:
            {
                return { ...state, user: action.user }
            }
        case actionsName.SET_PRODUCTS:
            {
                return { ...state, shoppingList: action.data }
            }
        case actionsName.UPDATE_RECIPE:
            {
                return { ...state }
            }
        case actionsName.SET_SELECTED_RECIPE:
            {
                return { ...state, selectedRecipe: action.data }
            }
        default:
            {
                return { ...state, difficulties: [{ Id: 1, Name: 'קל' }, { Id: 2, Name: 'בינוני' }, { Id: 3, Name: 'קשה' }] }
            }
    }
}
export default reducer;


