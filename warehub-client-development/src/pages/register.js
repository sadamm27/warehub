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
  HStack,
  useToast,
  Image,
  Spacer,
  useColorMode,
  Container,
  Center
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { postRegisterData } from "../fetching/postData";
import { useRouter } from "next/router";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddres] = useState("");
  const [company, setCompany] = useState("");
  const toast = useToast();
  const router = useRouter();
  const {colorMode} = useColorMode();
  const buttonColor = colorMode === 'dark' ? '#7289da' : '#3bd1c7';
  const counterColor = colorMode === 'dark' ? 'ProfileDark.png' : 'ProfileLight.png';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return;
    }
    try {
      await postRegisterData(
        first_name,
        last_name,
        email,
        username,
        password,
        address,
        company
      );
      toast({
        title: "Registered",
        description: "You have successfully registered.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/");
    } catch (e) {
      const error = new Error(e);
      toast({
        title: "An error occurred.",
        description: error?.message || "An error occurred. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container>
     <HStack>
      
        <Image src={counterColor}/>
     
      
 
    
      <Stack spacing={8} mx={"auto"} maxW={"lg"} px={6}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "#1A202C")}
          boxShadow={"lg"}
          p={8}
        >
          <Box rounded={"lg"} boxShadow={"lg"} p={2}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                Registration
              </Heading>
              <Text
                fontSize={"lg"}
                color={useColorModeValue("gray.700", "white")}
              >
                to enjoy all of our cool features ✌️
              </Text>
            </Stack>
          </Box>
          <Stack spacing={2} pt={6}>
            <Flex>
              <Box>
                <FormControl id="firstName" isRequired>
                  <Input
                    type="text"
                    variant="flushed"
                    placeholder="First Name"
                    onChange={(e) => setFirst_Name(e.target.value)}
                  />
                </FormControl>
              </Box>
              <Spacer />
              <Box>
                <FormControl id="lastName">
                  <Input
                    type="text"
                    variant="flushed"
                    placeholder="Last Name"
                    onChange={(e) => setLast_Name(e.target.value)}
                  />
                </FormControl>
              </Box>
            </Flex>
            <FormControl id="email" isRequired>
              <Input
                type="email"
                variant="flushed"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <Input
                type="text"
                variant="flushed"
                placeholder="User Name"
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>

            <HStack>
              <FormControl id="password" isRequired>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    variant="flushed"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement h={"full"}>
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

              <FormControl id="password" isRequired>
                <InputGroup>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    variant="flushed"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />

                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowConfirmPassword(
                          (showConfirmPassword) => !showConfirmPassword
                        )
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </HStack>
            {password !== confirmPassword && (
              <Text fontSize="xs" color="red.500">
                The password does not match
              </Text>
            )}

            <FormControl isRequired>
              <Input
                type="text"
                variant="flushed"
                placeholder="Address"
                onChange={(e) => setAddres(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <Input
                type="text"
                variant="flushed"
                placeholder="Company"
                onChange={(e) => setCompany(e.target.value)}
              />
            </FormControl>

            <Stack spacing={10}>
              <Button
                onClick={handleSubmit}
                loadingText="Submitting"
                size="lg"
                bg={buttonColor}
                color={"white"}
                _hover={{
                  bg: "teal.900",
                }}
              >
                Submit
              </Button>
            </Stack>
            <Stack>
              <Text align={"center"}>
                Already a user?{" "}
                <Link href={"/"} color={"blue.400"}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    
  
    </HStack>
    </Container>
  );
};

export default Register;
