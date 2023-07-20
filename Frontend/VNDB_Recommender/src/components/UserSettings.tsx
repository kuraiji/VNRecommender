import { LoadingOverlay, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";

interface UserSettingsProps {
    onChangedPassword: (() => void) | undefined,
    closeMenu: () => void
}

export default function UserSettings(props: UserSettingsProps) {
    const [visible, { close, open }] = useDisclosure(false);

    return(
        <Stack justify="center" align="center" spacing="lg">
            <LoadingOverlay visible={visible}/>
            <ChangePassword
                OpenBlur={open}
                CloseBlur={close}
                onChangedPassword={props.onChangedPassword}
            />
            <DeleteAccount OpenBlur={open} CloseBlur={close} CloseMenu={props.closeMenu}/>
        </Stack>
    )
}