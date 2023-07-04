import { Button, Flex, TextInput, PasswordInput } from '@mantine/core'
import { useDisclosure } from "@mantine/hooks";
import SignUpPassword from './SignUpPassword';

function SignUpContents() {

    const [visible, {toggle}] = useDisclosure(false);

    return (
        <Flex direction="column" gap="xl">
                <TextInput 
                    label="Email"
                    withAsterisk
                />
                <SignUpPassword/>
                <PasswordInput
                    label="Confirm Password"
                    visible={visible}
                    onVisibilityChange={toggle}
                    required
                />
                <Button disabled>Create Account</Button>
            </Flex>
    )
}

export default SignUpContents;