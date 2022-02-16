import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

import { useAuth } from "../contexts/auth-context";
import { useNavigate } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const NavigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <Flex>
      {/* Left ribbon */}
      <Flex
        display={{ base: "none", md: "flex" }}
        width={{ md: "64", lg: "96" }}
        bgColor="teal"
        minHeight="100vh"
        justify="center"
        alignItems="center"
      >
        <Text
          fontSize="6xl"
          fontWeight="semibold"
          color="white"
          style={{ transform: "rotate(-90deg)" }}
        >
          Profile
        </Text>
      </Flex>

      {/* Form */}
      <Flex
        grow="1"
        height="100vh"
        justify={{ base: "space-around", md: "center" }}
        alignItems="center"
        direction="column"
        maxWidth="xl"
        marginX="auto"
      >
        <Text
          display={{ base: "block", md: "none" }}
          fontSize="2xl"
          fontWeight="semibold"
        >
          {auth.user?.full_name}'s details
        </Text>
        <Box>
          <Flex
            direction="row"
            wrap="wrap"
            width={{ base: "100vw", md: "100%" }}
            paddingX="16"
          >
            <Flex
              w="50%"
              paddingRight="4"
              justifyContent="end"
              alignItems="center"
            >
              <Text>Full Name</Text>
            </Flex>

            <Text w="50%" paddingLeft="4" fontSize="2xl">
              {auth.user?.full_name}
            </Text>

            <Flex
              w="50%"
              paddingRight="4"
              justifyContent="end"
              alignItems="center"
            >
              <Text>Username</Text>
            </Flex>
            <Text w="50%" paddingLeft="4" fontSize="2xl">
              {auth.user?.username}
            </Text>

            <Flex
              w="50%"
              paddingRight="4"
              justifyContent="end"
              alignItems="center"
            >
              <Text>Email</Text>
            </Flex>
            <Text w="50%" paddingLeft="4" fontSize="2xl">
              {auth.user?.email}
            </Text>
          </Flex>

          <Flex justify="center" marginTop="4">
            <Button width="64" onClick={() => NavigateTo("/me/edit")}>
              Edit
            </Button>
          </Flex>
        </Box>
        <Box display={{ base: "block", md: "none" }} />
      </Flex>
    </Flex>
  );
};

export default ProfilePage;
