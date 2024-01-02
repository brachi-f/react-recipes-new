
//categories.js
import { useForm, useFieldArray } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../store/reducer";
import { useEffect } from "react";
import * as actionsName from '../store/action';
import { useState } from "react";


const Categories = () => {
    const categories = useSelector(state=>state.categories);
    const schema = yup.object().shape({
        Name: yup.string().required(),
    }).required();
    const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema), });
    return <>
    {console.log(categories)}
    </>
}
export default Categories;