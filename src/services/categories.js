import axios from "axios"
import Swal from "sweetalert2"
import { useDispatch } from 'react-redux'
import * as actionName from '../store/action'
export const getCategoriesDispatch = () => {
    return dispatch => {
        axios.get('http://localhost:8080/api/category')
            .then(res => {
                dispatch({ type: actionName.SET_CATEGORIES, data: res.data })
            }).catch(err => Swal.fire({
                icon: 'error',
                title: err.response?.data,
                showConfirmButton: false,
                timer: 2000
            }))
    }
}

export const addCategory = (Name) => {
    return axios.post('http://localhost:8080/api/category',{Name: Name});
}