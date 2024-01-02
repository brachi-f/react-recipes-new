import { useSelector } from "react-redux";
import { Button, ButtonContent, Card, CardContent, CardDescription, CardHeader, Icon, Image } from "semantic-ui-react";


const ItemRecipe = ({ recipe }) => {
    const user = useSelector(state => state.user);
    const categoryList = useSelector(state => state.categories);
    const difficultyList = useSelector(state => state.difficulties);
    return <>
        <Card>

            <Image wrapped src={recipe.Img} size="medium" className="recipe-img"/>
            <CardContent>
                <CardHeader>{recipe.Name}{user?.Id == recipe.UserId ? <Icon name="user" floated="left" /> : <></>}</CardHeader>
                <CardDescription>{recipe.Description}</CardDescription>
            </CardContent>
            <CardContent extra>
                <span>
                    <Icon name='list' />
                    {" " + categoryList?.find(c => c.Id === recipe.CategoryId)?.Name + " "}
                </span>
                <span>
                    <Icon name='signal' />
                    {" " + difficultyList?.find(d => d.Id === recipe.Difficulty)?.Name + " "}
                </span>
                <span>
                    <Icon name='clock' />
                    {" " + recipe.Duration + " דקות "}
                </span>
                <Button animated>
                    <ButtonContent visible>הצג</ButtonContent>
                    <ButtonContent hidden>
                        <Icon name='arrow left' />
                    </ButtonContent>
                </Button>
            </CardContent>
        </Card>
    </>
}
export default ItemRecipe;