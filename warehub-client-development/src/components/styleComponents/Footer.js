import { Box, Flex, HStack, useColorMode } from "@chakra-ui/react";
import { FiBox } from "react-icons/fi";


function Footer() {
  return (
      <Flex>
        <Box>
            <HStack>
                <Box as={FiBox} color="gray.600" />
                <Box as="span" fontWeight="bold" fontSize="lg">
                WareHub
                </Box>
            </HStack>
        </Box>
      </Flex>
  );
}

export default Footer;
