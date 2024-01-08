import { TextInput, createStyles, rem } from "@mantine/core";
import { useState } from "react";

interface FloatingLabelProps {
    placeholder: string,
    error: string,
    value: string,
    setValue: (val: string | React.ChangeEvent<any> | null | undefined) => void
    onClick: () => void
}

const useStyles = createStyles((theme, {floating}: {floating: boolean}) => ({
    root: {
        position: 'relative',
    },

    label: {
        position: 'absolute',
        zIndex: 2,
        top: rem(7),
        left: theme.spacing.sm,
        pointerEvents: 'none',
        color: theme.colors.dark[3],
        transition: 'transform 150ms ease, color 150ms ease, font-size 150ms ease',
        transform: floating ? `translate(-${theme.spacing.sm}, ${rem(-28)})` : 'none',
        fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
        fontWeight: floating ? 500 : 400,
    },

    required: {
        transition: 'opacity 150ms ease',
        opacity: floating ? 1 : 0,
    },

    input: {
        '&::placeholder': {
        transition: 'color 150ms ease',
        color: !floating ? 'transparent' : undefined,
        },
    },
}));

export default function FloatingLabel(props: FloatingLabelProps) {

    const [focused, setFocused] = useState(false);
    const { classes } = useStyles({ floating: props.value.trim().length !== 0 || focused });

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if(e.key === "Enter") {
            props.onClick();
        }
    }

    return (
        <TextInput
        label="VNDB User ID"
        placeholder={props.placeholder}
        required
        classNames={classes}
        value={props.value}
        onChange={props.setValue}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete="nope"
        error={props.error}
        onKeyUp={handleKeyPress}
      />
    );
}