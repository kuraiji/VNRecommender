import { Notification } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

interface NotificationBaseProps {
    CloseCallback: ()=>void
}

export default function NotificationBase(props: NotificationBaseProps) {
    return(
        <>
            <Notification
                icon={<IconCheck size="1.2rem"/>} 
                color='teal' 
                radius="lg" 
                title="Account creation successful!"
                onClose={props.CloseCallback}
            >
                Please verify your email before logging in.
            </Notification>

        </>
    )
}