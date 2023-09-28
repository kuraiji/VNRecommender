import { Button, Flex, TextInput, PasswordInput, LoadingOverlay } from '@mantine/core'
import { useForm } from '@mantine/form'
import SignUpPassword from './SignUpPassword';
import { useState } from 'react';
import { AuthErrorCodes, UserCredential, createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth"
import { FirebaseError, auth, database } from '../api/firebase';
import { useDisclosure } from '@mantine/hooks';
import { NotificationRef } from './Notification';
import { ref, set } from 'firebase/database';

export interface SignUpContentsProps {
    CloseCallback: ()=>void,
    NotificationCallback?: (()=>void) | undefined | React.MutableRefObject<NotificationRef | undefined>
}

function SignUpContents(props : SignUpContentsProps) {
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(true)
    const [visible, { close, open }] = useDisclosure(false);
    const [emailError, setEmailError] = useState("");

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

    async function SignUpUser(NotificationCallback: (()=>void) | undefined | React.MutableRefObject<NotificationRef | undefined>) {
        setEmailError("");
        open();
        let userCredential: UserCredential;
        try {
            userCredential = await createUserWithEmailAndPassword(auth, form.getInputProps('email').value, 
                form.getInputProps('confirm_password').value);
            await set(ref(database, 'users/' + userCredential.user.uid), {
                blacklistedVNs: [""]
            });
        } catch (error) {
            const firebaseError = error as FirebaseError;
            switch(firebaseError.code) {
                case AuthErrorCodes.EMAIL_EXISTS:
                    setEmailError("Account already exists");
                    break;
                case AuthErrorCodes.INVALID_EMAIL:
                    setEmailError("Invalid email address");
                    break;
            }
            close();
            return;
        }
        const user = userCredential.user;
        await sendEmailVerification(user);
        if(typeof NotificationCallback === "function") NotificationCallback();
        else NotificationCallback?.current?.play();
        signOut(auth);
        close();
        props.CloseCallback();
    }

    return (
        <form>
            <Flex direction="column" gap="xl">
                    <LoadingOverlay visible={visible} overlayBlur={2}/>
                    <TextInput
                        label="Email"
                        withAsterisk
                        required
                        {...form.getInputProps('email')}
                        error={emailError}
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