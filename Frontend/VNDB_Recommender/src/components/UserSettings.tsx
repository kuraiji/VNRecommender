import { Button, Center, Collapse, Flex, LoadingOverlay, PasswordInput, Space, Stack, Text, Title } from "@mantine/core";
import SignUpPassword from "./SignUpPassword";
import { useEffect, useState } from "react";
import { AuthErrorCodes, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { useDisclosure } from "@mantine/hooks";
import { FirebaseError, auth } from "../api/firebase";

/*
Change Password Portion Consolidate
Wipe New Password on Change
User Delete Account
*/

interface UserSettingsProps {
    onChangedPassword: (() => void) | undefined
}

export default function UserSettings(props: UserSettingsProps) {
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");
    const [isPassStrong, setIsPassStrong] = useState(true);
    const [visible, { close, open }] = useDisclosure(false);
    const [oldPassError, setOldPassError] = useState("");
    const [repeatPassError, setRepeatPassError] = useState("");
    const [newPassError, setNewPassError] = useState("");

    async function onPasswordChange() {
        open();
        setOldPassError("");
        setRepeatPassError("");
        setNewPassError("");
        const user = auth.currentUser;
        if(user === null || user.email === null) return;

        if(repeatNewPassword !== newPassword) {
            setRepeatPassError("Not the same Password")
            close();
            return;
        }

        if(oldPassword === newPassword) {
            setNewPassError("Same as old Password");
            close();
            return;
        }

        try {
            await reauthenticateWithCredential(user,
                EmailAuthProvider.credential(user.email, oldPassword));
            await updatePassword(user, newPassword);
        } catch (error) {
            const firebaseError = error as FirebaseError;
            switch(firebaseError.code) {
                case AuthErrorCodes.INVALID_PASSWORD:
                    setOldPassError("Incorrect Password");
                    break;
            }
            close();
            return;
        }

        if(typeof props.onChangedPassword !== "undefined") props.onChangedPassword();
        setRepeatNewPassword("");
        setOldPassword("");
        setNewPassword("");
        setOldPassError("");
        setRepeatPassError("");
        setNewPassError("");
        close();
    }


    return(
        <Stack justify="center" align="center" spacing="lg">
            <LoadingOverlay visible={visible}/>
            <Flex
                direction="column" 
                align="stretch"
                w="100%"
                gap="lg"
            >
                <Title order={5}>Change Password</Title>
                <PasswordInput 
                    label="Old Password" 
                    value={oldPassword}
                    onChange={(val)=>{setOldPassword(val.currentTarget.value);}}
                    error={oldPassError}
                />
                <SignUpPassword 
                    DisabledCallback={setIsPassStrong} 
                    PasswordCallback={setNewPassword}
                    Label="New Password"
                    Error={newPassError}
                />
                <div>
                    <Collapse 
                        in={!isPassStrong && oldPassword !== ""}
                    >
                        <PasswordInput 
                            label="Confirm New Password"
                            value={repeatNewPassword}
                            onChange={(val)=>{setRepeatNewPassword(val.currentTarget.value)}}
                            error={repeatPassError}
                        />
                        <Space h="xl"/>
                        <Center>
                            <Button onClick={onPasswordChange}>Change Password</Button>
                        </Center>
                    </Collapse>
                </div>
            </Flex>
            <Flex 
                direction="column" 
                align="center"
                w="100%"
                gap="lg"
            >
                <Flex justify="flex-start" w="100%">
                    <Title order={5}>Delete Account</Title>
                </Flex>
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