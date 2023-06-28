import { useState, useEffect } from 'react';
import { postVendor } from '@/fetching/postData';
import { Button, Collapse, Flex, useToast, Table, Tr, Text,  Td, Thead, Heading, Th, Tbody, HStack, Link, Spinner, useColorMode } from '@chakra-ui/react';
import { allVendors } from './allData';
import { useRouter } from 'next/router';
import { FiDivideCircle } from 'react-icons/fi';
import { deleteVendor } from '@/fetching/deleteData';

//parent
const Vendors = () => {
  const {vendors, setVendors, isLoading} = allVendors();

  function handleAddVendor(details) {
    setVendors(prevData => [...prevData, details]);
  }
  


  return(
    <>
    <AddVendorForm handleAddVendor={handleAddVendor}/>
    <RenderVendors vendors={vendors} setVendors={setVendors} isLoading={isLoading}/>
    </>
  )
}

export default Vendors

export const AddVendorForm = ({handleAddVendor}) => {
  const [details, setDetails] = useState({
    name: '',
    country: ''
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
        handleAddVendor(details)
        try {
          await postVendor(
            details.name,
            details.country,
            accessToken
          );
          setDetails({
            name: '',
            country: ''
          });
          toast({
            title: 'Vendor created.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        } catch (err) {
          toast({
            title: 'Failed to create Vendor.',
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
          <Button size="sm" bgColor={buttonColor} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'Cancel' : '+ Vendor'}
          </Button>
          <Collapse in={isOpen} animateOpacity>
            <form onSubmit={handleSubmit}>
              <h3>Name:</h3>{' '}
              <input
                type='text'
                name='name'
                value={details.name}
                onChange={handleChange}
              ></input>
              <h3>Country</h3>{' '}
              <input
                type='text'
                name='country'
                value={details.country}
                onChange={handleChange}
              ></input>
              <Button size="sm" bgColor={buttonColor} type='submit'>Submit</Button>
            </form>
          </Collapse>
        </>
      );
};

export const RenderVendors = ({vendors, setVendors, isLoading}) => {
  const router = useRouter();
  const toast = useToast();
  const [showLoading, setShowLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    let timeoutId;
    if (isLoading) {
      timeoutId = setTimeout(() => {
        setShowLoading(true);
      }, 500);
    }
    return () => clearTimeout(timeoutId);
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      setIsDataLoaded(true);
    }
  }, [isLoading]);




  function renderData(data) {

    return data.map((v) => {

      const handleVendorDetails = (vendorsId) => {
        router.push(`/vendor/${vendorsId}`)
      }


      function handleDelete(vendorsId) {
        const accessToken = sessionStorage.getItem('accessToken');
        deleteVendor(vendorsId, accessToken)
          .then(() => {
            toast({
              title: 'Vendors deleted',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
            setVendors(prevData => prevData.filter(v => v.id !== vendorsId));
          })
          .catch((error) => {
            toast({
              title: 'Error deleting Vendors',
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
        <Tr key={v.id}>
            <Td>
            <HStack>
            <Link
              onClick={() => handleVendorDetails(v.id)}
              _hover={{
                textDecoration: 'glow',
                textShadow: '0 0 8px #fff, 0 0 12px #fff, 0 0 16px #fff',
              }}
            >
              {v.name}
              <Text fontSize="sm" color="gray.500" ml={1} display="inline">
              </Text>
            </Link>
            </HStack>
            </Td>
            <Td>
              {v.country}
            </Td> 

            <Td>
            <Button bgColor={counterColor} leftIcon={<FiDivideCircle />} onClick={() => handleDelete(v.id)}>Delete</Button>
            </Td>
          </Tr>
        );
    })
  }

  const tableBody = isDataLoaded ? renderData(vendors) : null;
  const showSpinner = isLoading && !isDataLoaded;

  return(
    <>
      {showSpinner && (
        <Flex justify="center" mt={8}>
          <Spinner size="xl" />
        </Flex>
      )}
      <Heading as="h2" size="lg" mb="4">
          Vendors List
        </Heading>
        <Table>
          <Thead style={{ position: "sticky", top: 0 }}>
            <Tr>
              <Th>Name</Th>
              <Th>Country</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>{tableBody}</Tbody>
        </Table>
    </>
  )
}