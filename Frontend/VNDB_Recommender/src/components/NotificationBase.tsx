import { Notification } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

interface NotificationBaseProps {
    CloseCallback: ()=>void,
    Header: string,
    Body: string
}

export default function NotificationBase(props: NotificationBaseProps) {
    return(
        <>
            <Notification
                icon={<IconCheck size="1.2rem"/>} 
                color='teal' 
                radius="lg" 
                title={props.Header}
                onClose={props.CloseCallback}
            >
                {props.Body}
            </Notification>

        </>
    )
}