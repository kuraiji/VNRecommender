import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group } from '@mantine/core'
import { ReactElement } from "react";

interface ModalBaseProps{
    ButtonVariant?: string,
    ButtonText: string,
    Contents: ReactElement
}

function ModalBase(props: ModalBaseProps) {
    const [opened, {open, close}] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={close} title="Authentication">
                {props.Contents}
            </Modal>
            <Group position="center">
                <Button variant={props.ButtonVariant} onClick={open}>{props.ButtonText}</Button>
            </Group>
        </>
    )
}

export default ModalBase;