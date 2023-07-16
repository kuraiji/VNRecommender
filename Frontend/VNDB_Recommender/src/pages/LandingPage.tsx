import { Button, Flex, Group, Text } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import FloatingLabel from "../components/FloatingLabel";
import MultiSelectLanguages from "../components/MultiSelectLanguages";
import MultiSelectPlatforms from "../components/MultiSelectPlatforms";
import { GetRecommendationsProps } from "../api/main";

interface LandingPageProps {
    onSearch: React.Dispatch<React.SetStateAction<GetRecommendationsProps | undefined>>
}

function OnStart(val: string, lan_filters: string[], plat_filters: string[], 
    errorCallback: ()=>void, unerrorCallback: ()=>void, 
    searchCallback: React.Dispatch<React.SetStateAction<GetRecommendationsProps | undefined>>): void {
    if(/u([0-9]){0,7}\w/.test(val)) {
        unerrorCallback();
        searchCallback({
            userid: Number(val.substring(1)), 
            language_filters: lan_filters,
            platform_filters: plat_filters
        })
        
    }
    else {
        errorCallback();
    }
}

function LandingPage(props: LandingPageProps) {
    const [searchValue, setSearchValue] = useInputState('');
    const [placeholderValue, setPlaceholderValue] = useInputState('u1234');
    const [errorValue, setErrorValue] = useInputState('');
    const [buttonPadding, setButtonPadding] = useInputState("0");
    const [lanFilters, setLanFilters] = useInputState(new Array<string>);
    const [platFilters, setPlatFilters] = useInputState(new Array<string>);


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
                    onClick={()=>{OnStart(searchValue, lanFilters, platFilters, OnError, OnUnerror, props.onSearch)}}
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
                <MultiSelectLanguages 
                    onValueChanged={(language_filters)=>{setLanFilters(language_filters)}}
                />
                <MultiSelectPlatforms
                    onValueChanged={(platform_filters)=>{setPlatFilters(platform_filters)}}
                />
            </Flex>
        </Flex>
    );
}

export default LandingPage;