import axios from "axios";
import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Button, Confirm, Icon, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react";
import * as actionName from '../store/action'

const ShoppingList = () => {
    const list = useSelector(state => state.shoppingList);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [Ok, setOk] = useState(false);
    const [itemToDelete, setItem] = useState();
    const deleteItem = () => {
        axios.post(`http://localhost:8080/api/bay/delete/${itemToDelete.Id}`)
            .then(res => {
                dispatch({ type: actionName.DELETE_PRODUCT, id: itemToDelete.Id })
                setItem(null)
                setOk(false)
            })
            .catch(err => alert("delete product error: ",err.response?.data))
    }
    return < >
        <div className="container buy-table">
            <Table celled columns={3} textAlign="center" style={{ width: '50vw' }}>
                < TableHeader>
                    <TableHeaderCell>מוצר</TableHeaderCell>
                    <TableHeaderCell>כמות</TableHeaderCell>
                    <TableHeaderCell>   </TableHeaderCell>
                </TableHeader>
                <TableBody>
                    {list.map((p) =>
                        <TableRow key={p.Id}>
                            <TableCell>{p.Name}</TableCell> 
                            <TableCell>{p.Count}</TableCell>
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
            cancelButton='לא'
            confirmButton='כן'
            onCancel={() => { setOpen(false); setItem(null) }}
            onConfirm={() => { setOk(true); setOpen(false); deleteItem() }}
        />
    </>
}
export default ShoppingList;