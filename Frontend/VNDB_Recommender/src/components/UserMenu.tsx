import { Avatar, Menu, Modal, UnstyledButton } from "@mantine/core";
import { IconLogout, IconSettings } from "@tabler/icons-react";
import { signOut } from "firebase/auth"
import { auth } from "../api/firebase";
import ModalBase from "./ModalBase";
import UserSettings from "./UserSettings";
import { createRef } from "react";
import { useDisclosure } from "@mantine/hooks";


export default function UserMenu() {

    const [opened, {open, close}] = useDisclosure(false);

    return(
        <>
            <Menu shadow="md" width={200}>
                <Menu.Target>
                    <UnstyledButton>
                        <Avatar radius="xl" 
                            variant="gradient" 
                            gradient={{from: 'aqua', to: 'aquamarine', deg: 143}}
                        />
                    </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Label>My Account</Menu.Label>
                    <Menu.Item onClick={open} icon={<IconSettings size={14}/>}>Settings</Menu.Item>
                    <Menu.Item onClick={()=>{signOut(auth)}} icon={<IconLogout size={14}/>}>Log Out</Menu.Item>
                </Menu.Dropdown>
            </Menu>
            <Modal opened={opened} onClose={close} title="Settings">
                    {UserSettings()}
            </Modal>
        </>
    )
}