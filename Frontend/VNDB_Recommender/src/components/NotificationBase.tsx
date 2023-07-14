import { Notification } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

export default function NotificationBase() {
    return(
        <>
            <Notification
                icon={<IconCheck size="1.2rem"/>} 
                color='teal' 
                radius="lg" 
                title="Account creation successful!"
            >
                Please verify your email before logging in.
            </Notification>

        </>
    )
}