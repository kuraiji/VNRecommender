import { Avatar, Menu, UnstyledButton } from "@mantine/core";
import { IconLogout, IconSettings } from "@tabler/icons-react";
import { signOut } from "firebase/auth"
import { auth } from "../api/firebase";


export default function UserMenu() {
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
                    <Menu.Item icon={<IconSettings size={14}/>}>Settings</Menu.Item>
                    <Menu.Item onClick={()=>{signOut(auth)}} icon={<IconLogout size={14}/>}>Log Out</Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </>
    )
}