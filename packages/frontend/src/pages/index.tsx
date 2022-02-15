import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

const IndexPage: React.FC = () => {
  return (
    <Flex
      direction="column"
      width="100vw"
      height="100vh"
      justify="center"
      alignItems="center"
    >
      <Text fontSize="2xl">Heyyy, Guest</Text>
      <Flex direction={{ base: "column", md: "row" }} marginTop="4">
        <Button colorScheme="teal" shadow="sm" width={{ base: "64", md: "32" }}>
          Register
        </Button>
        <Box marginX="2" marginY="1"></Box>
        <Button shadow="sm" width={{ base: "64", md: "32" }}>
          Login
        </Button>
      </Flex>
    </Flex>
  );
};

export default IndexPage;
