import { Flex, Text } from "@mantine/core";
import FloatingLabel from "../components/FloatingLabel";
import MultiSelectLanguages from "../components/MultiSelectLanguages";
import MultiSelectPlatforms from "../components/MultiSelectPlatforms";

function LandingPage() {
    return (
        <Flex justify={"center"} direction={"column"} align={"center"}>
            <p>Please enter your VNDB ID to begin:</p>
            <FloatingLabel/>
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