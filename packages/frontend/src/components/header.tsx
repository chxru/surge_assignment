import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const NavigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <Flex
      justify={{ base: "center", md: "flex-end" }}
      width="100%"
      position="absolute"
      top="0"
      paddingRight={{ base: "inherit", md: "8" }}
      marginTop="8"
    >
      <Box marginX="8" cursor="pointer" onClick={() => NavigateTo("/")}>
        Home
      </Box>
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
