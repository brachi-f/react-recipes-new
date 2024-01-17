

import React from 'react';
import { Grid, Segment, Form, Button, Divider, Message } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import * as actions from '../store/action';
import { useNavigate } from 'react-router-dom';

export const InputRef = React.forwardRef(({ ...rest }, ref) => (
    <input
        {...rest}
        ref={ref}
    />
));

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const schema = yup.object({
        UserName: yup.string().required(),
        Password: yup.string().required(),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        let body = { Username: data.UserName, Password: data.Password }
        axios.post(`http://localhost:8080/api/user/login`,body )
            .then((res) => {
                dispatch({ type: actions.SET_USER, user: res?.data });
                navigate('/home');
            })
            .catch(res => {
                alert(res.request.response);
            });
    };

    return (
        <>
            <Segment placeholder>
                <Grid columns={2} relaxed="very" stackable>
                    <Grid.Column>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Field>
                                <label>UserName</label>
                                <InputRef {...register("UserName")} />
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <InputRef {...register("Password")} type="password" />
                            </Form.Field>
                            <Button type="submit">Login</Button>
                        </Form>
                    </Grid.Column>
                    <Grid.Column verticalAlign="middle">
                        <Button content="Sign up" icon="signup" size="big" onClick={() => navigate('/signin')} />
                    </Grid.Column>
                </Grid>
                <Divider vertical>Or</Divider>
            </Segment>

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
        </>
    );
};

export default Login;
