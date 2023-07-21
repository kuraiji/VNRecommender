import { Group, Header, Text, createStyles, rem, Center, Skeleton } from "@mantine/core";
import ModalBase from "./ModalBase";
import SignUpContents from "./SignUpContents";
import LogInContents from "./LogInContents";
import { useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../api/firebase";
import UserMenu from "./UserMenu";
import Notification, { NotificationRef } from "./Notification";

const useStyles = createStyles((theme) => ({
    header: {
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
    },

    inner: {
        height: rem(56),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}))

export default function HeaderBar() {

    const { classes } = useStyles();
    const signRef = useRef<NotificationRef>();
    const logRef = useRef<NotificationRef>();
    const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
    const [doOnce, setDoOnce] = useState(false);

    onAuthStateChanged(auth, (user)=>{
        if(!loggedIn && user && user.emailVerified) {
            setLoggedIn(true);
        } else if (loggedIn && !user) {
            setLoggedIn(false);
        }
        else if(!doOnce && !user)
        {
            setLoggedIn(false);
            setDoOnce(true);
        }
    })

    return (
        <Header height={56} className={classes.header} mb={120} w="100vw">
            <div className={classes.inner}>
                <Text 
                    variant="gradient" 
                    gradient={{from: 'aqua', to: 'aquamarine', deg: 49}}
                    fz="xl"
                    fw="bold"
                >
                    Visual Novel Recommender
                </Text>
                <Center>
                    <Skeleton circle height={40} visible={loggedIn === null}/>
                </Center>
                <Group sx={{display: loggedIn === false ? "visible" : "none"}}>
                    <ModalBase Contents={LogInContents} ButtonText="Log in" ButtonVariant="default"
                        OptionalCallback={logRef}
                    />
                    <ModalBase Contents={SignUpContents} ButtonText="Sign up" 
                        OptionalCallback={signRef}
                    />
                </Group>
                <Center sx={{display: loggedIn === true ? "visible" : "none"}}>
                    <UserMenu/>
                </Center>
                <Notification header="Account creation successful!" body="Please verify your email before logging in." ref={signRef}/>
                <Notification header="Password reset email sent!" body="Please use the email to reset your password." ref={logRef}/>
            </div>
        </Header>
    )
}