import {
  Flex,
  Heading,
  Input,
  Button,
  Text,
  FormControl,
  InputGroup,
  InputRightElement,
  Stack,
  useColorModeValue,
  Box,
  Link,
  useToast,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { postLoginData } from "@/fetching/postData";
import { useRouter } from "next/router";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
// import Link from "next/link";

const LoginPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const { colorMode } = useColorMode();
  const buttonColor = colorMode === "dark" ? "#7289da" : "#3bd1c7";
  const counterColor = colorMode === "dark" ? "#da7272" : "#fb997b";

  const handleSubmit = (e) => {
    e.preventDefault();

    postLoginData(username, password)
      .then((data) => {
        const { token } = data;
        sessionStorage.setItem("accessToken", token);
        router.push("/dashboard");
        toast({
          title: "Login",
          description: "You have successfully Login.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        const error = new Error(e);
        toast({
          title: "An error occurred.",
          description: error?.message || "An error occurred. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex
      minH={"80vh"}
      top="100px"
      left="35%"
      position={"fixed"}
      onClose={onClose}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "#1A202C")}
          boxShadow={"lg"}
          p={8}
        >
          <Box rounded={"lg"} p={4}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Login</Heading>
            </Stack>
          </Box>

          <Stack spacing={4} pt={6}>
            <FormControl>
              <InputGroup>
                <Input
                  variant="flushed"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  variant="flushed"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Stack spacing={10}>
              <Button
                onClick={handleSubmit}
                mb={6}
                bgColor={buttonColor}
                size="sm"
              >
                Login
              </Button>
            </Stack>
          </Stack>
          <Stack>
            <Text size="xs" align={"center"}>
              Doesn't have an account?{" "}
              <Link size="sm" href="/register" color="blue.400">
                Register
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginPage;
