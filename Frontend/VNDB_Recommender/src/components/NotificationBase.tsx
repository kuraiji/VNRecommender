import { Notification } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { IsMobile } from '../api/main';

interface NotificationBaseProps {
    CloseCallback: ()=>void,
    Header: string,
    Body: string
}

export default function NotificationBase(props: NotificationBaseProps) {

    const isMobile = IsMobile();

    return(
        <>
            <Notification
                icon={<IconCheck size="1.2rem"/>} 
                color='teal' 
                radius="lg" 
                title={props.Header}
                onClose={props.CloseCallback}
                style={{width: isMobile ? "75vw" : "auto"}}
            >
                {props.Body}
            </Notification>

        </>
    )
}