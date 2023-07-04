import { Button, Flex, TextInput, PasswordInput } from '@mantine/core'
import { useForm } from '@mantine/form'

function LogInContents() {

    const form = useForm({
        initialValues: {
            email: '',
            password: ''
        },
        validate: {
            email : (value) => (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? null : 'Invalid Email'),
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
                    <PasswordInput
                        label="Password"
                        required
                        {...form.getInputProps('password')}
                    />
                    <Button type='submit'>Log In</Button>
                </Flex>
            </form>
    )
}

export default LogInContents;