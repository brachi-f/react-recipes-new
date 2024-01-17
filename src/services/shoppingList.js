import axios from "axios";
import * as actionName from '../store/action'

export const getProducts = (userId) => {
    return axios.get(`http://localhost:8080/api/bay/${userId}`);
}
export const getProductsDispatch = (userId) => {
    return dispatch => {
        axios.get(`http://localhost:8080/api/bay/${userId}`)
            .then(x => dispatch({ type: actionName.SET_PRODUCTS, data: x.data }))
    }
}

