import { fetchUser } from "@/fetching/fetchData";
import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorMode,
  useToast,
  Modal,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiSliders } from "react-icons/fi";
import { useRouter } from "next/router";

function Dropdown() {
  const { colorMode } = useColorMode();
  const buttonColor = colorMode === "dark" ? "#7289da" : "#3bd1c7";
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const user = async () => {
    // Replace 'fetchData' with your actual fetch function
    const response = await fetchUser();
    return response;
  };

  const useUser = () => {
    const [data, setData] = useState({ user: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const response = await user();
          console.log(response);
          setData(response);
          setIsLoading(false);
        } catch (err) {
          setError(err);
          setIsLoading(false);
        }
      };
      fetchData();
    }, []);

    return { data };
  };

  const { data } = useUser();

  return (
    <div>
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<FiSliders />}
          color={buttonColor}
          variant="ghost"
        >
          Profile
        </MenuButton>
        <MenuList>
          <MenuGroup title={data.username}>
            <MenuItem as="a" href="/profile" title="Profile">
              My Account
            </MenuItem>
          </MenuGroup>
          <MenuItem as="button" onClick={onOpen} variant={"ghost"}>
            <Box>Logout</Box>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Confirmation</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  Are you sure you want to continue with your action?
                </ModalBody>
                <ModalFooter>
                  <Button ml={2} mr={2} onClick={onClose} variant={"outline"}>
                    No
                  </Button>
                  <Button
                    colorScheme="red"
                    variant={"solid"}
                    onClick={() => {
                      sessionStorage.removeItem("accessToken");
                      router.push("/");
                      toast({
                        title: "Logout",
                        description: "You have successfully Logout.",
                        status: "info",
                        duration: 3000,
                        isClosable: true,
                      });
                    }}
                  >
                    Yes
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

export default Dropdown;
