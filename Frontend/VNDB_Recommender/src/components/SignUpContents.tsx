import { Button, Flex, TextInput, PasswordInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import SignUpPassword from './SignUpPassword';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from '../api/firebase';

function SignUpContents() {

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

    function SignUpUser() {
        createUserWithEmailAndPassword(auth, form.getInputProps('email').value, 
            form.getInputProps('confirm_password').value).then((userCredential) => {
            //Signed in
            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            console.log(error.code, error.message);
        });
    }

    return (
        <form onSubmit={SignUpUser}>
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
                    <Button disabled={disabled} type='submit'>Create Account</Button>
                </Flex>
            </form>
    )
}

export default SignUpContents;