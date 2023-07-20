import { Button, Center, Collapse, Flex, PasswordInput, Space, Title } from "@mantine/core";
import SignUpPassword, { SignUpPasswordRef } from "./SignUpPassword";
import { useRef, useState } from "react";
import { AuthErrorCodes, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { FirebaseError, auth } from "../api/firebase";

interface ChangePasswordProps {
    OpenBlur: () => void,
    CloseBlur: () => void,
    onChangedPassword: (() => void) | undefined
}


export default function ChangePassword(props: ChangePasswordProps) {
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");
    const [isPassStrong, setIsPassStrong] = useState(true);
    const [oldPassError, setOldPassError] = useState("");
    const [repeatPassError, setRepeatPassError] = useState("");
    const [newPassError, setNewPassError] = useState("");
    const passRef = useRef<SignUpPasswordRef>();

    async function onPasswordChange() {
        props.OpenBlur();
        setOldPassError("");
        setRepeatPassError("");
        setNewPassError("");
        const user = auth.currentUser;
        if(user === null || user.email === null) return;

        if(repeatNewPassword !== newPassword) {
            setRepeatPassError("Not the same Password")
            props.CloseBlur();
            return;
        }

        if(oldPassword === newPassword) {
            setNewPassError("Same as old Password");
            props.CloseBlur();
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
                case "auth/missing-password":
                    setOldPassError("Missing Password");
                    break;
            }
            props.CloseBlur();
            return;
        }

        if(typeof props.onChangedPassword !== "undefined") props.onChangedPassword();
        setRepeatNewPassword("");
        setOldPassword("");
        setNewPassword("");
        setOldPassError("");
        setRepeatPassError("");
        setNewPassError("");
        passRef.current?.clear();
        props.CloseBlur();
    }

    return(
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
                ref={passRef}
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
    )
}