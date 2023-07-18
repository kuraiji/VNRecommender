import { Button, Center, Flex, PasswordInput, Stack, Text, Title } from "@mantine/core";
import SignUpPassword from "./SignUpPassword";
import { useState } from "react";

/*
User Change Password
User Delete Account
*/

export default function UserSettings() {
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(true)

    return(
        <Stack justify="center" align="center" spacing="lg">
            <Flex
                direction="column" 
                align="stretch"
                w="100%"
                gap="lg"
            >
                <Title order={5}>Change Password</Title>
                <PasswordInput label="Old Password"/>
                <SignUpPassword 
                    DisabledCallback={setDisabled} 
                    PasswordCallback={setPassword}
                    Label="New Password"
                />
                <PasswordInput label="Confirm New Password"/>
                <Center>
                    <Button>Change Password</Button>
                </Center>
            </Flex>
            <Flex 
                direction="column" 
                align="center"
                w="100%"
                gap="lg"
            >
                <Title order={5}>Delete Account</Title>
                <Button
                    uppercase
                    color="red"
                    w="50%"
                >
                    Delete Account
                </Button>
                <div>
                    <Text
                        variant="gradient"
                        gradient={{from: 'red', to: 'orange', deg: 45}}
                        fw="bold"
                    >
                        Are You Sure? We'll Miss You!
                    </Text>
                    <Button>Yes</Button>
                </div>
            </Flex>
        </Stack>
    )
}