import {useState, useEffect} from "react"
import { fetchCustomerById } from "@/fetching/fetchById";
import { FiEdit } from "react-icons/fi";
import {
    Box,
    Badge,
    Text,
    Stack,
    Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, FormControl, FormLabel, Input
} from '@chakra-ui/react';
import { updateCustomer } from "@/fetching/updateData";

const CustomersDetail = ({customersId}) => {
    const [customers, SetCustomers] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [dummyState, setDummyState] = useState(0); // create dummy state

    useEffect(() => {

        const fetchCustomer = async () => {
          try {
            const data = await fetchCustomerById(customersId);
            SetCustomers(data);
            setLoading(false);
          } catch (err) {
            setLoading(true)
          }
        };
        fetchCustomer();
      }, [customersId, dummyState]);
      

      const handleUpdate = (updatedData) => {
        setDummyState((prevState) => prevState + 1);;
      }
    
      if (isLoading) {
        return <div>Loading...</div>;
      }
    
    
    return (
        <>
        <CustomersDetailCard customers={customers}/>
        <CustomersUpdateButton customers={customers} onUpdate={handleUpdate} />
        </>
    );
};
export default CustomersDetail;

export async function getServerSideProps(ctx) {
    const {id} = ctx.query;

    return { props: {customersId : +id} }
}

//Display Product By id
const CustomersDetailCard = ({ customers }) => {
    return (
        <Stack spacing="2">
        <Box borderWidth="1px" borderRadius="lg" p="4">
            <Text fontSize="lg" fontWeight="bold" mb="4">
            {customers.first_name} {customers.last_name}
            </Text>
            <Text fontSize="sm">{customers.email}</Text>
            <Text fontSize="sm">{customers.address}</Text>
            <Text fontSize="sm">{customers.company}</Text>
                <Stack direction="row" justifyContent="space-between" fontSize="sm" color="gray.500">
                <Text fontWeight="bold">Registered:</Text>
                <Text>
                    <strong>{new Date(customers.createdAt).toLocaleString()}</strong>
                </Text>
                </Stack>
                <Stack direction="row" justifyContent="space-between" fontSize="sm" color="gray.500">
                <Text fontWeight="bold">Updated:</Text>
                <Text>
                    <strong>{new Date(customers.updatedAt).toLocaleString()}</strong>
                </Text>
                </Stack>
        </Box>
        </Stack>

    );
};

//Update customers
const CustomersUpdateButton = ({ customers, onUpdate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
      first_name: customers.first_name,
      last_name: customers.last_name,
      email : customers.email,
      address: customers.address,
      company : customers.company

    });
  
    const handleInputChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    };
  
    const handleUpdate = async (event) => {
      event.preventDefault();
      try {
        const updatedData = await updateCustomer(customers.id, formData);
        onUpdate(updatedData);
        setIsModalOpen(false);
      } catch (err) {
      }
    };
  
    return (
      <>
        <Box
        as={FiEdit}
        cursor="pointer"
        fontSize="xl"
        onClick={() => setIsModalOpen(true)}
      />
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Customer's Data</ModalHeader>
            <ModalBody>
              <FormControl id="name" mb={3}>
                <FormLabel>First Name</FormLabel>
                <Input name="first_name" value={formData.first_name} onChange={handleInputChange} />
              </FormControl>
              <FormControl id="last_name" mb={3}>
                <FormLabel>Last Name</FormLabel>
                <Input name="last_name" value={formData.last_name} onChange={handleInputChange} />
              </FormControl>
              <FormControl id="email" mb={3}>
                <FormLabel>Email</FormLabel>
                <Input name="email" value={formData.email} onChange={handleInputChange} />
              </FormControl>
              <FormControl id="address" mb={3}>
                <FormLabel>Address</FormLabel>
                <Input name="address" value={formData.address} onChange={handleInputChange} />
              </FormControl>
              <FormControl id="company" mb={3}>
                <FormLabel>Company</FormLabel>
                <Input name="company" value={formData.company} onChange={handleInputChange} />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
                Update
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
};