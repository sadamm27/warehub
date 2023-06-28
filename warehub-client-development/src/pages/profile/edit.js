import { updateUser } from "@/fetching/updateData";
import { Box, Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useColorMode, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";

export const EditForm = ({data}) => {
    const {id,first_name,last_name,email,username,password,address,company} = data
    const [updatedData, setupdatedData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
        address: "",
        company: ""
      });
  


  const handleOpenModal = () => {
    setIsOpen(true);
    try {
        setupdatedData({
          first_name: first_name,
          last_name: last_name,
          email: email,
          username: username,
          address: address,
          company: company
        });
      } catch (err) {
        toast({
          title: "Failed to create product.",
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    // handleAddProduct(send);
    try {
      await updateUser (
        updatedData
      );
      setupdatedData({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
        address: "",
        company: ""
      });
      handleCloseModal();
      toast({
        title: "Berhasil Diubah.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Failed to Edit Profile.",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setupdatedData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleImageChange = (e) => {
    setDetails((prev) => {
      return { ...prev, image: e.target.files[0] };
    });
  };
  const { colorMode } = useColorMode();
  const buttonColor = colorMode === "dark" ? "#7289da" : "#3bd1c7";
  const counterColor = colorMode === "dark" ? "#da7272" : "#fb997b";
  return (
    <Box>
      <Button
        size="sm"
        bgColor={buttonColor}
        leftIcon={<FiEdit />}
        onClick={handleOpenModal}
      >
        Edit Profile
      </Button>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Edit Profile</ModalHeader>
          <ModalBody>
            <Input
              size="sm"
              placeholder="first_name"
              name="first_name"
              value={updatedData.first_name}
              onChange={handleChange}
              mb={4}
            />
            <Input
              size="sm"
              placeholder="last_name"
              name="last_name"
              value={updatedData.last_name}
              onChange={handleChange}
              mb={4}
            />
            <Input
              size="sm"
              placeholder="username"
              name="username"
              value={updatedData.username}
              onChange={handleChange}
              mb={4}
            />
            <Input
              size="sm"
              placeholder="email"
              name="email"
              value={updatedData.email}
              onChange={handleChange}
              mb={4}
            />
            <Input
              size="sm"
              placeholder="company"
              name="company"
              value={updatedData.company}
              onChange={handleChange}
              mb={4}
            />
            <Input
              size="sm"
              placeholder="address"
              name="address"
              value={updatedData.address}
              onChange={handleChange}
              mb={4}
            />
          </ModalBody>
          <ModalFooter>
            <Button size="sm" bgColor={buttonColor} onClick={handleSubmit}>
              Submit
            </Button>
            <Button
              size="sm"
              bgColor={counterColor}
              onClick={handleCloseModal}
              ml={2}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
