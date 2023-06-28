import {useState, useEffect} from "react"
import { fetchCategoryById } from "@/fetching/fetchById";
import { FiEdit } from "react-icons/fi";
import {
    Box,
    Badge, useColorMode,
    Text,
    Stack,
    Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, FormControl, FormLabel, Input
} from '@chakra-ui/react';
import { updateCategory } from "@/fetching/updateData";

const CategoryDetail = ({categoryId}) => {
    const [category, setCategory] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [dummyState, setDummyState] = useState(0); // create dummy state

    useEffect(() => {

        const fetchCategory = async () => {
          try {
            const data = await fetchCategoryById(categoryId);
            setCategory(data);
            setLoading(false);
          } catch (err) {
            setLoading(true)
          }
        };
        fetchCategory();
      }, [categoryId, dummyState]);
      console.log(category)

      const handleUpdate = (updatedData) => {
        setDummyState((prevState) => prevState + 1);;
      }
    
      if (isLoading) {
        return <div>Loading...</div>;
      }
    
    return (
        <>
        <CategoryDetailCard category={category.category}/>
        <CategoryUpdateButton category={category.category} onUpdate={handleUpdate} />
        </>
    );
};
export default CategoryDetail;

export async function getServerSideProps(ctx) {
    const {id} = ctx.query;

    return { props: {categoryId : +id} }
}

//Display Product By id
const CategoryDetailCard = ({ category }) => {
    return (
        <Stack spacing="2">
        <Box borderWidth="1px" borderRadius="lg" p="4">
            <Text fontSize="lg" fontWeight="bold" mb="4">
            {category.name}
            </Text>
            <Text fontSize="sm">{category.description}</Text>
                <Stack direction="row" justifyContent="space-between" fontSize="sm" color="gray.500">
                <Text fontWeight="bold">Created Date:</Text>
                <Text>
                    <strong>{new Date(category.createdAt).toLocaleString()}</strong>
                </Text>
                </Stack>
                <Stack direction="row" justifyContent="space-between" fontSize="sm" color="gray.500">
                <Text fontWeight="bold">Updated Date:</Text>
                <Text>
                    <strong>{new Date(category.updatedAt).toLocaleString()}</strong>
                </Text>
                </Stack>
        </Box>
        </Stack>

    );
};

//Update Category
const CategoryUpdateButton = ({ category, onUpdate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
      name: category.name,
      description: category.description
    });
  
    const handleInputChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    };
  
    const handleUpdate = async (event) => {
      event.preventDefault();
      try {
        const updatedData = await updateCategory(category.id, formData);
        onUpdate(updatedData);
        setIsModalOpen(false);
      } catch (err) {
      }
    };
    const {colorMode} = useColorMode();
    const buttonColor = colorMode === 'dark' ? '#7289da' : '#3bd1c7';
    const counterColor = colorMode === 'dark' ? '#da7272' : '#fb997b';
  
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
            <ModalHeader textAlign="center">Edit Product</ModalHeader>
            <ModalBody>
              <FormControl id="name" mb={3}>
                <FormLabel fontSize="sm">Name</FormLabel>
                <Input size="sm" variant="filled" name="name" value={formData.name} onChange={handleInputChange} />
              </FormControl>
              <FormControl id="description" mb={3}>
                <FormLabel fontSize="sm">Description</FormLabel>
                <Input size="sm" variant="filled" name="description" value={formData.description} onChange={handleInputChange} />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button size="sm" bgColor={buttonColor} mr={3} onClick={handleUpdate}>
                Update
              </Button>
              <Button size="sm" bgColor={counterColor} onClick={() => setIsModalOpen(false)}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
};