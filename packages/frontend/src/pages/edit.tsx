import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Input,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { useAuth } from "../contexts/auth-context";
import { useNotify } from "../contexts/notify-context";

import ApiRequest from "../util/request";

import { API } from "@chxru/types";

const EditInfoSection: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { user, UpdateUser } = useAuth();
  const notify = useNotify();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<API.User.EditInfoForm>({
    defaultValues: {
      username: user?.username,
      full_name: user?.full_name,
      email: user?.email,
    },
  });

  const EditInfoSubmit = async (value: API.User.EditInfoForm) => {
    setLoading(true);

    try {
      const { data, err } = await ApiRequest<API.Auth.PublicUserData>({
        path: "user/edit",
        method: "POST",
        obj: value,
      });

      if (err) {
        throw new Error(err);
      }

      if (!data) {
        throw new Error("No user data received");
      }

      UpdateUser(data);
      notify.success("User data successfully updated");
    } catch (error) {
      if (error instanceof Error) {
        notify.error("Error occurred while updating user data", error.message);
      } else {
        notify.error("Error occurred while updating user data");
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit(EditInfoSubmit)}>
      <Flex
        direction="row"
        wrap="wrap"
        width={{ base: "100vw", md: "100%" }}
        paddingX="16"
      >
        <Flex w="50%" paddingRight="4" justifyContent="end" alignItems="center">
          <Text>Full Name</Text>
        </Flex>

        <FormControl w="50%" paddingLeft="4" fontSize="2xl">
          <Input
            id="full_name"
            type="text"
            {...register("full_name", { required: "true" })}
          />
          {errors.full_name && (
            <FormHelperText textColor="red.500">
              Full name cannot be empty
            </FormHelperText>
          )}
        </FormControl>

        <Flex w="50%" paddingRight="4" justifyContent="end" alignItems="center">
          <Text>Username</Text>
        </Flex>

        <FormControl w="50%" paddingLeft="4" fontSize="2xl">
          <Input
            id="username"
            type="text"
            {...register("username", { required: "true" })}
          />
          {errors.username && (
            <FormHelperText textColor="red.500">
              Username cannot be empty
            </FormHelperText>
          )}
        </FormControl>

        <Flex w="50%" paddingRight="4" justifyContent="end" alignItems="center">
          <Text>Email</Text>
        </Flex>

        <FormControl w="50%" paddingLeft="4" fontSize="2xl">
          <Input
            id="email"
            type="text"
            {...register("email", { required: "true" })}
          />
          {errors.email && (
            <FormHelperText textColor="red.500">
              Email cannot be empty
            </FormHelperText>
          )}
        </FormControl>
      </Flex>

      <Flex justify="center" marginTop="4" marginBottom="8">
        <Button width="64" type="submit" isLoading={loading}>
          Save Edits
        </Button>
      </Flex>
    </Box>
  );
};

const EditPwdSection: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const notify = useNotify();

  interface PwdChangeForm extends API.User.ChangePasswordForm {
    re_pwd: string;
  }

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
  } = useForm<PwdChangeForm>();

  const ChangePwdSubmit = async (value: PwdChangeForm) => {
    setLoading(true);

    try {
      const { err } = await ApiRequest<API.Auth.PublicUserData>({
        path: "user/pwd",
        method: "POST",
        obj: value,
      });

      if (err) {
        throw new Error(err);
      }

      notify.success("User password successfully updated");
    } catch (error) {
      if (error instanceof Error) {
        notify.error(
          "Error occurred while updating user password",
          error.message
        );
      } else {
        notify.error("Error occurred while updating user password");
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit(ChangePwdSubmit)}>
      <Flex
        direction="row"
        wrap="wrap"
        width={{ base: "100vw", md: "100%" }}
        paddingX="16"
      >
        <Flex w="50%" paddingRight="4" justifyContent="end" alignItems="center">
          <Text>Old Password</Text>
        </Flex>

        <FormControl w="50%" paddingLeft="4" fontSize="2xl">
          <Input
            id="old_pwd"
            type="password"
            {...register("old_pwd", {
              required: "true",
              minLength: {
                value: 6,
                message: "Password should be at least 6 characters long",
              },
            })}
          />
          {errors.old_pwd && (
            <FormHelperText textColor="red.500">
              {errors.old_pwd.message}
            </FormHelperText>
          )}
        </FormControl>

        <Flex w="50%" paddingRight="4" justifyContent="end" alignItems="center">
          <Text>New Password</Text>
        </Flex>

        <FormControl w="50%" paddingLeft="4" fontSize="2xl">
          <Input
            id="new_pwd"
            type="password"
            {...register("new_pwd", {
              required: "true",
              minLength: {
                value: 6,
                message: "Password should be at least 6 characters long",
              },
            })}
          />
          {errors.new_pwd && (
            <FormHelperText textColor="red.500">
              {errors.new_pwd.message}
            </FormHelperText>
          )}
        </FormControl>

        <Flex w="50%" paddingRight="4" justifyContent="end" alignItems="center">
          <Text>Retype Password</Text>
        </Flex>

        <FormControl w="50%" paddingLeft="4" fontSize="2xl">
          <Input
            id="re_pwd"
            type="password"
            {...register("re_pwd", {
              required: "true",
              minLength: {
                value: 6,
                message: "Password should be at least 6 characters long",
              },
              validate: {
                matchesPreviousPassword: (value) => {
                  const { new_pwd } = getValues();
                  return new_pwd === value || "Passwords should match!";
                },
              },
            })}
          />
          {errors.re_pwd && (
            <FormHelperText textColor="red.500">
              {errors.re_pwd.message}
            </FormHelperText>
          )}
        </FormControl>
      </Flex>

      <Flex justify="center" marginTop="4">
        <Button width="64" colorScheme="teal" type="submit" isLoading={loading}>
          Change Password
        </Button>
      </Flex>
    </Box>
  );
};

const ProfileEditPage: React.FC = () => {
  const auth = useAuth();

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
          Edit
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
          Edit {auth.user?.full_name}'s details
        </Text>
        <Box>
          <EditInfoSection />

          <EditPwdSection />
        </Box>
        <Box display={{ base: "block", md: "none" }} />
      </Flex>
    </Flex>
  );
};

export default ProfileEditPage;
