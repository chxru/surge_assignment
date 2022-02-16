import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import type { API } from "@chxru/types";

import { useNotify } from "../contexts/notify-context";
import { useAuth } from "../contexts/auth-context";

import ApiRequest from "../util/request";

const LoginPage: React.FC = () => {
  const [authenticating, setAuthenticating] = useState<boolean>(false);
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<API.Auth.LoginForm>();

  const auth = useAuth();
  const notify = useNotify();

  /**
   * Execute when your click submit button
   *
   * @param {API.Auth.LoginForm} value
   */
  const OnSubmit = async (value: API.Auth.LoginForm) => {
    try {
      setAuthenticating(true);

      const { data, err } = await ApiRequest<API.Auth.PublicUserData>({
        path: "auth/login",
        method: "POST",
        obj: value,
      });

      // if err exists, break the function
      if (err) throw new Error(err);

      // if user data not available
      if (!data) throw new Error("Could not fetch user information");

      notify.success("User login is success!");
      auth.OnSignIn(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        notify.error("Error occurred", error.message);
      } else {
        console.log(error);
        notify.error("Error occurred, please try again later");
      }
    } finally {
      setAuthenticating(false);
    }
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
          Login
        </Text>
      </Flex>

      {/* Form */}
      <Flex
        grow="1"
        height="100vh"
        justify="center"
        alignItems="center"
        direction="column"
        maxWidth="xl"
        marginX="auto"
      >
        <Box
          as="form"
          onSubmit={handleSubmit(OnSubmit)}
          width={{ base: "100%", md: "80", lg: "96" }}
          paddingX={{ base: "8", md: "0" }}
        >
          {/* display only in small displays */}
          <Text
            display={{ base: "block", md: "none" }}
            marginTop="32"
            fontSize="2xl"
            fontWeight="semibold"
          >
            Login
          </Text>

          <FormControl marginTop={{ base: "2", md: "16" }}>
            <FormLabel htmlFor="name">Username or Email</FormLabel>
            <Input
              id="username"
              type="text"
              {...register("username", { required: "true" })}
            />
            {errors.username && (
              <FormHelperText textColor="red.500">
                Username is required
              </FormHelperText>
            )}
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              {...register("pwd", {
                required: true,
                minLength: {
                  value: 6,
                  message: "Password should be at least 6 characters long",
                },
              })}
            />
            {errors.pwd && (
              <FormHelperText textColor="red.500">
                {errors.pwd.message}
              </FormHelperText>
            )}
          </FormControl>

          <ButtonGroup>
            <Button
              colorScheme="teal"
              type="submit"
              marginY="8"
              width="32"
              isLoading={authenticating}
            >
              Login
            </Button>
            <Button
              type="reset"
              marginY="8"
              width="32"
              isDisabled={authenticating}
            >
              Reset
            </Button>
          </ButtonGroup>
        </Box>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
