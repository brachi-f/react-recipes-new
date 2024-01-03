import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonContent, Card, CardContent, Header, Icon, Image, Segment, SegmentGroup, SegmentInline } from "semantic-ui-react";
import * as actionName from '../store/action'
import { CardFooter } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Ingredient = ({ Name, Count, Type }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    return <>
        <Segment>
            <SegmentInline>
                <Button animated='vertical' icon onClick={() => {
                    let name = "" + Type + " " +Name;
                    axios.post(`http://localhost:8080/api/bay`, { Name: name, Count: Count, UserId: user.Id })
                        .then(res => dispatch({ type: actionName.ADD_PRODUCT, data: res?.data }))
                        .catch(err => console.log(err.response))

                    //message
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
            <Header textAlign='center' as='h1' >{recipe.Name}</Header>
            <Card className="card-recipe">
                <Image src={recipe.Img} wrapped />

                <CardContent extra>
                    <span style={{ margin: 15 }}>
                        <Icon name='list' />
                        {" " + categoryList?.find(c => c.Id === recipe.CategoryId)?.Name + " "}
                    </span>
                    <span style={{ margin: 15 }}>
                        <Icon name='signal' />
                        {" " + difficultyList?.find(d => d.Id === recipe.Difficulty)?.Name + " "}
                    </span>
                    <span style={{ margin: 15 }}>
                        <Icon name='clock' />
                        {" " + recipe.Duration + " דקות "}
                    </span>
                </CardContent>
                <CardContent>
                    <p>{recipe.Description}</p>
                </CardContent>
                <CardContent>
                    <Header>רכיבים</Header>
                    <SegmentGroup >
                        {recipe.Ingrident?.map((i, index) => <Ingredient key={index} Name={i.Name} Count={i.Count} Type={i.Type} />)}
                    </SegmentGroup>
                    <Header>הוראות הכנה</Header>
                    <SegmentGroup>
                        {console.log(recipe.Instructions)}
                        {recipe.Instructions?.map((i, index) =>
                            <Segment key={index}>
                                <Icon name="circle" size="tiny" style={{ margin: 15 }} />
                                {i.Instruc?i.Instruc:i}
                            </Segment>)}
                    </SegmentGroup>
                </CardContent>
                {user.Id === recipe.UserId ?
                    <CardFooter>
                        <Button icon size='large' floated="left" onClick={() => {
                            dispatch({ type: actionName.DELETE_ERECIPE, recipeId: recipe.Id })
                            navigate('/recipe')
                        }}>
                            <Icon name='trash alternate' />
                        </Button>
                        <Button icon size='large' floated="left" onClick={() => navigate('/edit')}>
                            <Icon name='edit' />
                        </Button>
                    </CardFooter>
                    : <></>}
            </Card>
        </div>
    </>
}
export default AllRecipe;