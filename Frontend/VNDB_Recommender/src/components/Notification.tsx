import { forwardRef, useImperativeHandle, useState } from "react";
import NotificationBase from "./NotificationBase";
import { Portal, keyframes, createStyles } from "@mantine/core";
import { IsMobile } from "../api/main";

interface NotificationProps {
    header: string,
    body: string
}

export interface NotificationRef {
    play: ()=>void
}

const slide = keyframes({
    'from': {right: "-23rem"},
    '75%': {right: "5rem"},
    'to': {right:"2rem"}
})

const slideMobile = keyframes({
    'from': {right: "-23rem"},
    '75%': {right: "5rem"},
    'to': {right:"15rem"}
})

const useStyles = createStyles(() => ({
    portal: {
        position: "fixed", 
        zIndex: 300, 
        right: "-23rem",
        maxWidth: "30%",
        bottom:"20rem"
    },
    portalAnimation:{
        animation: `${slide} 1s ease-in-out`,
        animationFillMode: "forwards"
    },
    hide: {
        display:"none"
    },
    portalMobileAnimation:{
        animation: `${slideMobile} 1s ease-in-out`,
        animationFillMode: "forwards"
    }
}))

const Notification = forwardRef(function Notification(props: NotificationProps, ref: React.ForwardedRef<NotificationRef | undefined> ) {
    const { classes } = useStyles();
    const [animClass, setAnimClass] = useState("");
    const isMobile = IsMobile();

    useImperativeHandle(ref, () => ({
        play() {
            setAnimClass(isMobile ? classes.portalMobileAnimation : classes.portalAnimation);
        }
    }));

    return (
        <Portal className={`${classes.portal} ${animClass} ${animClass === "" ? classes.hide : ""}`}>
                <NotificationBase 
                    CloseCallback={()=>{setAnimClass("");}}
                    Header={props.header}
                    Body={props.body}
                />
        </Portal>  
    );
})

export default Notification;