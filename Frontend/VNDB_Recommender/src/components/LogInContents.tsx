import { Button, Flex, TextInput, PasswordInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../api/firebase';

export interface LogInContentsProps {
    CloseCallback: ()=>void
}

function LogInContents(props: LogInContentsProps) {

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
        const userCredential = await signInWithEmailAndPassword(auth, form.getInputProps("email").value, 
            form.getInputProps("password").value);
        console.log(userCredential);
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
                    <PasswordInput
                        label="Password"
                        required
                        {...form.getInputProps('password')}
                    />
                    <Button disabled={isDisabled} onClick={LogInUser}>Log In</Button>
                </Flex>
            </form>
    )
}

export default LogInContents;