
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch, useSelector } from "react-redux";
import * as actionsName from '../store/action';
import { useState } from "react";
import React from 'react'
import { ModalContent, ModalActions, Button, Header, Icon, Modal, Form, FormField, Message } from 'semantic-ui-react'
import { InputRef } from "../user/Login";
import Swal from "sweetalert2";
import * as category from '../services/categories'

const Categories = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories);
    const nameSchema = yup.object().shape({
        Name: yup.string().required('לא הוכנס שם קטגוריה'),
    }).required();
    const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(nameSchema), });
    const [open, setOpen] = useState(false);
    const [err, setErr] = useState(false);
    const [errData, setErrData] = useState("");
    const onSubmit = (data) => {
        category.addCategory(data.Name) 
            .then(c => {
                dispatch({ type: actionsName.ADD_CATEGORY, data: c.data });
                setOpen(false);
                Swal.fire({
                    icon: 'success',
                    showConfirmButton: false,
                    title: 'קטגוריה הוספה בהצלחה',
                    timer: '1500'
                })
            }).catch(err => {
                setErrData(err.response?.data)
                console.log(err);
                setErr(true);
            })
    } 
   
    return <>
        <Modal
            open={open}
            trigger={<Button onClick={()=>setOpen(true)} >הוספת קטגוריה</Button>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            size="small"
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