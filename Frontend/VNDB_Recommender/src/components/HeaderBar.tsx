import { Box, Group, Header, Text, Button, Divider, createStyles, rem } from "@mantine/core";

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
                    <Button variant="default">Log in</Button>
                    <Button>Sign up</Button>
                </Group>
            </div>
        </Header>
    )
}