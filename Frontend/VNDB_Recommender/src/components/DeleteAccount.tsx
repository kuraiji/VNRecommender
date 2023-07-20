import { Button, Collapse, Flex, PasswordInput, Text, Title } from "@mantine/core";
import { useState } from "react";
import { FirebaseError, auth } from "../api/firebase";
import { AuthErrorCodes, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

interface DeleteAccountProps {
    OpenBlur: () => void,
    CloseBlur: () => void,
    CloseMenu: () => void
}

export default function DeleteAccount(props: DeleteAccountProps) {
    const [subMenu, setSubMenu] = useState(false);
    const [password, setPassword] = useState("");
    const [passError, setPassError] = useState("");

    async function deleteAccount(password: string) {
        setPassError("");
        props.OpenBlur();
        const user = auth.currentUser;
        if(user === null || user.email === null) return;
        try {
            await reauthenticateWithCredential(user,
                EmailAuthProvider.credential(user.email, password));
            user.delete();
        } catch (error) {
            const firebaseError = error as FirebaseError;
            console.log(error)
            switch(firebaseError.code) {
                case AuthErrorCodes.INVALID_PASSWORD:
                    setPassError("Incorrect Password");
                    break;
                case "auth/missing-password":
                    setPassError("Missing Password");
                    break;
            }
            props.CloseBlur();
            return;
        }
        setPassError("");
        props.CloseBlur();
        props.CloseMenu();
        return;
    }

    return(
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
                variant="light"
                onClick={()=>{setSubMenu(true)}}
            >
                Delete Account
            </Button>
            <div>
                <Collapse in={subMenu}>
                    <Flex gap="lg" direction="column">
                        <Text
                            variant="gradient"
                            gradient={{from: 'red', to: 'orange', deg: 45}}
                            fw="bold"
                        >
                            Are You Sure? We'll Miss You!
                        </Text>
                        <PasswordInput 
                            label="Confirm Password" 
                            value={password}
                            onChange={(val)=>{setPassword(val.currentTarget.value);}}
                            error={passError}
                        />
                        <Button 
                            uppercase 
                            color="red"
                            onClick={()=>{deleteAccount(password);}}
                        >
                            Confirm Deletion
                        </Button>
                    </Flex>
                </Collapse>
            </div>
        </Flex>
    )
}