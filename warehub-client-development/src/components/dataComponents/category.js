import { useState } from 'react';
import { postCategory } from '@/fetching/postData';
import { Button, 
  Image, Box, Flex, Center, Grid,
  Collapse, useToast, Text,Heading,Link, useColorMode, useMediaQuery, Input, InputGroup } from '@chakra-ui/react';
import { allCategories } from './allData';
import { FiDivideCircle } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { deleteCategory } from '@/fetching/deleteData';
//parents
const Categories = () => {
  //usage category.categories
  
  const {category, setCategory} = allCategories();

  function handleAddCategory(details) {
    setCategory(prevData => ({
      ...prevData,
      categories: [...prevData.categories, details]
    }));
  }
  
  return (
  <>
    <AddCategoryForm
      category={category}
      handleAddCategory={handleAddCategory}
    />
    <RenderCategory 
      category={category}
      setCategory={setCategory}
    />

  </>)
}

export default Categories


export const AddCategoryForm = ({handleAddCategory}) => {
  const [details, setDetails] = useState({
    name: '',
    description: ''
  })
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setDetails((prev) => {
        return { ...prev, [name]: value};
    });
  };

    
  const handleSubmit = async (e) => {
    const accessToken = sessionStorage.getItem('accessToken');
    e.preventDefault();
    handleAddCategory(details)
    try {
      await postCategory(
        details.name,
        details.description,
        accessToken
      );
      setDetails({
        name: '',
        description: ''
      });
      toast({
        title: 'Category created.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      } catch (err) {
        toast({
          title: 'Failed to create Category.',
          description: err.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
  };
  const {colorMode} = useColorMode();
  const buttonColor = colorMode === 'dark' ? '#7289da' : '#3bd1c7';
  const counterColor = colorMode === 'dark' ? '#da7272' : '#fb997b';
  return (
    <>
       <Button size="sm" bgColor={isOpen ? counterColor : buttonColor} onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? 'Cancel' : 'Add Category'}
       </Button>
      <Collapse in={isOpen} animateOpacity>
        <form onSubmit={handleSubmit}>
          <InputGroup gap={4}>
          <Input
            type='text'
            name='name'
            size="sm"
            variant="filled"
            placeholder='Name'
            value={details.name}
            onChange={handleChange}
          ></Input>
          <Input
            type='text'
            size="sm"
            variant="filled"
            placeholder='Description'
            name='description'
            value={details.description}
            onChange={handleChange}
          ></Input>
          </InputGroup>
          <Button size="sm" bgColor={buttonColor} type='submit'>Submit</Button>
        </form>
      </Collapse>
    </>
  );
};

export const RenderCategory = ({category, setCategory}) => {
  const router = useRouter();
  const toast = useToast();

 

  function renderData(data) {

    return data.categories.map((c) => {
      
      const getRandomUnsplashPhoto = () => {
        const randomId = Math.floor(Math.random() * 1000); // Generate a random photo ID
        return `https://source.unsplash.com/random/?${c.name}&${randomId}`; // Replace with your desired photo size
      };

      const handleCategoryDetails = (categoryId) => {
        router.push(`/category/${categoryId}`)
      }
      function handleDelete(categoryId) {
        const accessToken = sessionStorage.getItem('accessToken');
        deleteCategory(categoryId, accessToken)
          .then(() => {
            toast({
              title: 'Category deleted',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
            setCategory((prevData) => ({ ...prevData, categories: prevData.categories.filter((c) => c.id !== categoryId) }));
          })
          .catch((error) => {
            toast({
              title: 'Error deleting Category',
              description: error.message,
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          });
      }
      const {colorMode} = useColorMode();
      const buttonColor = colorMode === 'dark' ? '#7289da' : '#3bd1c7';
      const counterColor = colorMode === 'dark' ? '#da7272' : '#fb997b';
      return(
        <Box 
          p={4}
          flex="1"
          key={c.id}
          borderWidth="1px"
          borderRadius="lg"
          borderColor={buttonColor}
          overflow="hidden"
          boxShadow="sm"
          maxW="sm"
          maxH="sm"
        >
          <Image src={getRandomUnsplashPhoto()} alt="Random Unsplash Photo" height={200} width="100%" objectFit="cover" />

          <Box p={4}>
            <Flex justify="space-between" align="center" mb={2}>
              <Link
                onClick={() => handleCategoryDetails(c.id)}
                _hover={{
                  textDecoration: 'glow',
                  textShadow: '0 0 8px #fff, 0 0 12px #fff, 0 0 16px #fff',
                }}
              >
                <Text fontSize="xl" textAlign="center" fontWeight="bold" mb={2}>
                  {c.name}
                </Text>
              </Link>
            </Flex>

            <Text fontSize="sm">{c.description}</Text>
              <Flex justify="flex-end">
            <Button
              size="sm"
              leftIcon={<FiDivideCircle />}
              colorScheme="red"
              variant="outline"
              onClick={() => handleDelete(c.id)}
              mt={4}
              
            >
              Delete
            </Button>
            </Flex>
          </Box>
        </Box>
        );
    })
  }

  const categoryBody = renderData(category)
  const [isLargerScreen] = useMediaQuery("(min-width: 600px)");

  return(
    <>
      <Center>
      <Heading as="h2" size="lg" mb="4">
          Category List
        </Heading>
        </Center>
        <Grid
          templateColumns={
            isLargerScreen ? 'repeat(3, 1fr)' : "1fr"
          }
          gap="5"
          maxW="100%"
          mx="auto"
        >
          {categoryBody}
        </Grid>
          
        
    </>
  )
}