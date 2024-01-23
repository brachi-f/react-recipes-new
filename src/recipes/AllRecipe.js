import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonContent, Card, CardContent, Header, Icon, Image, Segment, SegmentGroup, SegmentInline } from "semantic-ui-react";
import * as actionName from '../store/action'
import { CardFooter } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as products from '../services/shoppingList'
import { deleteRecipe } from "../services/recipes";
import Swal from "sweetalert2";
const Ingredient = ({ingredient}) => {
    const { Name, Count, Type } = ingredient;
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const shoppingList = useSelector(state => state.shoppingList);
    return <>
        <Segment  >
            <SegmentInline>
                <Button animated='vertical' icon onClick={() => {
                    let i = shoppingList.findIndex(p => p.Name === Name);
                    i >= 0 ?
                    dispatch(products.updateProductDispatch({ Name: Name, Count: 1, UserId: user.Id },i))
                    : dispatch(products.addProuductDispatch({ Name: Name, Count: 1, UserId: user.Id }));
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
        {user === null ? navigate('/home') : null}
        <div className="container">
            <Header textAlign='center' as='h1'  >{recipe.Name}</Header>
            <Card   className="card-recipe">
                <Image src={recipe.Img} wrapped />

                <CardContent extra>
                    <span style={{ margin: 15 }}>
                        <Icon   name='list' />
                        {" " + categoryList?.find(c => c.Id === recipe.CategoryId)?.Name + " "}
                    </span> 
                    <span style={{ margin: 15 }}>
                        <Icon   name='signal' />
                        {" " + difficultyList?.find(d => d.Id === recipe.Difficulty)?.Name + " "}
                    </span>
                    <span style={{ margin: 15 }}>
                        <Icon   name='clock' />
                        {" " + recipe.Duration + " דקות "}
                    </span>
                </CardContent>
                <CardContent>
                    <p>{recipe.Description}</p>
                </CardContent>
                <CardContent>
                    <Header  >רכיבים</Header>
                    <SegmentGroup >
                        {recipe.Ingrident?.map((i, index) => <Ingredient key={index} ingredient={i} />)}
                    </SegmentGroup>
                    <Header  >הוראות הכנה</Header>
                    <SegmentGroup>
                        {recipe.Instructions?.map((i, index) =>
                            <Segment   key={index}>
                                <Icon name="circle" size="tiny" style={{ margin: 15 }} />
                                {i.Instruc ? i.Instruc : i}
                            </Segment>)}
                    </SegmentGroup>
                </CardContent>
                {user.Id === recipe.UserId ?
                    <CardFooter>
                        {/* IMPORTANT!!!!!!!!!!!! */}
                        <Button   icon size='large' floated="left" onClick={() => {
                            deleteRecipe(recipe.Id).then(res=>{
                                dispatch({ type: actionName.DELETE_RECIPE, recipeId: recipe.Id })
                                Swal.fire({icon: 'success', title: 'המתכון נמחק בהצלחה'})
                                navigate('/recipe')
                            }).catch(err=>{
                                Swal.fire({icon: 'error', title: err.response?.data})
                            })
                        }}>
                            <Icon name='trash alternate' />
                        </Button>
                        <Button   icon size='large' floated="left" onClick={() => navigate('/edit')}>
                            <Icon name='edit' />
                        </Button>
                    </CardFooter>
                    : <></>}
            </Card>
        </div> 
    </>
}
export default AllRecipe;