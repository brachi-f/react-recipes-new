import { Form, div, FormInput, Segment, Step, Button } from "semantic-ui-react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Signin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const schema = yup.object({
        UserName: yup.string().min(3, 'שם משתמש עם מינימום 3 תווים').required(),
        Password: yup.string().min(6, 'הסיסמה צריכה להיות לפחות 6 תווים')
            .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, 'הסיסמה צריכה לכלול גם אותיות וגם מספרים')
            .required()
    });

    const {
        register, handleSubmit, formState: { errors }, } = useForm({
            resolver: yupResolver(schema),
        })
    return <>
        <div className="container">
            <Segment placeholder /*className="my-segment"*/ >
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormInput
                        label='שם משתמש'
                        placeholder='שם משתמש'
                    />
                    <FormInput
                        label='סיסמא'
                        placeholder='סיסמא'
                        type="password"
                    />
                    <FormInput
                        label='שם'
                        placeholder='שם'
                    />
                    <FormInput
                        label='כתובת מייל'
                        placeholder='כתובת מייל'
                        type="Email"
                    />

                    <FormInput
                        label='מספר פלאפון'
                        placeholder='מספר פלאפון'
                    />
                    <FormInput
                        label='מספר ת.ז.'
                        placeholder='מספר ת.ז.'
                    />
                    <Button type="submit" content='signin' primary/>
                </Form>
            </Segment >
        </div>
    </>
}
export default Signin;