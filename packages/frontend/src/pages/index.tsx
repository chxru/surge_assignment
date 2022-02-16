import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/auth-context";

const IndexPage: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const NavigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <Flex
      direction="column"
      width="100vw"
      height="100vh"
      justify="center"
      alignItems="center"
    >
      <Text fontSize="2xl">
        Heyyy, {auth.user ? auth.user.full_name : "Guest"}
      </Text>
      <Flex direction={{ base: "column", md: "row" }} marginTop="4">
        {auth.user ? (
          <>
            <Button
              colorScheme="teal"
              shadow="sm"
              width={{ base: "64", md: "32" }}
              onClick={() => NavigateTo("me")}
            >
              View Profile
            </Button>
            <Box marginX="2" marginY="1"></Box>
            <Button
              shadow="sm"
              width={{ base: "64", md: "32" }}
              onClick={auth.OnSignOut}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              colorScheme="teal"
              shadow="sm"
              width={{ base: "64", md: "32" }}
              onClick={() => NavigateTo("register")}
            >
              Register
            </Button>
            <Box marginX="2" marginY="1"></Box>
            <Button
              shadow="sm"
              width={{ base: "64", md: "32" }}
              onClick={() => NavigateTo("login")}
            >
              Login
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default IndexPage;
