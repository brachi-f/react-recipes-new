import { useState } from "react";
import { useSelector } from "react-redux";
import { CardGroup, Input, Select } from "semantic-ui-react";
import ItemRecipe from './ItemRecipe'

const Recipes = () => {

    const recipes = useSelector(state => state.recipes);
    const [categoty, setCategoty] = useState(null);
    const [duration, setDuration] = useState(null);
    const [userId, setUserId] = useState(null);
    const [difficulty, setDifficulty] = useState(null);
    const categoryList = useSelector(state => state.categories);
    const difficultyList = useSelector(state => state.difficulties)
    return <>
        <div className="container">
            <div className="row">
                <div className="filters col">
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
                </div>
                <CardGroup>
                    {recipes.map((r) =>
                        (!categoty || parseInt(categoty) === r.CategoryId) &&
                            (!userId || parseInt(userId) === r.UserId) &&
                            (!duration || parseInt(duration) >= parseInt(r.Duration)) &&
                            (!difficulty || r.Difficulty === difficulty) ?
                            <ItemRecipe key={r.Id} recipe={r} /> : <></>)}
                </CardGroup>

            </div>
        </div>

    </>
}
export default Recipes;