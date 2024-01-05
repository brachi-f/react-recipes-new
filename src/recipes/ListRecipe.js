import ItemRecipe from './ItemRecipe'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardGroup, Image, Input, Segment, Select } from "semantic-ui-react";
import * as actionName from '../store/action'
import axios from 'axios';

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
    const recipes = useSelector(state => state.recipes)
    const [categoty, setCategoty] = useState(null);
    const [duration, setDuration] = useState(null);
    const [userId, setUserId] = useState(null);
    const [difficulty, setDifficulty] = useState(null);
    const categoryList = useSelector(state => state.categories);
    const difficultyList = useSelector(state => state.difficulties)
    return <>
        <div className='header-img'>
            <Image
                src="https://img.freepik.com/premium-photo/set-chocolate-candies-background-sweet-dessert-praline_84485-606.jpg?size=626&ext=jpg&uid=R47685137&ga=GA1.1.745492481.1699734055&semt=ais" />
        </div>
        {/* <div className="row"> */}
        <Segment color='yellow' inverted className='filters col'>
            {/* <div className="filters col"> */}
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
            <Input
                icon='user'
                placeholder='קוד בעלים'
                type="number"
                onChange={(e, { value }) => setUserId(value)}
            />
            {/* </div> */}
        </Segment>
        <div className="container">

            <CardGroup>
                {recipes.map((r) =>
                    (!categoty || parseInt(categoty) === r.CategoryId) &&
                        (!userId || parseInt(userId) === r.UserId) &&
                        (!duration || parseInt(duration) >= parseInt(r.Duration)) &&
                        (!difficulty || r.Difficulty === difficulty) ?
                        <ItemRecipe key={r.Id} recipe={r} /> : <></>)}
            </CardGroup>

        </div>
        {/* </div > */}

    </>
}
export default ListRecipes;