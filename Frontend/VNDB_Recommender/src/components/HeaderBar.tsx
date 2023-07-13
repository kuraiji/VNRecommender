import { Group, Header, Text, createStyles, rem } from "@mantine/core";
import ModalBase from "./ModalBase";
import SignUpContents from "./SignUpContents";
import LogInContents from "./LogInContents";

const useStyles = createStyles((theme) => ({
    header: {
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
    },

    inner: {
        height: rem(56),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}))

export default function HeaderBar() {

    const { classes } = useStyles();

    return (
        <Header height={56} className={classes.header} mb={120} w="100vw">
            <div className={classes.inner}>
                <Text 
                    variant="gradient" 
                    gradient={{from: 'aqua', to: 'aquamarine', deg: 49}}
                    fz="xl"
                    fw="bold"
                >
                    Visual Novel Recommender
                </Text>
                <Group>
                    <ModalBase Contents={LogInContents} ButtonText="Log in" ButtonVariant="default"/>
                    <ModalBase Contents={SignUpContents} ButtonText="Sign up"/>
                </Group>
            </div>
        </Header>
    )
}