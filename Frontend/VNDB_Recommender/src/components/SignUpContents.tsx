import { Button, Flex, TextInput, PasswordInput } from '@mantine/core'
import { useDisclosure } from "@mantine/hooks";
import { useForm } from '@mantine/form'
import SignUpPassword from './SignUpPassword';
import { useRef } from 'react';

function SignUpContents() {

    const [disable, {open, close}] = useDisclosure(true);
    const passwordRef = useRef('');

    const form = useForm({
        initialValues: {
            email: '',
            confirm_password: ''
        },
        validate: {
            email : (value) => (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? null : 'Invalid Email'),
            confirm_password: (value) => (value !== passwordRef.current ? 'Passwords did not match' : null),
        },
    });

    return (
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <Flex direction="column" gap="xl">
                    <TextInput 
                        label="Email"
                        withAsterisk
                        required
                        {...form.getInputProps('email')}
                    />
                    <SignUpPassword OnSuccess={close} OnFailure={open} PasswordRef={passwordRef}/>
                    <PasswordInput
                        label="Confirm Password"
                        required
                        {...form.getInputProps('confirm_password')}
                    />
                    <Button disabled={disable} type='submit'>Create Account</Button>
                </Flex>
            </form>
    )
}

export default SignUpContents;