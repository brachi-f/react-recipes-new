import { Form, Segment, Button, Message } from "semantic-ui-react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { InputRef } from "./Login";
import axios from "axios";
import * as actions from '../store/action';


const Signin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const schema = yup.object({
        UserName: yup.string().min(3, 'שם משתמש עם מינימום 3 תווים').required(),
        Password: yup.string()
            .min(6, 'הסיסמה צריכה להיות לפחות 6 תווים')
            .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, 'הסיסמה צריכה לכלול גם אותיות וגם מספרים')
            .required(),
        Name: yup.string().required(),
        Email: yup.string().email().required(),
        Phone: yup.string().matches(/^\d{9,10}$/, 'מספר הטלפון צריך להכיל בין 9 ל־10 ספרות').required(),
        Tz: yup.string().matches(/^([0-9]{9})$/, 'מספר תעודת הזהות צריך להכיל 9 ספרות').required()
    });

    const {
        register, handleSubmit, formState: { errors }, } = useForm({
            resolver: yupResolver(schema),
        })
    const onSubmit = (data) => {
        axios.post(`http://localhost:8080/api/user/sighin`, { Username:data.UserName, Password:data.Password, Name: data.Name, Phone: data.Phone, Email: data.Email, Tz: data.Tz })
            .then((res) => {
                dispatch({ type: actions.SET_USER, user: res?.data });
                navigate('/home');
            })
            .catch((res) => {
                alert(res.request.response);
            });
    }
    return <>
        <div className="container">
            <Segment placeholder style={{width: '70%', margin: 'auto'}} >
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Field>
                        <label>שם משתמש</label>
                        <InputRef {...register("UserName")} />
                    </Form.Field>
                    <Form.Field>
                        <label>סיסמא</label>
                        <InputRef {...register("Password")} type='password' />
                    </Form.Field>
                    <Form.Field>
                        <label>שם</label>
                        <InputRef {...register("Name")} />
                    </Form.Field>
                    <Form.Field>
                        <label>מייל</label>
                        <InputRef {...register("Email")} type='email' />
                    </Form.Field>
                    <Form.Field>
                        <label>מס' פלאפון</label>
                        <InputRef {...register("Phone")} />
                    </Form.Field>
                    <Form.Field>
                        <label>מס' תעודת זהות</label>
                        <InputRef {...register("Tz")} />
                    </Form.Field>
                    <Button type="submit" content='signin' primary />
                </Form>
            </Segment >
            {errors?.UserName ? (
                <Message warning header="שם משתמש לא תקין" content={errors?.UserName?.message} />
            ) : (
                <></>
            )}
            {errors?.Password ? (
                <Message warning header="סיסמא לא תקינה" content={errors?.Password?.message} />
            ) : (
                <></>
            )}
            {errors?.Name ? (
                <Message warning header="שם לא תקין" content={errors?.Name?.message} />
            ) : (
                <></>
            )}
            {errors?.Email ? (
                <Message warning header="כתובת מייל לא תקינה" content={errors?.Email?.message} />
            ) : (
                <></>
            )}
            {errors?.Phone ? (
                <Message warning header="מס' פלאפון לא תקין" content={errors?.Phone?.message} />
            ) : (
                <></>
            )}
            {errors?.Tz ? (
                <Message warning header="מס תעודת זהות לא תקין" content={errors?.Tz?.message} />
            ) : (
                <></>
            )}
        </div>
    </>
}
export default Signin;