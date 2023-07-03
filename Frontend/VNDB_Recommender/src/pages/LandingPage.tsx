import { Flex } from "@mantine/core";
import FloatingLabel from "../components/FloatingLabel";

function LandingPage() {
    return (
        <Flex justify={"center"} direction={"column"} align={"center"}>
            <p>Please enter your VNDB ID to begin:</p>
            <FloatingLabel/>
            <p>To access additional options such as platform and language filters, and VN blacklisting, please create an account.</p>
        </Flex>
    );
}

export default LandingPage;