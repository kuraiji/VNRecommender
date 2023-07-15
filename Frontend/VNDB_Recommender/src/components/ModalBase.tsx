import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group } from '@mantine/core'
import { SignUpContentsProps } from "./SignUpContents";
import { LogInContentsProps } from "./LogInContents";
import { NotificationRef } from "./Notification";


interface ModalBaseProps{
    ButtonVariant?: string,
    ButtonText: string,
    Contents: (props: SignUpContentsProps | LogInContentsProps)=>JSX.Element,
    OptionalCallback?: (()=>void) | undefined | React.MutableRefObject<NotificationRef | undefined>
}

function ModalBase(props: ModalBaseProps) {
    const [opened, {open, close}] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={close} title="Authentication">
                {props.Contents({CloseCallback: close, NotificationCallback: props.OptionalCallback})}
            </Modal>
            <Group position="center">
                <Button variant={props.ButtonVariant} onClick={open}>{props.ButtonText}</Button>
            </Group>
        </>
    )
}

export default ModalBase;