
//categories.js
import { useForm, useFieldArray } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../store/reducer";
import { useEffect } from "react";
import * as actionsName from '../store/action';
import { useState } from "react";
import React, { Component } from 'react'
import { ModalContent, ModalActions, Button, Header, Icon, Modal, Form, FormField, Message, Input } from 'semantic-ui-react'
import { InputRef } from "../user/Login";
import axios from "axios";
const Categories = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories);
    const schema = yup.object().shape({
        Name: yup.string().required('לא הוכנס שם קטגוריה'),
    }).required();
    const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema), });
    const [open, setOpen] = useState(false);
    const [err, setErr] = useState(false);
    const [errData, setErrData] = useState("");
    const onSubmit = (data) => {
        axios.post(`http://localhost:8080/api/category`, { Name: data.Name })
            .then(c => {
                dispatch({ type: actionsName.ADD_CATEGORY, data: c });
                setOpen(false);
            }).catch(err => {
                setErrData(err.response.data)
                setErr(true);
            })
    }

    return <>
        <Modal
            closeIcon
            open={open}
            trigger={<Button>הוספת קטגוריה</Button>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >
            <Header content='הוספת קטגוריה' />
            <ModalContent>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormField>
                        <label>קטגוריה</label>
                        <InputRef {...register("Name")} onChange={() => setErr(false)} />
                    </FormField>
                    <Button type="submit">
                        <Icon name='checkmark' /> הוספה
                    </Button>
                </Form>
                {errors?.Name ? (
                    <Message warning header={errors?.Name?.message} />
                ) : (
                    <></>
                )}
                {err ? <Message warning header={errData} /> : <></>}
            </ModalContent>
            <ModalActions>
                <Button color='red' onClick={() => setOpen(false)}>
                    <Icon name='remove' /> ביטול
                </Button>
            </ModalActions>
        </Modal>
    </>
}
export default Categories;