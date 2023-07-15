import { Button, Flex, TextInput, PasswordInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import SignUpPassword from './SignUpPassword';
import { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import { auth } from '../api/firebase';

export interface SignUpContentsProps {
    CloseCallback: ()=>void,
    NotificationCallback?: ()=>void
}

function SignUpContents(props : SignUpContentsProps) {
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(true)

    const form = useForm({
        initialValues: {
            email: '',
            confirm_password: ''
        },
        validate: {
            email : (value) => (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? null : 'Invalid Email'),
            confirm_password: (value) => (value !== password ? 'Passwords did not match' : null),
        },
    });

    const isDisabled = !(form.getInputProps("email").value && 
        form.getInputProps("confirm_password").value === password);

    async function SignUpUser(NotificationCallback: undefined | (()=>void)) {
        const userCredential = await createUserWithEmailAndPassword(auth, form.getInputProps('email').value, form.getInputProps('confirm_password').value);
        const user = userCredential.user;
        await sendEmailVerification(user);
        if(NotificationCallback) NotificationCallback();
        props.CloseCallback();
    }

    return (
        <form>
            <Flex direction="column" gap="xl">
                    <TextInput 
                        label="Email"
                        withAsterisk
                        required
                        {...form.getInputProps('email')}
                    />
                    <SignUpPassword PasswordCallback={setPassword} DisabledCallback={setDisabled}/>
                    <PasswordInput
                        label="Confirm Password"
                        required
                        {...form.getInputProps('confirm_password')}
                    />
                    <Button onClick={()=>{SignUpUser(props.NotificationCallback)}} disabled={disabled || isDisabled}>Create Account</Button>
                </Flex>
            </form>
    )
}

export default SignUpContents;