import axios from "axios";

export const getProducts = (userId) => {
    return axios.get(`http://localhost:8080/api/bay/${userId}`);
}