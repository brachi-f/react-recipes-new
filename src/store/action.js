import axios from "axios";
import { useDispatch } from "react-redux";

export const SET_USER = "SET_USER";
export const ADD_RECIPE = "ADD_RECIPE";
export const DELET_ERECIPE = "DELETE_RECIPE";
export const UPDATE_RECIPE = "UPDATE_RECIPE";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const SET_CATEGORIES = "SET_CATEGORIES";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const getCategories = () => {
    //const dispatch = useDispatch();
    return dispatch => {

        axios.get("https://localhost:8080/api/category")
            .then(x => dispatch({ type: "SET_CATEGORIES", data: x.data }))

    }
}
