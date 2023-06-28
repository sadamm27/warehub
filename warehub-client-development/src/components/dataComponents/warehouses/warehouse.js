import { useState, useEffect } from 'react';
import { postWarehouse } from '@/fetching/postData';
import { Button, Collapse, Flex, useToast, Table, Tr, Text,  Td, Thead, Heading, Th, Tbody, HStack, Link, Spinner, useColorMode } from '@chakra-ui/react';
import { allWarehouses } from '../allData';
import { useRouter } from 'next/router';
import { FiDivideCircle } from 'react-icons/fi';
import { deleteWarehouse } from '@/fetching/deleteData';

//parents
const Warehouses = () => {
  const {warehouses, setWarehouses, isLoading} = allWarehouses();

  function handleAddWarehouse(details) {
    setWarehouses(prevData => [...prevData, details]);
  }
  return(
    <>
      
      <AddWarehouseForm handleAddWarehouse={handleAddWarehouse}/>
      <RenderWarehouses warehouses={warehouses} setWarehouses={setWarehouses} isLoading={isLoading}/>
    </>
  )
}

export default Warehouses;

export const AddWarehouseForm = ({handleAddWarehouse}) => {
  const [details, setDetails] = useState({
    name: '',
    city: '',
    address: ''
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
        handleAddWarehouse(details);
        try {
          await postWarehouse(
            details.name,
            details.city,
            details.address,
            accessToken
          );
          setDetails({
            name: '',
            city: '',
            address: ''
          });
          toast({
            title: 'Warehouse created.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        } catch (err) {
          toast({
            title: 'Failed to create Warehouse.',
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
            {isOpen ? 'Cancel' : '+ Warehouses'}
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
              <h3>city</h3>{' '}
              <input
                type='text'
                name='city'
                value={details.city}
                onChange={handleChange}
              ></input>
              <h3>Address</h3>{' '}
              <input
                type='text'
                name='address'
                value={details.address}
                onChange={handleChange}
              ></input>
              <Button size="sm" bgColor={buttonColor} type='submit'>Submit</Button>
            </form>
          </Collapse>
        </>
      );
};

export const RenderWarehouses = ({warehouses, setWarehouses, isLoading}) => {
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

    return data.map((w) => {

      const handleWarehouseDetail = (warehousesId) => {
        router.push(`/warehouse/${warehousesId}`)
      }


      function handleDelete(warehousesId) {
        const accessToken = sessionStorage.getItem('accessToken');
        deleteWarehouse(warehousesId, accessToken)
          .then(() => {
            toast({
              title: 'Warehouse deleted',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
            setWarehouses(prevData => prevData.filter(w => w.id !== warehousesId));
          })
          .catch((error) => {
            toast({
              title: 'Error deleting Warehouse',
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
        <Tr key={w.id}>
            <Td>
            <HStack>
            <Link
              onClick={() => handleWarehouseDetail(w.id)}
              _hover={{
                textDecoration: 'glow',
                textShadow: '0 0 8px #fff, 0 0 12px #fff, 0 0 16px #fff',
              }}
            >
              {w.name}
              <Text fontSize="sm" color="gray.500" ml={1} display="inline">
              </Text>
            </Link>
            </HStack>
            </Td>
            <Td>
              {w.city}
            </Td> 
            <Td>
              {w.address}
            </Td> 

            <Td>
            <Button size="sm" bgColor={counterColor} leftIcon={<FiDivideCircle />} onClick={() => handleDelete(w.id)}>Delete</Button>
            </Td>
          </Tr>
        );
    })
  }

  const tableBody = isDataLoaded ? renderData(warehouses) : null;
  const showSpinner = isLoading && !isDataLoaded;

  return(
    <>
      {showSpinner && (
        <Flex justify="center" mt={8}>
          <Spinner size="xl" />
        </Flex>
      )}
      <Heading as="h2" size="lg" mb="4">
          Warehouses List
        </Heading>
        <Table>
          <Thead style={{ position: "sticky", top: 0 }}>
            <Tr>
              <Th>Name</Th>
              <Th>City</Th>
              <Th>Address</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>{tableBody}</Tbody>
        </Table>
    </>
  )
}
