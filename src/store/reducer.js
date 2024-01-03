import axios from 'axios';
import * as actionsName from './action';
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
        case actionsName.DELETE_PRODUCT:
            {
                return { ...state }
            }
        case actionsName.DELETE_ERECIPE:
            {
                return { ...state }
            }
        case actionsName.SET_USER:
            {
                let shoppingList = [];
                if (action.user)
                    axios.get(`http://localhost:8080/api/bay/${action.user.Id}`)
                        .then(res => shoppingList = res.data)
                        .catch(err => {
                            alert(err.response.data)
                        });
                return { ...state, user: action.user, shoppingList }
            }
        case actionsName.SET_PRODUCTS://אולי אפשר למחוק
            {
                let shoppingList=[];
                axios.get(`http://localhost:8080/api/bay/${action.userId}`)
                        .then(res => shoppingList = res.data)
                        .catch(err => {
                            alert(err.response.data)
                        });
                return { ...state, shoppingList }
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


