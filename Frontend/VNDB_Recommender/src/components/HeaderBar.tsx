import { Group, Header, Portal, Text, createStyles, rem, keyframes, Center, Avatar } from "@mantine/core";
import ModalBase from "./ModalBase";
import SignUpContents from "./SignUpContents";
import LogInContents from "./LogInContents";
import NotificationBase from "./NotificationBase";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../api/firebase";

const slide = keyframes({
    'from': {right: "-23rem"},
    '75%': {right: "5rem"},
    'to': {right:"2rem"}
})

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
    },
    portal: {
        position: "absolute", 
        zIndex: 1, 
        right: "-23rem",
        maxWidth: "30%",
        bottom:"20rem",
    },
    portalAnimation:{
        animation: `${slide} 1s ease-in-out`,
        animationFillMode: "forwards"
    }
}))

export default function HeaderBar() {

    const { classes } = useStyles();
    const [animClass, setAnimClass] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    onAuthStateChanged(auth, (user)=>{
        if(user && user.emailVerified) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
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
                <Group sx={{visibility: loggedIn ? "hidden" : "visible"}}>
                    <ModalBase Contents={LogInContents} ButtonText="Log in" ButtonVariant="default"/>
                    <ModalBase Contents={SignUpContents} ButtonText="Sign up" OptionalCallback={()=>{setAnimClass(classes.portalAnimation)}}/>
                </Group>
                <Center sx={{visibility: loggedIn ? "visible" : "hidden"}}>
                    <Avatar radius="xl" variant="gradient" gradient={{from: 'aqua', to: 'aquamarine', deg: 143}}/>
                </Center>
                <Portal className={`${classes.portal} ${animClass}`}>
                    <NotificationBase CloseCallback={()=>{setAnimClass("");}}/>
                </Portal>
            </div>
        </Header>
    )
}