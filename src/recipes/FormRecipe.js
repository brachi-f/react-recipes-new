import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, Icon, Item, Message, Segment } from "semantic-ui-react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, useFieldArray } from "react-hook-form"
import { useEffect, useState } from "react"
import { InputRef } from "../user/Login";
import * as actionName from '../store/action'
import { useNavigate } from "react-router-dom";
import Categories from '../categories/Categories'
import * as recipes from '../services/recipes'
import Swal from "sweetalert2";

const FormRecipe = () => {
    const dispatch = useDispatch();
    const recipe = useSelector(state => state.selectedRecipe);
    const categoryList = useSelector(state => state.categories);
    const difficultyList = useSelector(state => state.difficulties)
    const [err, setErr] = useState(false);
    const schema = yup.object({
        CategoryId: yup.number().integer().required().min(1, "חובה לבחור קטגוריה"),
        Name: yup.string().required("חובה להכניס שם"),
        Img: yup.string().url().required("חובה להכניס כתובת URL של תמונה"),
        Duration: yup.number("משך זמן צריך להיותר מספר").positive("משך זמן לא יכול להיות מספר שלילי").required("חובה להכניס משך זמן"),
        Difficulty: yup.number().integer().positive().required().min(1, "חובה לבחור רמת קושי"),
        Description: yup.string().required("חובה להכניס תיאור"),
        Instructions: yup.array().of(yup.string().required()),
        Ingrident: yup.array().of(
            yup.object().shape({
                Name: yup.string().required("הכנס שם"),
                Count: yup.number("כמות מסוג מספר").positive("כמות לא יכולה להיות שלילית").required("הכנס כמות"),
                Type: yup.string().required("הכנס סוג")
            })
        )
    })
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const { fields: InstructionsFields, append: InstructionsAppend, remove: InstructionsRemove } = useFieldArray({
        control,
        name: "Instructions",
    });
    const { fields: IngridentFields, append: IngridentAppend, remove: IngridentRemove } = useFieldArray({
        control,
        name: "Ingrident",
    });
    useEffect(() => {
        recipe?.Ingrident?.map((ing) => { IngridentAppend(ing) })
        recipe?.Instructions?.map((ins) => {
            InstructionsAppend(ins)
        })
    }, [recipe]);
    const user = useSelector(state => state.user)
    const navigate = useNavigate();
    const onSubmit = (data) => {
        setErr(false);
        let recipeToSend = {
            Name: data.Name, UserId: user.Id, CategoryId: data.CategoryId, Img: data.Img, Duration: data.Duration, Difficulty: data.Difficulty, Description: data.Description,
            Ingrident: data.Ingrident, Instructions: data.Instructions
        }
        if (!recipe) {
            recipes.addRecipe(recipeToSend).then(res => {
                dispatch({ type: actionName.ADD_RECIPE, data: res.data });
                Swal.fire({ icon: 'success', title: 'המתכון נוסף בהצלחה', timer: 1500, showConfirmButton: false })
                navigate('/recipe');
            }).catch(err => Swal.fire({ icon: 'error', title: err.response?.data }))
        }
        else {
            recipes.updateRecipe({ ...recipeToSend, Id: recipe.Id }).then(res => {
                dispatch({ type: actionName.UPDATE_RECIPE, data: res.data });
                Swal.fire({ icon: 'success', title: 'המתכון עודכן בהצלחה', timer: 1500, showConfirmButton: false })
                navigate('/recipe');
            }).catch(err => Swal.fire({ icon: 'error', position: 'top-left', title: err.response?.data }))
            dispatch({ type: actionName.SET_SELECTED_RECIPE, data: null })
        }
    }
    return <>
        {user === null ? navigate('/home') : null}
        <div className="container">
            <Segment placeholder >
                <Form onSubmit={handleSubmit(onSubmit)} widths="equal">
                    <Form.Field >
                        <label>שם מתכון</label>
                        <InputRef {...register("Name")} defaultValue={recipe?.Name} />
                    </Form.Field>
                    <Item>
                        <Message warning content={errors.Name?.message} />
                    </Item>
                    <Form.Field>
                        <label>קטגוריה</label>
                        <select {...register("CategoryId")} name="CategoryId" defaultValue={recipe ? recipe.CategoryId : 0}>
                            <option value={0} disabled>קטגוריה</option>
                            {categoryList?.map((category) =>
                                <option key={category.Id} value={category.Id}>{category.Name}</option>
                            )}
                        </select>
                        {errors.CategoryId ? <Message warning content={errors.CategoryId.message} /> : <></>}
                    </Form.Field>
                    <Categories />
                    <Form.Field>
                        <label>רמת קושי</label>
                        <select {...register("Difficulty")} name="Difficulty" defaultValue={recipe ? recipe.Difficulty : 0}>
                            <option value="0" disabled>רמת קושי</option>
                            {difficultyList.map((difficulty) => <>
                                <option key={difficulty.Id} value={difficulty.Id}>{difficulty.Name}</option></>)}
                        </select>
                        {errors.Difficulty ? <Message warning content={errors.Difficulty.message} /> : <></>}
                    </Form.Field>
                    <Form.Field>
                        <label>קישור לתמונה</label>
                        <InputRef {...register("Img")} defaultValue={recipe?.Img} />
                    </Form.Field>
                    {errors.Img ? <Message warning content={errors.Img.message} /> : <></>}
                    <Form.Field>
                        <label>תיאור</label>
                        <InputRef {...register("Description")} defaultValue={recipe?.Description} />
                    </Form.Field>
                    {errors.Description ? <Message warning content={errors.Description.message} /> : <></>}
                    <Form.Field>
                        <label>זמן הכנה בדקות</label>
                        <InputRef {...register("Duration")} defaultValue={recipe?.Duration} />
                    </Form.Field>
                    {errors.Duration ? <Message warning content={errors.Duration.message} /> : <></>}

                    <h4>רכיבים</h4>
                    {IngridentFields?.map((ingrident, index) =>
                        <FormGroup key={index}>
                            <Form.Field>
                                <label>מוצר</label>
                                <InputRef {...register(`Ingrident.${index}.Name`)} defaultValue={ingrident?.Name} placeholder="שם מוצר" />
                                <p>{errors[`Ingrident.${index}.Name`]?.message}</p>
                            </Form.Field>
                            <Form.Field>
                                <label>כמות</label>
                                <InputRef {...register(`Ingrident.${index}.Count`)} defaultValue={ingrident?.Count} placeholder="כמות" />
                                <p>{errors[`Ingrident.${index}.Count`]?.message}</p>
                            </Form.Field>
                            <Form.Field>
                                <label>סוג</label>
                                <InputRef {...register(`Ingrident.${index}.Type`)} defaultValue={ingrident?.Type} placeholder="סוג" />
                                <p>{errors[`Ingrident.${index}.Type`]?.message}</p>
                            </Form.Field>
                            <Button icon size='large' floated="left" onClick={() => IngridentRemove(index)}>
                                <Icon name='trash alternate' />
                            </Button>
                        </FormGroup>
                    )}
                    <Button onClick={() => { IngridentAppend({ Name: null, Count: null, Type: null }) }}>
                        <Icon name="plus" style={{ margin: 10 }} /> הוסף מוצר</Button>
                    <h4>הוראות הכנה</h4>
                    {InstructionsFields?.map((instruction, index) =>
                        <FormGroup key={index}>
                            <Form.Field>
                                <label>הוראה</label>
                                <InputRef {...register(`Instructions.${index}`)} defaultValue={instruction} placeholder="הוראת הכנה" />
                                <p>{errors.Instructions?.message}</p>
                            </Form.Field>

                            <Button icon size='large' floated="left" onClick={() => InstructionsRemove(index)}>
                                <Icon name='trash alternate' />
                            </Button>
                        </FormGroup>
                    )}
                    <Button onClick={() => InstructionsAppend(null)}>
                        <Icon name="plus" style={{ margin: 10 }} /> הוסף הוראה</Button>
                    <br />
                    <Button size="medium" type='submit' floated="left" onClick={() => setErr(true)}>
                        <Icon name='save' style={{ margin: 10 }} />שמירה
                    </Button>
                </Form>
            </Segment>
        </div>
    </>


}
export default FormRecipe;
