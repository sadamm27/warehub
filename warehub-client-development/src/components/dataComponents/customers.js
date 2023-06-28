import { useState, useEffect } from 'react';
import { postCustomer } from '@/fetching/postData';
import { Button, Collapse,Flex, useToast, Table, Tr, Text,  Td, Thead, Heading, Th, Tbody, HStack, Link, Spinner, VStack, useColorMode } from '@chakra-ui/react';
import { allCustomers } from './allData';
import { FiDivideCircle, FiUserPlus } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { deleteCustomer } from '@/fetching/deleteData';
//parents
const Customers = () => {
  const {customers, setCustomers, isLoading, error} = allCustomers();

  function handleAddCustomers(details) {
    setCustomers(prevData => [...prevData, details]);
  }
  return (
  <>
    <AddCustomersForm
      customer={customers}
      handleAddCustomer={handleAddCustomers}
    />
    <RenderCustomer 
      customer={customers}
      setCustomer={setCustomers}
      isLoading={isLoading}
    />

  </>)
}

export default Customers


export const AddCustomersForm = ({handleAddCustomer}) => {
  const [details, setDetails] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    company: '',
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
    handleAddCustomer(details)
    try {
      await postCustomer(
        details.first_name,
        details.last_name,
        details.email,
        details.address,
        details.company,
        accessToken
      );
      setDetails({
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        company: '',
      });
      toast({
        title: 'Customer registered.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      } catch (err) {
        toast({
          title: 'Failed to register customer.',
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
        {isOpen ? 'Cancel' : '+ Customers'}
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <form onSubmit={handleSubmit}>
          <h3>First Name:</h3>{' '}
          <input
            type='text'
            name='first_name'
            value={details.first_name}
            onChange={handleChange}
          ></input>
          <h3>Last Name:</h3>{' '}
          <input
            type='text'
            name='last_name'
            value={details.last_name}
            onChange={handleChange}
          ></input>
          <h3>Email:</h3>{' '}
          <input
            type='text'
            name='email'
            value={details.email}
            onChange={handleChange}
          ></input>
          <h3>Address:</h3>{' '}
          <input
            type='text'
            name='address'
            value={details.address}
            onChange={handleChange}
          ></input>
          <h3>Company:</h3>{' '}
          <input
            type='text'
            name='company'
            value={details.company}
            onChange={handleChange}
          ></input>
          <Button size="sm" bgColor={buttonColor} type='submit'>Submit</Button>
        </form>
      </Collapse>
    </>
  );
};

export const RenderCustomer = ({customer, setCustomer, isLoading}) => {
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
    return data.map((c) => {

      const handleCustomersDetails = (customersId) => {
        router.push(`/customers/${customersId}`)
      }


      function handleDelete(customersId) {
        const accessToken = sessionStorage.getItem('accessToken');
        deleteCustomer(customersId, accessToken)
          .then(() => {
            toast({
              title: 'Customer deleted',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
            setCustomer(prevData => prevData.filter(c => c.id !== customersId));
            
          })
          .catch((error) => {
            toast({
              title: 'Error deleting Customer',
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
        <Tr key={c.id}>
            <Td>
            <HStack>
            <Link
              onClick={() => handleCustomersDetails(c.id)}
              _hover={{
                textDecoration: 'glow',
                textShadow: '0 0 8px #fff, 0 0 12px #fff, 0 0 16px #fff',
              }}
            >
              {c.first_name} {c.last_name}
              <Text fontSize="sm" color="gray.500" ml={1} display="inline">
              </Text>
            </Link>
            </HStack>
            </Td>
            <Td>
              {c.email}
            </Td>
            <Td>
              {c.company}
            </Td> 
            <Td>
            <Button size="sm" bgColor={counterColor}
                leftIcon={<FiDivideCircle />}
                onClick={() => {
                  setTimeout(() => {
                    handleDelete(c.id);
                  }, 500); // add a delay of 500ms before executing the function
                }}
              >
                Delete
              </Button>
            </Td>

          </Tr>
        );
    })
  }

   const tableBody = isDataLoaded ? renderData(customer) : null;
   const showSpinner = isLoading && !isDataLoaded;

  return (
    <>
      {showSpinner && (
      <Flex justify="center" mt={8}>
        <Spinner size="xl" />
      </Flex>
    )}
      <Table size="md" mt={8} variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Company</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableBody}
        </Tbody>
      </Table>
    </>
  );
};

export const LatestCustomer = () => {
  const {customers} = allCustomers();

  const totalCustomers = customers.length;
  const latestCustomer = totalCustomers > 0 ? customers[totalCustomers - 1] : null;

  return(
    
      
        <VStack>
          <HStack>
            <FiUserPlus size={20} />
        <Text>{totalCustomers}</Text>
        </HStack>
        {latestCustomer && (
        <Text as="span" color="green.300">
          + {latestCustomer.first_name} {latestCustomer.last_name} joined the hub
        </Text>
        )}
        </VStack>
      
    
  );

}