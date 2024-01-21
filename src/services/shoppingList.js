import axios from "axios";
import * as actionName from '../store/action'
import Swal from "sweetalert2";

export const getProductsDispatch = (userId) => {
    return dispatch => {
        axios.get(`http://localhost:8080/api/bay/${userId}`)
            .then(x => dispatch({ type: actionName.SET_PRODUCTS, data: x.data }))
            .catch(err=> Swal.fire({
                 title: err.response.data,
                icon: 'error'
            }))
    }
} 

export const getProducts = (userId)=>axios.get(`http://localhost:8080/api/bay/${userId}`);

export const addProuductDispatch = (product)=>{
    return dispatch =>{
        axios.post(`http://localhost:8080/api/bay`, product)
        .then(res => {
                dispatch({ type: actionName.ADD_PRODUCT, data: res.data }) 
                Swal.fire({
                    position: 'top-right',
                    title: 'המוצר הוסף בהצלחה',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                })
        })
        .catch(err => Swal.fire({
            title: err.response.data,
            icon: 'error'
        }));
    }
}

export const addProuduct = (product)=> axios.post(`http://localhost:8080/api/bay`,product);

export const updateProduct = (product,i)=>{
    return dispatch=>{
        axios.post(`http://localhost:8080/api/bay`, product)
        .then(res => {
                dispatch({ type: actionName.UPDATE_PRODUCT, data: res.data, index: i })
                Swal.fire({
                    position: 'top-right',
                    title: 'המוצר עודכן בהצלחה',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                })
        })
        .catch(err => console.log("add product error: ", err.response));
    }
}

export const deleteProduct =(productId) => axios.post(`http://localhost:8080/api/bay/delete/${productId}`);

export const deleteProductDispatch = (productId)=>{
    return dispatch=>{
        axios.post(`http://localhost:8080/api/bay/delete/${productId}`)
        .then(res => {
            dispatch({ type: actionName.DELETE_PRODUCT, id: productId })
            Swal.fire({
                title: 'המוצר נמחק בהצלחה',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
            })
        })
        .catch(err => alert("delete product error: ",err.response?.data))
    }
}