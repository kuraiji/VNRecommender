import { Button, Flex, Group, Text } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import FloatingLabel from "../components/FloatingLabel";
import MultiSelectLanguages from "../components/MultiSelectLanguages";
import MultiSelectPlatforms from "../components/MultiSelectPlatforms";
import { GetRecommendations } from "../api/main";

function OnStart(val: string, errorCallback: ()=>void, unerrorCallback: ()=>void): void {
    if(/u([0-9]){0,7}\w/.test(val)) {
        console.log(val);
        unerrorCallback();
        GetRecommendations({userid: 2, language_filters: ["en"], platform_filters: ["win"]}).then((res)=>{
            console.log(res);
        })
        
    }
    else {
        errorCallback();
    }
}

function LandingPage() {
    const [searchValue, setSearchValue] = useInputState('');
    const [placeholderValue, setPlaceholderValue] = useInputState('u1234')
    const [errorValue, setErrorValue] = useInputState('')
    const [buttonPadding, setButtonPadding] = useInputState("0")

    const OnError = () => {
        setPlaceholderValue("");
        setErrorValue("Please enter a valid UID (u1234)");
        setButtonPadding("lg");
    }
    const OnUnerror = () => {
        setPlaceholderValue("u1234");
        setErrorValue("");
        setButtonPadding("0");
    }

    return (
        <Flex justify={"center"} direction={"column"} align={"center"}>
            <p>Please enter your VNDB ID to begin:</p>
            <Group align="center" mt="xs">
                <FloatingLabel 
                    setValue={setSearchValue} 
                    value={searchValue}
                    placeholder={placeholderValue}
                    error={errorValue}
                />
                <Button 
                    onClick={()=>{OnStart(searchValue, OnError, OnUnerror)}}
                    mb={buttonPadding}
                    variant="gradient"
                    gradient={{from: 'aqua', to: 'aquamarine', deg: 143}}
                    c="dark"
                >
                        Recommend Me!
                </Button>
            </Group>
            <Text mt="xl" mb="md" align="center" w="85%">
                To access additional options such as 
                <Text span c="aqua"> platform and language filters</Text>
                , and 
                <Text span c="aqua"> VN blacklisting</Text>
                , 
                <Text span c="aquamarine"> please create an account</Text>.
            </Text>
            <Flex gap="md">
                <MultiSelectLanguages/>
                <MultiSelectPlatforms/>
            </Flex>
        </Flex>
    );
}

export default LandingPage;