import {useState, useEffect} from "react"
import { fetchWarehouseById } from "@/fetching/fetchById";
import { FiEdit } from "react-icons/fi";
import {
    Box,
    Badge,
    Text,
    Stack,
    Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, FormControl, FormLabel, Input
} from '@chakra-ui/react';
import { updateWarehouse } from "@/fetching/updateData";

const WarehouseDetail = ({warehouseId}) => {
    const [warehouse, setWarehouse] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [dummyState, setDummyState] = useState(0); // create dummy state

    useEffect(() => {

        const fetchWarehouse = async () => {
          try {
            const data = await fetchWarehouseById(warehouseId);
            setWarehouse(data);
            setLoading(false);
          } catch (err) {
            setLoading(true)
          }
        };
        fetchWarehouse();
      }, [warehouseId, dummyState]);

      const handleUpdate = (updatedData) => {
        setDummyState((prevState) => prevState + 1);;
      }
    
      if (isLoading) {
        return <div>Loading...</div>;
      }
    
    return (
        <>
        <WarehouseDetailCard warehouse={warehouse}/>
        <WarehouseUpdateButton warehouse={warehouse} onUpdate={handleUpdate} />
        </>
    );
};
export default WarehouseDetail;

export async function getServerSideProps(ctx) {
    const {id} = ctx.query;

    return { props: {warehouseId : +id} }
}

//Display Product By id
const WarehouseDetailCard = ({ warehouse }) => {
    return (
        <Stack spacing="2">
        <Box borderWidth="1px" borderRadius="lg" p="4">
            <Text fontSize="lg" fontWeight="bold" mb="4">
            {warehouse.name}
            </Text>
            <Text fontSize="sm">{warehouse.city}</Text>
            <Text fontSize="sm">{warehouse.address}</Text>
                <Stack direction="row" justifyContent="space-between" fontSize="sm" color="gray.500">
                <Text fontWeight="bold">Created Date:</Text>
                <Text>
                    <strong>{new Date(warehouse.createdAt).toLocaleString()}</strong>
                </Text>
                </Stack>
                <Stack direction="row" justifyContent="space-between" fontSize="sm" color="gray.500">
                <Text fontWeight="bold">Updated Date:</Text>
                <Text>
                    <strong>{new Date(warehouse.updatedAt).toLocaleString()}</strong>
                </Text>
                </Stack>
        </Box>
        </Stack>

    );
};

//Update warehouse
const WarehouseUpdateButton = ({ warehouse, onUpdate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
      name: warehouse.name,
      city: warehouse.city,
      address: warehouse.address
    });
  
    const handleInputChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    };
  
    const handleUpdate = async (event) => {
      event.preventDefault();
      try {
        const updatedData = await updateWarehouse(warehouse.id, formData);
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
            <ModalHeader>Update Warehouse Data</ModalHeader>
            <ModalBody>
              <FormControl id="name" mb={3}>
                <FormLabel>Name</FormLabel>
                <Input name="name" value={formData.name} onChange={handleInputChange} />
              </FormControl>
              <FormControl id="city" mb={3}>
                <FormLabel>City</FormLabel>
                <Input name="city" value={formData.city} onChange={handleInputChange} />
              </FormControl>
              <FormControl id="address" mb={3}>
                <FormLabel>address</FormLabel>
                <Input name="address" value={formData.address} onChange={handleInputChange} />
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