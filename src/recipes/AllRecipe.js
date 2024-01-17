import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonContent, Card, CardContent, Header, Icon, Image, Segment, SegmentGroup, SegmentInline } from "semantic-ui-react";
import * as actionName from '../store/action'
import { CardFooter } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Ingredient = ({ Name, Count, Type }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    let shoppingList = useSelector(state => state.shoppingList);
    return <>
        <Segment /*color="yellow"*/>
            <SegmentInline>
                <Button animated='vertical' icon onClick={() => {
                    //let name = "" + Type + " " + Name;
                    let i = shoppingList.findIndex(p => p.Name === Name);
                    console.log("index of product = ", i);
                    axios.post(`http://localhost:8080/api/bay`, { Name: Name, Count: 1, UserId: user.Id })
                        .then(res => {
                            i < 0 ?
                                dispatch({ type: actionName.ADD_PRODUCT, data: res.data }) :
                                dispatch({ type: actionName.UPDATE_PRODUCT, data: res.data, index: i })
                        })
                        .catch(err => console.log("add product error: ", err.response));
                    /*if (i >= 0)
                        axios.post(`http://localhost:8080/api/bay/edit`, {
                            Id: shoppingList[i].Id,
                            Name: shoppingList[i].Name,
                            Count: shoppingList[i].Count + 1,
                            UserId: user.Id
                        }).then(res => dispatch({ type: actionName.UPDATE_PRODUCT, data: res.data, index: i }));
                    else
                        axios.post(`http://localhost:8080/api/bay`, { Name: Name, Count: 1, UserId: user.Id })
                            .then(res => dispatch({ type: actionName.ADD_PRODUCT, data: res.data }))
                            .catch(err => console.log("add product error: ",err.response));*/
                }}>
                    <ButtonContent visible>
                        <Icon name="plus" />
                    </ButtonContent>
                    <ButtonContent hidden>
                        <Icon name='shopping cart' />
                    </ButtonContent>
                </Button>
                <span style={{ margin: 15 }}> {"    " + Count + " " + Type + " " + Name + "    "}</span>
            </SegmentInline>
        </Segment >
    </>
}
const AllRecipe = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const recipe = useSelector(state => state.selectedRecipe);
    const categoryList = useSelector(state => state.categories);
    const difficultyList = useSelector(state => state.difficulties);
    return <>
        <div className="container">
            <Header textAlign='center' as='h1' /*color="yellow"*/>{recipe.Name}</Header>
            <Card /*color="yellow"*/ className="card-recipe">
                <Image src={recipe.Img} wrapped />

                <CardContent extra>
                    <span style={{ margin: 15 }}>
                        <Icon /*color="yellow"*/ name='list' />
                        {" " + categoryList?.find(c => c.Id === recipe.CategoryId)?.Name + " "}
                    </span>
                    <span style={{ margin: 15 }}>
                        <Icon /*color="yellow"*/ name='signal' />
                        {" " + difficultyList?.find(d => d.Id === recipe.Difficulty)?.Name + " "}
                    </span>
                    <span style={{ margin: 15 }}>
                        <Icon /*color="yellow"*/ name='clock' />
                        {" " + recipe.Duration + " דקות "}
                    </span>
                </CardContent>
                <CardContent>
                    <p>{recipe.Description}</p>
                </CardContent>
                <CardContent>
                    <Header /*color="yellow"*/>רכיבים</Header>
                    <SegmentGroup >
                        {recipe.Ingrident?.map((i, index) => <Ingredient key={index} Name={i.Name} Count={i.Count} Type={i.Type} />)}
                    </SegmentGroup>
                    <Header /*color="yellow"*/>הוראות הכנה</Header>
                    <SegmentGroup>
                        {recipe.Instructions?.map((i, index) =>
                            <Segment /*color="yellow"*/ key={index}>
                                <Icon name="circle" size="tiny" style={{ margin: 15 }} />
                                {i.Instruc ? i.Instruc : i}
                            </Segment>)}
                    </SegmentGroup>
                </CardContent>
                {user.Id === recipe.UserId ?
                    <CardFooter>
                        <Button /*color="yellow"*/ icon size='large' floated="left" onClick={() => {
                            dispatch({ type: actionName.DELETE_RECIPE, recipeId: recipe.Id })
                            navigate('/recipe')
                        }}>
                            <Icon name='trash alternate' />
                        </Button>
                        <Button /*color="yellow"*/ icon size='large' floated="left" onClick={() => navigate('/edit')}>
                            <Icon name='edit' />
                        </Button>
                    </CardFooter>
                    : <></>}
            </Card>
        </div>
    </>
}
export default AllRecipe;