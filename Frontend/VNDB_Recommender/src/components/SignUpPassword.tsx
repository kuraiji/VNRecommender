import { Box, Progress, PasswordInput, Group, Text, Center } from '@mantine/core'
import { useInputState } from '@mantine/hooks';
import { IconCheck, IconX } from "@tabler/icons-react"
import { forwardRef, useEffect, useImperativeHandle } from 'react';

interface SignUpPasswordProps {
    PasswordCallback: React.Dispatch<React.SetStateAction<string>>,
    DisabledCallback: React.Dispatch<React.SetStateAction<boolean>>,
    Label?: string,
    Error?: string
}

export interface SignUpPasswordRef {
    clear: ()=>void
}

const colors = {
    red: "#ff0000",
    yellow: "#FFFF00",
    green: "#00FF7F"
}

function PasswordRequirement({ meets, label }: {meets: boolean; label: string}) {
    return (
        <Text color={meets ? `${colors.green}` : `${colors.red}`} mt={5} size="sm">
            <Center inline>
                {meets ? <IconCheck size="0.9rem" stroke={1.5}/> : <IconX size="0.9rem" stroke={1.5}/>}
            <Box ml={7}>{label}</Box>
            </Center>
        </Text>
    )
}

const requirements = [
    { re: /[0-9]/, label: 'Includes number'},
    { re: /[a-z]/, label: 'Includes lowercase letter'},
    { re: /[A-Z]/, label: 'Includes uppercase letter'},
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol'}
];

function getStrength(password: string) {
    let multiplier = password.length > 5 ? 0 : 1;

    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1;
        }
    });
    const result = Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
    return result;
}

const SignUpPassword = forwardRef(
    function SignUpPassword(props: SignUpPasswordProps, ref: React.ForwardedRef<SignUpPasswordRef | undefined>){
        const [value, setValue] = useInputState('');
        const strength = getStrength(value);
    
        useEffect(()=>{
            props.DisabledCallback(getStrength(value) <= 80)
        },[value, props]);

        useImperativeHandle(ref, () => ({
            clear() {
                setValue("");
            }
        }))
        
        const checks = requirements.map((requirement, index) => (
            <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)}/>
        ));
        const bars = Array(4)
            .fill(0)
            .map((_, index) => (
                <Progress 
                    styles={{ bar: { transitionDuration: '0ms' } }}
                    value={
                        value.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 4) * 100 ? 100 : 0
                    }
                    color={strength > 80 ? `${colors.green}` : strength > 50 ? `${colors.yellow}` : `${colors.red}`}
                    key={index}
                    size={4}
                />
            ));
    
        return(
            <div>
                <PasswordInput
                    value={value}
                    onChange={(val)=>{
                        setValue(val);
                        props.PasswordCallback(val.currentTarget.value);
                    }}
                    label={typeof props.Label === "string" ? props.Label : "Password"}
                    required
                    error={typeof props.Error === "string" ? props.Error : ""}
                />
                <Group spacing={5} grow mt="xs" mb="md">
                    {bars}
                </Group>
                <PasswordRequirement label='Has at least 6 characters' meets={value.length > 5} />
                {checks}
            </div>
        )
    }
)



export default SignUpPassword;