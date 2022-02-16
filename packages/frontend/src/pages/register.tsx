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
import ApiRequest from "../util/request";

interface RegisterForm extends API.Auth.RegisterForm {
  pwd: string;
  re_pwd: string;
}

const RegisterPage: React.FC = () => {
  const [authenticating, setAuthenticating] = useState<boolean>(false);
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
  } = useForm<RegisterForm>();

  /**
   * Execute when your click submit button
   *
   * @param {RegisterForm} value
   */
  const OnSubmit = async (value: RegisterForm) => {
    try {
      setAuthenticating(true);

      const { data, err } = await ApiRequest<API.Auth.PublicUserData>({
        path: "auth/register",
        method: "POST",
        obj: value,
      });

      // if err exists, break the function
      if (err) throw new Error(err);

      console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.log(error);
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
          Register
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
            Register
          </Text>

          <FormControl marginTop={{ base: "2", md: "16" }}>
            <FormLabel htmlFor="name">Full Name</FormLabel>
            <Input
              id="full_name"
              type="text"
              {...register("full_name", { required: "true" })}
            />
            {errors.full_name && (
              <FormHelperText textColor="red.500">
                Full name is required
              </FormHelperText>
            )}
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
            />
            {errors.email && (
              <FormHelperText textColor="red.500">
                {errors.email.message}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="name">Username</FormLabel>
            <Input
              id="username"
              type="text"
              {...register("username", { required: "true" })}
            />
            {errors.username && (
              <FormHelperText textColor="red.500">
                Email is required
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

          <FormControl>
            <FormLabel htmlFor="re_password">Retype Password</FormLabel>
            <Input
              id="re_password"
              type="password"
              marginBottom="4"
              {...register("re_pwd", {
                required: true,
                minLength: {
                  value: 6,
                  message: "Password should be at least 6 characters long",
                },
                validate: {
                  matchesPreviousPassword: (value) => {
                    const { pwd } = getValues();
                    return pwd === value || "Passwords should match!";
                  },
                },
              })}
            />
            {errors.re_pwd && (
              <FormHelperText textColor="red.500">
                {errors.re_pwd.message}
              </FormHelperText>
            )}

            <ButtonGroup>
              <Button
                colorScheme="teal"
                type="submit"
                marginY="8"
                width="32"
                isLoading={authenticating}
              >
                Register
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
          </FormControl>
        </Box>
      </Flex>
    </Flex>
  );
};

export default RegisterPage;
