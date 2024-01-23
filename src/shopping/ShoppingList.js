import React, { useState } from "react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormField, Header, Icon, Message, Modal, ModalActions, ModalContent, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import * as products from '../services/shoppingList'
import Swal from "sweetalert2";
import { InputRef } from "../user/Login";
import * as actionName from '../store/action'

const ShoppingList = () => {

    const schema = yup.object().shape({
        Name: yup.string().required('לא הוכנס שם'),
        Count: yup.number().integer('כמות לא תקינה').required('לא הוכנסה כמות')
    }).required();

    const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema), });

    const list = useSelector(state => state.shoppingList);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [temp, refresh] = useState(true);

    const deleteItem = (itemToDelete) => {
        dispatch(products.deleteProductDispatch(itemToDelete.Id));
    }

    const onSubmit = (data) => {
        let i = list.findIndex(p => p.Name === data.Name);
        products.addProuduct({ Name: data.Name, Count: data.Count, UserId: user.Id })
            .then(res => {
                i < 0 ?
                    dispatch({ type: actionName.ADD_PRODUCT, data: res.data }) :
                    dispatch({ type: actionName.UPDATE_PRODUCT, data: res.data, index: i });
                Swal.fire({
                    position: 'top-right',
                    title: 'המוצר עודכן בהצלחה',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                });
                setOpen(false);
            }).catch(err => console.log("add product error: ", err.response));
    }

    const updateProduct = (p, c) => {
        products.addProuduct({ ...p, Count: c }).then(res => {
            dispatch({ type: actionName.UPDATE_PRODUCT, data: res.data, index: list.findIndex(e => e.Name === p.Name) })
            Swal.fire({
                position: 'top-right',
                title: 'המוצר עודכן בהצלחה',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
            });
            refresh(!temp);
        }).catch(err => console.log("add product error: ", err.response));
    }

    return < >
        {user === null ? navigate('/home') : null}
        <div className="container buy-table">
            <Button onClick={() => { setOpen(true) }}>
                <Icon name="plus" style={{ margin: 10 }} /> הוסף מוצר</Button>
            <Table celled={false} columns={3} textAlign="center" style={{ width: '50vw' }}>
                < TableHeader>
                    <TableHeaderCell>מוצר</TableHeaderCell>
                    <TableHeaderCell>כמות</TableHeaderCell>
                    <TableHeaderCell>{"   "}</TableHeaderCell>
                </TableHeader>
                <TableBody>
                    {list.map((p) =>
                        <TableRow key={p.Id}>
                            <TableCell>{p.Name}</TableCell>
                            <TableCell>{p.Count}</TableCell>
                            <TableCell>
                                <Button icon onClick={() => {
                                    Swal.fire({
                                        title: "אתה בטוח?",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#3085d6",
                                        cancelButtonColor: "#d33",
                                        confirmButtonText: "כן, תמחק!",
                                        cancelButtonText: 'לא'
                                    }).then((result) => {
                                        if (result.isConfirmed)
                                            deleteItem(p)
                                    });
                                }}>
                                    <Icon name="trash alternate" />
                                </Button>
                                <Button icon onClick={() => {
                                    updateProduct(p, 1);
                                }}>
                                    <Icon name="plus" />
                                </Button>
                                <Button icon onClick={() => {
                                    updateProduct(p, -1);
                                }}>
                                    <Icon name="minus" />
                                </Button>
                            </TableCell>
                        </TableRow>)}
                </TableBody>
            </Table>
            <Modal open={open} size="small"  >
                <Header content='הוספת מוצר' />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <ModalContent>
                        <FormField>
                            <label>שם</label>
                            <InputRef {...register("Name")} />
                        </FormField>
                        <FormField>
                            <label>כמות</label>
                            <InputRef {...register("Count")} />
                        </FormField>

                        {errors?.Name ? (
                            <Message warning header={errors?.Name?.message} />
                        ) : (
                            <></>
                        )}
                        {errors?.Count ? (
                            <Message warning header={errors?.Count?.message} />
                        ) : (
                            <></>
                        )}
                    </ModalContent>
                    <ModalActions>
                        <Button type="submit" >
                            <Icon name='checkmark' /> הוספה
                        </Button>
                        <Button color='red' onClick={() => setOpen(false)}>
                            <Icon name='remove' /> ביטול
                        </Button>
                    </ModalActions>
                </Form>
            </Modal>
        </div >
    </>
}
export default ShoppingList;