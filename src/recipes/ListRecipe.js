import ItemRecipe from './ItemRecipe'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CardGroup, Checkbox, FormField, Icon, Image, Input, Label, Segment, Select } from "semantic-ui-react";
import * as actionName from '../store/action'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListRecipes = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: actionName.SET_SELECTED_RECIPE, data: null });
        axios.get(`http://localhost:8080/api/recipe`)
            .then(res => {
                dispatch({ type: actionName.SET_RECIPES, data: res.data })
            })
            .catch(err => {
                alert(err.response?.data);
            });
    }, [])
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const recipes = useSelector(state => state.recipes);
    const [categoty, setCategoty] = useState(null);
    const [duration, setDuration] = useState(null);
    const [currentUser, setUser] = useState(false);
    const [difficulty, setDifficulty] = useState(null);
    const categoryList = useSelector(state => state.categories);
    const difficultyList = useSelector(state => state.difficulties);

    return <>
        {user === null ? navigate('/home') : null}
        <div className='header-img'>
            <Image
                src="https://img.freepik.com/premium-photo/set-chocolate-candies-background-sweet-dessert-praline_84485-606.jpg?size=626&ext=jpg&uid=R47685137&ga=GA1.1.745492481.1699734055&semt=ais" />
        </div>
        <Segment inverted className='filters col'>
            <Select placeholder='קטגוריה' icon='list' iconposition='left' onChange={(e, { value }) => {
                setCategoty(value);
            }} options={
                categoryList.map((c) => { return { key: c.Id, text: c.Name, value: c.Id } })
            } />
            <Input
                icon={{ name: 'clock' }}
                placeholder='משך זמן מקסימלי'
                type="number"
                onChange={(e, { value }) => setDuration(value)}
                
            />
            <Select placeholder='רמת קושי' icon='signal' iconposition='left' onChange={(e, { value }) => setDifficulty(value)} options={
                difficultyList.map((c) => { return { key: c.Id, value: c.Id, text: c.Name } })
            } />
            <Segment size='tiny' className='box'>
                <Icon name='user' />
                <Checkbox onChange={() => setUser(!currentUser)}  label='הצג רק את המתכונים שלי' />
            </Segment>
            <Button icon labelPosition='left' onClick={() => {
                setCategoty(null);
                setDifficulty(null);
                setDuration(null);
                setUser(false);
            }}>
                <Icon name='undo' />
                איפוס
            </Button>
        </Segment>
        <div className="container">
            <CardGroup>
                {recipes.map((r) =>
                    (!categoty || parseInt(categoty) === r.CategoryId) &&
                        (!currentUser || (currentUser && user.Id === r.UserId)) &&
                        (!duration || parseInt(duration) >= parseInt(r.Duration)) &&
                        (!difficulty || r.Difficulty === difficulty) ?
                        <ItemRecipe key={r.Id} recipe={r} /> : <></>)}
            </CardGroup>
        </div>
    </>
}
export default ListRecipes;


