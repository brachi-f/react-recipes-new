
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
                return { ...state }
            }
        case actionsName.ADD_CATEGORY:
            {
                let cat = intialState.categories;
                cat.push(action.data);
                return { ...state, categories: cat }
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
                return { ...state, difficulties: [{ Id: 1, Name: 'קל' }, { Id: 2, Name: 'בינוני' }, { Id: 3, Name: 'קשה' }] }
            }
    }
}
export default reducer;


