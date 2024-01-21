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
                const recipes = state.recipes;
                recipes.push(action.data)
                return { ...state, recipes }
            }

        case actionsName.ADD_PRODUCT:
            {
                let shoppingList = state.shoppingList;
                shoppingList.push(action.data)
                return { ...state, shoppingList }
            }
        case actionsName.UPDATE_PRODUCT:
            {
                let list = state.shoppingList;
                list[action.index] = action.data;
                list.filter(p => p)
                return { ...state, shoppingList: list }
            }
        case actionsName.DELETE_PRODUCT:
            {
                let list = [];
                list = state.shoppingList;
                list = list.filter(s => s.Id !== action.id);
                return { ...state, shoppingList: list }
            }
        case actionsName.DELETE_RECIPE:
            {
                let recipes = state.recipes.filter(r => r != action.data);
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
                let recipes = state.recipes;
                let i = recipes.findIndex(r => r.Id === action.data.Id)
                recipes[i] = action.data;
                return { ...state, recipes }
            }
        case actionsName.SET_SELECTED_RECIPE:
            {
                return { ...state, selectedRecipe: action.data }
            }
        case actionsName.ADD_CATEGORY:
            {
                let categories = state.categories;
                categories.push(action.data)
                return { ...state, categories }
            }
        default:
            {
                return { ...state, difficulties: [{ Id: 1, Name: 'קל' }, { Id: 2, Name: 'בינוני' }, { Id: 3, Name: 'קשה' }] }
            }
    }
}
export default reducer;


