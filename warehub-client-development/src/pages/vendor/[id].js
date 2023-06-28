import {useState, useEffect} from "react"
import { fetchVendorById } from "@/fetching/fetchById";
import { FiEdit } from "react-icons/fi";
import {
    Box,
    Badge,
    Text,
    Stack,
    Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, FormControl, FormLabel, Input
} from '@chakra-ui/react';
import { updateVendor } from "@/fetching/updateData";

const VendorDetail = ({vendorId}) => {
    const [vendors, setVendors] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [dummyState, setDummyState] = useState(0); // create dummy state

    useEffect(() => {

        const fetchVendor = async () => {
          try {
            const data = await fetchVendorById(vendorId);
            setVendors(data);
            setLoading(false);
          } catch (err) {
            setLoading(true)
          }
        };
        fetchVendor();
      }, [vendorId, dummyState]);

      const handleUpdate = (updatedData) => {
        setDummyState((prevState) => prevState + 1);;
      }
    
      if (isLoading) {
        return <div>Loading...</div>;
      }

      const vendor = vendors.vendor;
    
    return (
        <>
        <VendorDetailCard vendors={vendor}/>
        <VendorUpdateButton vendors={vendor} onUpdate={handleUpdate} />
        </>
    );
};
export default VendorDetail;

export async function getServerSideProps(ctx) {
    const {id} = ctx.query;

    return { props: {vendorId : +id} }
}

//Display Product By id
const VendorDetailCard = ({ vendors }) => {
    return (
        <Stack spacing="2">
        <Box borderWidth="1px" borderRadius="lg" p="4">
            <Text fontSize="lg" fontWeight="bold" mb="4">
            {vendors.name}
            </Text>
            <Text fontSize="sm">{vendors.country}</Text>
                <Stack direction="row" justifyContent="space-between" fontSize="sm" color="gray.500">
                <Text fontWeight="bold">Created Date:</Text>
                <Text>
                    <strong>{new Date(vendors.createdAt).toLocaleString()}</strong>
                </Text>
                </Stack>
                <Stack direction="row" justifyContent="space-between" fontSize="sm" color="gray.500">
                <Text fontWeight="bold">Updated Date:</Text>
                <Text>
                    <strong>{new Date(vendors.updatedAt).toLocaleString()}</strong>
                </Text>
                </Stack>
        </Box>
        </Stack>

    );
};

//Update vendors
const VendorUpdateButton = ({ vendors, onUpdate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
      name: vendors.name,
      country: vendors.country
    });
  
    const handleInputChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    };
  
    const handleUpdate = async (event) => {
      event.preventDefault();
      try {
        const updatedData = await updateVendor(vendors.id, formData);
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
            <ModalHeader>Update Vendor Data</ModalHeader>
            <ModalBody>
              <FormControl id="name" mb={3}>
                <FormLabel>Name</FormLabel>
                <Input name="name" value={formData.name} onChange={handleInputChange} />
              </FormControl>
              <FormControl id="country" mb={3}>
                <FormLabel>Country</FormLabel>
                <Input name="country" value={formData.country} onChange={handleInputChange} />
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