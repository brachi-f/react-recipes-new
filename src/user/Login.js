import React, { useRef } from 'react';
import { GridColumn, FormInput, Button, Divider, Form, Grid, Segment, Input, Message, } from 'semantic-ui-react';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from 'axios';
import { useDispatch } from 'react-redux';
import * as actions from '../store/action'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const schema = yup.object({
        UserName: yup.string().required(),
        Password: yup.string().required()
    });

    const {
        register, handleSubmit, formState: { errors }, } = useForm({
            resolver: yupResolver(schema),
        })
    const onSubmit = data => {
        console.log(data);
        axios.post(`http://localhost:8080/api/user/login`,{UserName: data.UserName,Password: data.Password})
        .then(res=> {
            dispatch({type: actions.SET_USER , user: res.data})
            console.log(res.data);
            navigate('/home');
    })
        .catch(res=>{
            alert(res.response.data)
        })
    }
    return <>
        <Segment placeholder>
            <Grid columns={2} relaxed='very' stackable>
                <Grid.Column>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Input
                            {...register("UserName")}
                            icon='user'
                            iconPosition='left'
                            label='UserName'
                            placeholder='UserName'
                        // register={register("UserName")}
                        // errors={errors}
                        // onChange={e=>console.log(e.target.value)}
                        />
                        <Form.Input
                            {...register("Password")}
                            // onChange={e=>console.log(e.target.value)}
                            // register={register("Password")}
                            // errors={errors}
                            icon='lock'
                            iconPosition='left'
                            label='Password'
                            type='Password'
                        />

                        {/* <Button type='submit' content='Login' primary /> */}
                        <Button type='submit'>Login</Button>
                    </Form>
                </Grid.Column>

                <Grid.Column verticalAlign='middle'>
                    <Button content='Sign up' icon='signup' size='big' 
                    onClick={()=>navigate('/signin')}/>
                </Grid.Column>
            </Grid>

            <Divider vertical>Or</Divider>
        </Segment>

        {errors?.UserName ? <Message
            warning
            header='שם משתמש לא תקין'
            content={errors?.UserName?.message}
        /> : <></>}
        {errors?.Password ? <Message
            warning
            header='סיסמא לא תקינה'
            content={errors?.Password?.message}
        /> : <></>}
    </>
}

export default Login;