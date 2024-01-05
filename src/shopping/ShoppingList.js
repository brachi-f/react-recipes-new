import axios from "axios";
import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Button, Confirm, Icon, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react";
import * as actionName from '../store/action'

const ShoppingList = () => {
    const list = useSelector(state => state.shoppingList);
    console.log(list)
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [Ok, setOk] = useState(false);
    const [itemToDelte, setItem] = useState();
    const deleteItem = () => {
        axios.post(`http://localhost:8080/api/bay/${user.Id}/${itemToDelte.Id}`, {Id: itemToDelte.Id, UserId: user.Id})
            .then(res => {
                dispatch({ type: actionName.SET_PRODUCTS, userId: user.Id })
                setItem(null)
                setOk(false)
            })
            .catch(err => alert(err.responst?.data))
    }
    return < >
        <div className="container buy-table">
            <Table celled columns={3} textAlign="center" style={{ width: '50vw' }}>
                < TableHeader>
                    <TableHeaderCell>כמות</TableHeaderCell>
                    <TableHeaderCell>שם</TableHeaderCell>
                    <TableHeaderCell>---</TableHeaderCell>
                </TableHeader>
                <TableBody>
                    {list.map((p) =>
                        <TableRow key={p.Id}>
                            <TableCell>{p.Count}</TableCell>
                            <TableCell>{p.Name}</TableCell>
                            <TableCell>
                                <Button icon onClick={() => {
                                    setOk(false)
                                    setOpen(true);
                                    setItem(p);
                                }}>
                                    <Icon name="trash alternate" />
                                </Button>
                            </TableCell>
                        </TableRow>)}
                </TableBody>
            </Table>
        </div>
        <Confirm
            content='למחוק את המוצר מהרשימה?'
            open={open}
            cancelButton=''
            confirmButton=''
            onCancel={() => { setOpen(false); setItem(null) }}
            onConfirm={() => { setOk(true); setOpen(false); deleteItem() }}
        />
    </>
}
export default ShoppingList;