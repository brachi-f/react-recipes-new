import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, MenuItem, MenuMenu } from "semantic-ui-react";
import * as actionsName from './store/action';
import { useNavigate } from "react-router-dom";


const Header = () => {
    const navigate = useNavigate();
    const [activeItem, setActive] = useState("");
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    return <>
        {user ? <Menu secondary>
            <MenuMenu position="left">
                <MenuItem
                    name="רשימת המתכונים"
                    active={activeItem === "רשימת המתכונים"}
                    onClick={({ name }) => {
                        setActive(name);
                        navigate("/");
                    }}>
                </MenuItem>
                <MenuItem
                    name="הוספת מתכון"
                    active={activeItem === "הוספת מתכון"}
                    onClick={({ name }) => {
                        setActive(name);
                        navigate("/");
                    }}>
                </MenuItem>
                <MenuItem
                    name="הוספת קטגוריה"
                    active={activeItem === "הוספת קטגוריה"}
                    onClick={({ name }) => {
                        setActive(name);
                        navigate('/category');
                    }}>
                </MenuItem>
                <MenuItem
                    name="רשימת הקניות"
                    active={activeItem === "רשימת הקניות"}
                    onClick={({ name }) => {
                        setActive(name);
                        navigate('/');
                    }}>
                </MenuItem>
            </MenuMenu>
            <MenuItem
                name='התנתקות'
                active={activeItem === 'התנתקות'}
                onClick={({ name }) => {
                    setActive(name);
                    dispatch({ type: actionsName.SET_USER.toString(), user: null })
                }}
            />
        </Menu> :
            <Menu >
                <MenuMenu position='right'>
                    <MenuItem
                        name="התחברות"
                        active={activeItem === "התחברות"}
                        onClick={({ name }) => {
                            setActive(name);
                            navigate("/login");
                        }}>
                    </MenuItem>
                    <MenuItem
                        name="הרשמה"
                        active={activeItem === "הרשמה"}
                        onClick={({ name }) => {
                            setActive(name);
                            navigate("/signin");
                        }}>
                    </MenuItem>
                </MenuMenu>
            </Menu>
        }
    </>
}
export default Header;