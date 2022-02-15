import React from "react";
import { Box, Flex } from "@chakra-ui/react";

const Header: React.FC = () => {
  return (
    <Flex
      justify={{ base: "center", md: "flex-end" }}
      width="100%"
      position="absolute"
      top="0"
      paddingRight={{ base: "inherit", md: "8" }}
      marginTop="8"
    >
      <Box marginX="8" cursor="pointer">
        Github
      </Box>
      <Box marginX="8" cursor="pointer">
        About
      </Box>
      <Box marginX="8" cursor="pointer">
        Profile
      </Box>
    </Flex>
  );
};

export default Header;
