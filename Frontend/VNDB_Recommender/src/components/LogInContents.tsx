import { Button, Flex, TextInput, PasswordInput, LoadingOverlay } from '@mantine/core'
import { useForm } from '@mantine/form'
import { AuthErrorCodes, UserCredential, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError, auth } from '../api/firebase';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

export interface LogInContentsProps {
    CloseCallback: ()=>void,
    NotificationCallback?: ()=>void
}

function LogInContents(props: LogInContentsProps) {
    const [visible, { close, open }] = useDisclosure(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const form = useForm({
        initialValues: {
            email: '',
            password: ''
        },
        validate: {
            email : (value) => (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? null : 'Invalid Email'),
            password : (value) => (value ? null : "Password Missing")
        },
    });

    const isDisabled = !(form.getInputProps("email").value && form.getInputProps("password").value);

    async function LogInUser() {
        setEmailError("");
        setPasswordError("");
        open();
        let userCredential: UserCredential;
        try {
            userCredential = await signInWithEmailAndPassword(auth, form.getInputProps("email").value, 
                form.getInputProps("password").value);
        } catch (error) {
            const firebaseError = error as FirebaseError;
            switch(firebaseError.code) {
                case AuthErrorCodes.INVALID_PASSWORD:
                    setPasswordError("Incorrect Password");
                    break;
                case AuthErrorCodes.INVALID_EMAIL:
                    setEmailError("Invalid Email Address");
                    break;
                case AuthErrorCodes.USER_DELETED:
                    setEmailError("Account doesn't exist");
                    break;
            }
            close();
            return;
        }
        if(!userCredential.user.emailVerified) {
            setEmailError("Email isn't verified");
            close();
            return;
        }
        setEmailError("");
        setPasswordError("");
        close();
        props.CloseCallback();
    }

    return (
        <form>
            <Flex direction="column" gap="xl">
                    <LoadingOverlay visible={visible}/>
                    <TextInput 
                        label="Email"
                        withAsterisk
                        required
                        {...form.getInputProps('email')}
                        error={emailError}
                    />
                    <PasswordInput
                        label="Password"
                        required
                        {...form.getInputProps('password')}
                        error={passwordError}
                    />
                    <Button disabled={isDisabled} onClick={LogInUser}>Log In</Button>
                </Flex>
            </form>
    )
}

export default LogInContents;