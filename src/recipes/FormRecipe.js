import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, Icon, Message, Segment } from "semantic-ui-react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, useFieldArray } from "react-hook-form"
import { useEffect, useState } from "react"
import { InputRef } from "../user/Login";
import axios from "axios";
import * as actionName from '../store/action'
import { useNavigate } from "react-router-dom";
import Categories from '../categories/Categories'

const FormRecipe = () => {
    const dispatch = useDispatch();
    // let recipe = useSelector(state => state.selectedRecipe);
    const [recipe, setRecipe] = useState(useSelector(state => state.selectedRecipe));
    // if (!recipe) setRecipe(null);
    const categoryList = useSelector(state => state.categories);
    const difficultyList = useSelector(state => state.difficulties)

    const schema = yup.object({
        CategoryId: yup.number().integer().required().min(1, "חובה לבחור קטגוריה"),
        Name: yup.string().required("חובה להכניס שם"),
        Img: yup.string().url().required("חובה להכניס כתובת URL של תמונה"),
        Duration: yup.number("משך זמן צריך להיותר מספר").positive("משך זמן לא יכול להיות מספר שלילי").required("חובה להכניס משך זמן"),
        Difficulty: yup.number().integer().positive().required().min(1, "חובה לבחור רמת קושי"),
        Description: yup.string().required("חובה להכניס תיאור"),
        Instructions: yup.array().of(yup.string().required()),
        // Instructions: yup.array().of(
        //     yup.object().shape({
        //         Instruc: yup.string().required("חובה להכניס הוראה")
        //     })
        // ),
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
        recipe?.Ingrident?.map((ing) => IngridentAppend(ing))
        recipe?.Instructions?.map((ins) => {
            InstructionsAppend(ins)
        })
    }, [recipe]);


    const user = useSelector(state => state.user)
    const navigate = useNavigate();
    const onSubmit = (data) => {
        //alert(JSON.stringify(data))
        let recipeToSend = {
            Id: recipe?.Id,
            Name: data.Name, UserId: user.Id, CategoryId: data.CategoryId, Img: data.Img, Duration: data.Duration, Difficulty: data.Difficulty, Description: data.Description,
            Ingrident: data.Ingrident, Instructions: data.Instructions
        }
        let responseRecipe;
        if (recipe) {
            axios.post(`http://localhost:8080/api/recipe/edit`, recipeToSend)
                .then(res => responseRecipe = res)
                .catch(err => alert(err.response.data));
        }
        else {
            axios.post(`http://localhost:8080/api/recipe`, recipeToSend)
                .then(res => {
                    responseRecipe = res.data;
                    dispatch({ type: actionName.ADD_RECIPE, data: responseRecipe });
                })
                .catch(err => alert(err.response.data));
        }
        navigate('/recipe');
    }
    return <>
        <div className="container">
            <Segment placeholder color='yellow'>
                <Form onSubmit={handleSubmit(onSubmit)} widths="equal">
                    <Form.Field >
                        <label>שם מתכון</label>
                        <InputRef {...register("Name")} defaultValue={recipe?.Name} />
                    </Form.Field>
                    {errors.Name?.message ? <Message warning content={errors.Name.message} /> : <></>}
                    <Form.Field>
                        <label>קטגוריה</label>
                        {/* to change */}
                        {/* <Select
                        {...register("CategoryId")}
                        fluid
                        placeholder='קטגוריה'
                        value={recipe?.CategoryId}
                        options={
                            categoryList.map((c) => { return { key: c.Id, text: c.Name, value: c.Id } })
                        } /> */}
                        <select {...register("CategoryId")} name="CategoryId" defaultValue={recipe ? recipe.CategoryId : 0}>
                            <option value={0} disabled>קטגוריה</option>
                            {categoryList?.map((category) =>
                                <option key={category.Id} value={category.Id}>{category.Name}</option>
                            )}
                        </select>
                        {errors.CategoryId?.message ? <Message warning content={errors.CategoryId.message} /> : <></>}
                    </Form.Field>
                    <Categories />
                    <Form.Field>
                        <label>רמת קושי</label>
                        {/* <Select
                        ref={register("Difficulty")}
                        fluid
                        placeholder='רמת קושי'
                        value={recipe?.Difficulty}
                        options={
                            difficultyList.map((c) => { return { key: c.Id, value: c.Id, text: c.Name } })
                        } /> */}
                        <select {...register("Difficulty")} name="Difficulty" defaultValue={recipe ? recipe.Difficulty : 0}>
                            <option value="0" disabled>רמת קושי</option>
                            {difficultyList.map((difficulty) => <>
                                <option key={difficulty.Id} value={difficulty.Id}>{difficulty.Name}</option></>)}
                        </select>
                        {errors.Difficulty?.message ? <Message warning content={errors.Difficulty.message} /> : <></>}
                    </Form.Field>
                    <Form.Field>
                        <label>קישור לתמונה</label>
                        <InputRef {...register("Img")} defaultValue={recipe?.Img} />
                    </Form.Field>
                    {errors.Img?.message ? <Message warning content={errors.Img.message} /> : <></>}
                    <Form.Field>
                        <label>תיאור</label>
                        <InputRef {...register("Description")} defaultValue={recipe?.Description} />
                    </Form.Field>
                    {errors.Description?.message ? <Message warning content={errors.Description.message} /> : <></>}
                    <Form.Field>
                        <label>זמן הכנה בדקות</label>
                        <InputRef {...register("Duration")} defaultValue={recipe?.Duration} />
                    </Form.Field>
                    {errors.Duration?.message ? <Message warning content={errors.Duration.message} /> : <></>}

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
                                <Icon color='yellow' name='trash alternate' />
                            </Button>
                        </FormGroup>
                    )}
                    <Button color='yellow' onClick={() => IngridentAppend({ Name: null, Count: null, Type: null })}>
                        <Icon name="plus" style={{ margin: 10 }} /> הוסף מוצר</Button>
                    <h4>הוראות הכנה</h4>
                    {InstructionsFields?.map((instruction, index) =>
                        <FormGroup key={index}>
                            <Form.Field>
                                <label>הוראה</label>
                                {console.log("instruction ",instruction.toString())}
                                {console.log("instruction.Instruc : ",instruction.Instruc)}
                                {/* <InputRef {...register(`Instructions.${index}.Instruc`)} defaultValue={instruction?.Instruc} placeholder="הוראת הכנה" /> */}
                                <InputRef {...register(`Instructions.${index}`)} defaultValue={instruction} placeholder="הוראת הכנה" />
                                <p>{errors.Instructions?.message}</p>
                            </Form.Field>

                            <Button icon size='large' floated="left" onClick={() => InstructionsRemove(index)}>
                                <Icon color='yellow' name='trash alternate' />
                            </Button>
                        </FormGroup>
                    )}
                    <Button color='yellow' onClick={() => InstructionsAppend(null)}>
                        <Icon  name="plus" style={{ margin: 10 }} /> הוסף הוראה</Button>
                    <br />
                    <Button size="medium" type='submit' color="yellow" floated="left" >
                        <Icon name='save' style={{ margin: 10 }} />שמירה
                    </Button>
                </Form>
            </Segment>
        </div>
    </>

}
export default FormRecipe;
