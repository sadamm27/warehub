import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { postProduct, postStock, bulkInsertProducts, moveProduct } from '@/fetching/postData';
import { InputGroup, IconButton, Stack,ModalFooter, useMediaQuery ,HStack, useToast, Link, FormControl, FormLabel, Text, Button, Card, Box, Input, Flex,Table, Thead, Tbody, Tr, Th, Td, Select, Heading, Badge, Image, useColorMode, VStack, Spinner} from "@chakra-ui/react";
import { allProducts, allVendors, allWarehouses, allCategories} from '../allData';
import { FiSearch,FiUpload, FiPlus, FiArrowLeft, FiArrowRight
 ,FiCircle,
 FiArrowUpRight,
 FiDelete,
 FiMove}  from 'react-icons/fi';
import { deleteProduct } from '@/fetching/deleteData';
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, Accordion
,ModalBody,AccordionItem,AccordionButton,AccordionIcon,AccordionPanel, Icon } from '@chakra-ui/react';
//Parent
function Product() {
  const [dummyState, setDummyState] = useState(0); // Create dummy state
  
  const [filters, setFilters] = useState({
    warehouse_id: '',
    category_id: '',
    vendor_id: '',
    page: 1,
    limit: 5,
    q: '',
    sort: ''
  });
  const { data, setData} = allProducts({ filters, dummyState });
  const { totalItems, totalPages} = data;
  const { warehouses } = allWarehouses();

  function handleAddProduct(details) {
    setData(prevData => ({
      ...prevData,
      products: [...prevData.products, details]
    }));
    setDummyState(prevState => prevState + 1); // Update dummy state
  }

  function handleApplyFilters() {
    setDummyState(prevState => prevState + 1);
  }

  const { vendors } = allVendors();
  const { category} = allCategories();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
 


  return(
    <Box flex="1">
      {isLargerThan768 ? (
        <HStack justify="space-between">
          <AddProductForm category={category} handleAddProduct={handleAddProduct} />
          <VStack>
            <AddStockForm
              data={data}
              setData={setData}
              handleAddProduct={handleAddProduct}
              warehouses={warehouses}
              vendors={vendors}
            />
            <MoveStocks data={data} warehouse={warehouses} />
          </VStack>
        </HStack>
      ) : (
        <Stack spacing={4}>
          <AddProductForm category={category} handleAddProduct={handleAddProduct} />
          <AddStockForm
            data={data}
            setData={setData}
            handleAddProduct={handleAddProduct}
            warehouses={warehouses}
            vendors={vendors}
          />
          <MoveStocks data={data} warehouse={warehouses} />
        </Stack>
      )}

      <FilterForm
        filters={filters}
        setFilters={setFilters}
        handleApplyFilters={handleApplyFilters}
        warehouses={warehouses}
        vendors={vendors}
        category={category}
        pageOptions={Array.from({ length: totalPages }, (_, i) => i + 1)}
        totalItems={totalItems}
        data={data}
        setData={setData}
      />
    </Box>
  );
  
}
export default Product;

//Add Product

export const AddProductForm = ({ handleAddProduct, category }) => {
  const [details, setDetails] = useState({
    name: '',
    price: '',
    weight: '',
    size: '',
    description: '',
    SKU: '',
    category_id: 1,
    image: ''
  })
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();
  
  const handleSubmit = async (e) => {
    const accessToken = sessionStorage.getItem('accessToken');
      e.preventDefault();
      handleAddProduct(details);
      try {
        await postProduct(
          details.name,
          details.price,
          details.weight,
          details.size,
          details.description,
          details.SKU,
          details.category_id,
          details.image,
          accessToken
        );
        setDetails({
          name: '',
          price: 0,
          weight: 0,
          size: '',
          description: '',
          SKU: '',
          category_id: 0,
          image: ''
        });
        handleCloseModal();
        toast({
          title: 'Product created.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        } catch (err) {
          toast({
            title: 'Failed to create product.',
            description: err.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setDetails((prev) => {
        return { ...prev, [name]: value};
    });
  };

  const handleImageChange = (e) => {
    setDetails((prev) => {
      return { ...prev, image: e.target.files[0] };
    });
  };
  const {colorMode} = useColorMode();
  const buttonColor = colorMode === 'dark' ? '#7289da' : '#3bd1c7';
  const counterColor = colorMode === 'dark' ? '#da7272' : '#fb997b';
  return (
    <Box>
          <Button size="sm" bgColor={buttonColor} leftIcon={<FiPlus/>} onClick={handleOpenModal}>
            Add Product
          </Button>
            <Modal isOpen={isOpen} onClose={handleCloseModal}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader textAlign="center">Create Product</ModalHeader>
                <ModalBody>

            <Input
              size="sm"
              placeholder="Name"
              name="name"
              value={details.name}
              onChange={handleChange}
              mb={4}
            />
            <Input
              size="sm"
              placeholder="Price"
              name="price"
              value={details.price}
              onChange={handleChange}
              mb={4}
            />
            <Input
              size="sm"
              placeholder="Weight"
              name="weight"
              value={details.weight}
              onChange={handleChange}
              mb={4}
            />
            <Input
              size="sm"
              placeholder="Size"
              name="size"
              value={details.size}
              onChange={handleChange}
              mb={4}
            />
            <Input
              size="sm"
              placeholder="Description"
              name="description"
              value={details.description}
              onChange={handleChange}
              mb={4}
            />
            <Input
              size="sm"
              placeholder="SKU"
              name="SKU"
              value={details.SKU}
              onChange={handleChange}
              mb={4}
            />
            <Select
              variant="filled"
              size="sm"
              placeholder="category"
              name="category_id"
              value={details.category_id}
              onChange={handleChange}
              mb={4}
            >
              {category.categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
            <Input
              variant="filled"
              size="sm"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              mb={4}
            />
            </ModalBody>
            <ModalFooter>
            <Button size="sm" bgColor={buttonColor} onClick={handleSubmit}>
              Submit
            </Button>
            <Button size="sm" bgColor={counterColor} onClick={handleCloseModal} ml={2}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

//Bulk Add Product
export const BulkInsertForm = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const {colorMode} = useColorMode();

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = sessionStorage.getItem('accessToken');
    setIsLoading(true);
    try {
      await bulkInsertProducts(file, accessToken);
      setFile(null);
      toast({
        title: 'Bulk insert successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Failed to perform bulk insert',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };
  const buttonCollor = colorMode === 'dark' ? '#7289da' : '#3bd1c7';
  const imageUrl = colorMode === 'dark' ? 'darkBulk.png' : 'https://img.freepik.com/free-vector/checking-boxes-concept-illustration_114360-2465.jpg?w=740&t=st=1684387560~exp=1684388160~hmac=e225f2314b5666af1ce71c24159d0e45587d38a74f171444232d2e4243fef2a1'

  return (
    <>
      <Button backgroundColor={buttonCollor} size="sm" variant="filled" onClick={onOpen}>
        Bulk Insert
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Bulk Insert Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div style={{ display: 'flex' }}>
              <img src={imageUrl}/>
              <div>
                <Accordion defaultIndex={[0]} allowMultiple>
                  <AccordionItem>
                    <AccordionButton>
                      <Box flex="1" textAlign="left" colorScheme="teal">
                        Data Format
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      The data in the file should be formatted in a specific way, you can see the example on product list page
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Data Validation
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      Validate the data for any required fields, constraints, or business rules...
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                      Error Handling
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      Don't worry any invalid data would cancel out every insertion
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <FormControl mt={4}>
                <FormLabel htmlFor="file">
                  <Icon as={FiUpload} boxSize={6} mr={2} />
                </FormLabel>
                <Input  size="sm" variant="filled" type="file" id="file" accept=".csv" onChange={handleChange} />
              </FormControl>
              <Button  size="sm" variant="filled" type="submit" justifyContent="center" backgroundColor={buttonCollor} mt={4} isLoading={isLoading} loadingText="Uploading">
                Upload
              </Button>
            </form>

          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

//Add Stock Form
export const AddStockForm = ({ data, setData, warehouses, vendors, handleAddProduct }) => {
  //data needed: products , vendors, warehouses
    
    const toast = useToast();
    const [isOpen, setIsOpen] = useState(false);
    
    const [details, setDetails] = useState({
      product_id: 1,
      quantity: 1,
      vendor_id: 1,
      warehouse_id: 1
    })
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      if (value === '') {
        setDetails((prev) => ({ ...prev, [name]: 0 }));
      } else {
        const quantity = parseInt(value);
        setDetails((prev) => ({ ...prev, [name]: quantity }));
      }
    };
    
    const handleSubmit = async (e) => {
        const accessToken = sessionStorage.getItem('accessToken');
          e.preventDefault();
          handleAddProduct(details);
          try {
            await postStock(
              details.product_id,
              details.quantity,
              details.vendor_id,
              details.warehouse_id,
              accessToken
            );
            setDetails({
              product_id: 0,
              quantity: 1,
              vendor_id: 0,
              warehouse_id: 0
            });
            setData(prevData => ({
              ...prevData,
              products: [...prevData.products, details]
            }));
            handleCloseModal();
            toast({
              title: 'Stocks Added.',
              status: 'success',
              duration: 5000,
              isClosable: true,
            });
            handleCloseModal();
          } catch (err) {
            toast({
              title: 'Failed to add stocks.',
              description: err.message,
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          }
      };

      const handleOpenModal = () => {
        setIsOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsOpen(false);
      };

      const {colorMode} = useColorMode();
      const buttonColor = colorMode === 'dark' ? '#7289da' : '#3bd1c7';
      const counterColor = colorMode === 'dark' ? '#da7272' : '#fb997b';
    return (
          <Box>
      <Button size="sm" bgColor={buttonColor} leftIcon={<FiArrowUpRight/>} onClick={handleOpenModal}>
        Add Stocks
      </Button>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Stock Form</ModalHeader>
          <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel>Product</FormLabel>
              <Select
              size="sm" variant="filled"
                name="product_id"
                value={details.product_id}
                onChange={handleChange}
              >
                {data.products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Quantity</FormLabel>
              <Input
              size="sm" variant="filled"
                type="text"
                name="quantity"
                value={details.quantity}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Vendor</FormLabel>
              <Select
               size="sm" variant="filled"
                name="vendor_id"
                value={details.vendor_id}
                onChange={handleChange}
              >
                {vendors.map((vendor) => (
                  <option key={vendor.id} value={vendor.id}>
                    {vendor.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Warehouse</FormLabel>
              <Select
               size="sm" variant="filled"
                name="warehouse_id"
                value={details.warehouse_id}
                onChange={handleChange}
              >
                {warehouses.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </form>
          </ModalBody>
          <ModalFooter>
            <Button size="sm" variant="filled" bgColor={buttonColor} onClick={handleSubmit}>
              Submit
            </Button>
            <Button size="sm" variant="filled" bgColor={counterColor} onClick={handleCloseModal} ml={2}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

//filter and render component
function FilterForm({ filters, setFilters, warehouses, vendors, category, totalItems, handleApplyFilters, pageOptions, data, setData}) {
  //category.categories
  const [updatedFilters, setUpdatedFilters] = useState(filters);
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const limitOptions = [
    { label: "5", value: 5 },
    { label: "10", value: 10 },
    { label: "15", value: 15 },
    { label: "20", value: 20 },
  ];

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === 'page') {
      onPageChange({ ...filters, [name]: value });
    } else {
      setUpdatedFilters(prevFilters => ({
        ...prevFilters,
        [name]: value
      }));
    }
  };
  
  function handleSubmit(e) {
    e.preventDefault();
    setFilters(updatedFilters);
    handleApplyFilters();
    handleCloseModal();
  }

  const handleClearFilters = () => {
    setFilters({ q: "", warehouse_id: "", category_id: "", vendor_id: "", page: 1, sort: ''});
    setUpdatedFilters({ q: "", warehouse_id: "", category_id: "", vendor_id: "", page: 1, sort: ''});
    document.getElementsByName("warehouse_id")[0].selectedIndex = 0;
    document.getElementsByName("category_id")[0].selectedIndex = 0;
    document.getElementsByName("vendor_id")[0].selectedIndex = 0;
    document.getElementById("q").value = "";
    document.getElementById("sort")[0].selectedIndex = 0;

  };
  

  const {colorMode} = useColorMode();
  const buttonColor = colorMode === 'dark' ? '#7289da' : '#3bd1c7';
  const counterColor = colorMode === 'dark' ? '#da7272' : '#fb997b';
  function renderProduct(data, destinationWarehouse) {
    const [isOpen, setIsOpen] = useState(false);

    return data.map((p) => {
      const warehousesForProduct = p.Warehouses ? p.Warehouses.map((w) => ({
        id: p.id,
        name: w.name,
        WarehouseStock: w.WarehouseStock,
      })) : [];

      const totalQuantity = warehousesForProduct.reduce((acc, w) => acc + w.WarehouseStock.quantity, 0);

      const vendorsForProduct = p.Vendors ? p.Vendors.map((v) => ({
        id: p.id,
        name: v.name,
      })) : [];

      const warehouseSelect =
        warehousesForProduct.length > 1 ? (
          <Select variant="outline">
            {warehousesForProduct.map((w) => (
              <option key={w.name}>
                {w.name} Q({w.WarehouseStock.quantity})
              </option>
            ))}
          </Select>
        ) : (
          <span>
            {warehousesForProduct[0]?.name} ({warehousesForProduct[0]?.WarehouseStock.quantity})
          </span>
        );

      const vendorSelect =
        vendorsForProduct.length > 1 ? (
          <Select variant="outline">
            {vendorsForProduct.map((v) => (
              <option key={v.name}>{v.name}</option>
            ))}
          </Select>
        ) : (
          <span>{vendorsForProduct[0]?.name}</span>
        );


        function handleDelete(productId) {
          const accessToken = sessionStorage.getItem('accessToken');
          deleteProduct(productId, accessToken)
            .then(() => {
              toast({
                title: 'Product deleted',
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
              setData((prevData) => ({ ...prevData, products: prevData.products.filter((p) => p.id !== productId) }));
            })
            .catch((error) => {
              toast({
                title: 'Error deleting product',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
              });
            });
        }
        const handleProductDetails = (productId) => {
          router.push(`/products/${productId}`)
        }
        return (
          <Tr key={p.id}>
            <Td>
            <HStack>
            <Link
              onClick={() => handleProductDetails(p.id)}
              _hover={{
                textDecoration: 'glow',
                textShadow: '0 0 8px #fff, 0 0 12px #fff, 0 0 16px #fff',
              }}
            >
              {p.name}
              <Text fontSize="sm" color="gray.500" ml={1} display="inline">
              
              </Text>
            </Link>
            </HStack>
              </Td>
              <Td>
              {p.Categories && p.Categories.map((c) => (
                <span key={c.id}>{c.name}</span>
              ))}
            </Td> 

            <Td>{warehouseSelect}</Td>
            <Td>{vendorSelect}</Td>
            <Td>{totalQuantity}</Td>
            <Td>
            <Image src={p.image}boxSize="50px" objectFit="cover" />
            </Td>
            <Td>
              <Button size="sm"  bgColor={counterColor} leftIcon={<FiDelete />} onClick={() => handleDelete(p.id)}></Button>
            </Td>
          </Tr>
        );
    });
  };
  
  function PageSelect({ filters, pageOptions, onPageChange }) {
    function handleChange(event) {
      const { name, value } = event.target;
      onPageChange({ ...filters, [name]: value });
    }
    function handlePrevPage() {
      if (filters.page > 1) {
        onPageChange({ ...filters, page: filters.page - 1 });
      }
    }
  
    function handleNextPage() {
      if (filters.page < pageOptions.length) {
        onPageChange({ ...filters, page: filters.page + 1 });
      }
    }
    
    return (
      <Flex alignItems="center">
        <IconButton size="sm" bgColor={buttonColor}
          
          icon={<FiArrowLeft />}
          aria-label="Previous page"
          onClick={handlePrevPage}
          mr={2}
        />
        <Select
        size="sm"
        variant="filled"
          id="page"
          name="page"
          value={filters.page}
          onChange={handleChange}
          flex={1}
        >
          {pageOptions.map((page) => (
            <option key={page} value={page}>
              {page}
            </option>
          ))}
        </Select>
        <IconButton size="sm" bgColor={buttonColor}
          icon={<FiArrowRight />}
          aria-label="Next page"
          onClick={handleNextPage}
          ml={2}
        />
      </Flex>
    );
  }
  
  const tableBody = renderProduct(data.products);

  return (
          <>
            <Modal isOpen={isOpen} onClose={handleCloseModal}>
              <ModalOverlay />
                <ModalContent>
                  <ModalHeader textAlign="center">Filters</ModalHeader>
                    <ModalCloseButton />
                      <ModalBody>
                      <InputGroup mr={2} spacing={2}>
                          {/* Warehouse */}
                          
                          <Select
                            variant='filled'
                            size='sm'
                            type="text"
                            name="warehouse_id"
                            defaultValue={filters.warehouse_id}
                            onChange={handleChange}
                            
                          >
                            <option value="" disabled>Warehouse</option>
                            {warehouses.map((w) => {
                              return (
                                <option key={w.id} value={w.id}>
                                  {w.name}
                                </option>
                              );
                            })}
                          </Select>

                          {/* Category */}
                          
                          <Select
                            variant='filled'
                            type="text"
                            name="category_id"
                            defaultValue={filters.category_id}
                            onChange={handleChange}
                            size='sm'
                          >
                            <option value="" disabled>Category</option>
                            {category.categories.map((c) => {
                              return (
                                <option key={c.id} value={c.id}>
                                  {c.name}
                                </option>
                              );
                            })}
                          </Select>

                          {/* Vendor */}
                          
                          <Select
                            
                            variant='filled'
                            type="text"
                            name="vendor_id"
                            defaultValue={filters.vendor_id}
                            onChange={handleChange}
                            size='sm'
                          >
                            <option value="" disabled>Vendors</option>
                            {vendors.map((v) => {
                              return (
                                <option key={v.id} value={v.id}>
                                  {v.name}
                                </option>
                              );
                            })}
                          </Select>
                          {/* {Q SEARCH} */}
                      
                          <Input
                            variant='filled'
                            size='sm'
                            type="text"
                            id="q"
                            name="q"
                            defaultValue={filters.q}
                            onChange={handleChange}
                            placeholder="Name..."
                            focusBorderColor='white'
                          />
                          
                        </InputGroup>
                        <FormControl>
                          <FormLabel htmlFor="limit">Limit</FormLabel>
                            <Select size="sm"
                                variant="filled" id="limit" name="limit" defaultValue={filters.limit} onChange={handleChange}>
                              {limitOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label} ({totalItems > 0 ? Math.min(totalItems, option.value) : 0} items)
                                </option>
                              ))}
                            </Select>
                            <FormLabel  size="sm"
                              variant="filled" htmlFor="page">Page</FormLabel>
                          <PageSelect size="sm"
                              variant="filled" filters={filters} pageOptions={pageOptions} onPageChange={setFilters} />
                            <FormLabel size="sm"
                            variant="filled" htmlFor="sort">Sort</FormLabel>
                            <Select
                              id="sort"
                              name="sort"
                              defaultValue={filters.sort}
                              onChange={handleChange}
                              size="sm"
                              variant="filled"
                            >
                              <option value="">None</option>
                              <option value="name:ASC">(A-Z)</option>
                              <option value="name:DESC">(Z-A)</option>
                            </Select>
                        </FormControl>
                        <Flex justify="space-between">
                        <Button variant="filled" mt={2} size="sm" onClick={handleSubmit} bgColor={buttonColor} leftIcon={<FiSearch />}>
                            Apply
                          </Button>
                          <Button
                          bgColor={counterColor} 
                          variant="solid"
                          mt={2}
                          onClick={handleClearFilters}
                          leftIcon={<FiCircle />}
                          size="sm"
                          >
                          Clear
                          </Button>
                        </Flex>
                      </ModalBody>
                  </ModalContent>
            </Modal>
            {/* {RENDER PRODUCTS} */}
             {/* {Search by} */}
            
             <Box 
                align="center" 
                justify="center" 
                direction="column" 
                p={4}>
                  <Flex justify="space-between">
                    <Heading as="h2" size="lg" mb="4" mx="auto">
                      Product List
                    </Heading>
                    <Button rightIcon={<FiSearch/>} onClick={handleOpenModal} p={4} variant="outline">
                      Search
                    </Button>
                  </Flex>
                  <Table size='md' maxWidth="100%" variant="simple">
                    <Thead style={{ position: "sticky", top: 0 }}>
                      <Tr>
                        <Th>Lists</Th>
                        <Th>Category</Th>
                        <Th>Warehouse</Th>
                        <Th>Vendor</Th>
                        <Th>Quantity</Th>
                        <Th>Image</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>{tableBody}</Tbody>
                  </Table>
               </Box>
          </>
  );
}

export const MoveStocks = (data) => {

  const [details, setDetails] = useState({
      product_id: '',
      source_warehouse_id: '',
      quantity: '',
      destination_warehouse_id: ''
    })
  const products = data.data.products;
  const destinationWarehouse = data.warehouse;
  const [selectedProductId, setSelectedProductId] = useState(0);
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
      const { name, value } = e.target;
      if (value === '') {
        setDetails((prev) => ({ ...prev, [name]: 0 }));
      } else {
        const quantity = parseInt(value);
        setDetails((prev) => ({ ...prev, [name]: quantity }));
      }
    };

  const handleMoveSubmit = async(e) => {
    const accessToken = sessionStorage.getItem('accessToken');
    e.preventDefault();
    try {
      await moveProduct(
        details.product_id,
        details.source_warehouse_id,
        details.quantity,
        details.destination_warehouse_id,
        accessToken
      );
      setDetails({
        product_id: '',
        source_warehouse_id: '',
        quantity: '',
        destination_warehouse_id:''
      });
      handleCloseModal();
      toast({
        title: 'Move Success.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      } catch (err) {
        toast({
          title: 'Move Failed.',
          description: err.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
  } 
  
  const {colorMode} = useColorMode();
  const buttonColor = colorMode === 'dark' ? '#7289da' : '#3bd1c7';
  const counterColor = colorMode === 'dark' ? '#da7272' : '#fb997b';
  return (
    <Box>
      <Button size="sm" bgColor={buttonColor} leftIcon={<FiMove/>} onClick={handleOpenModal}>
        Move Stocks
        </Button>

      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" fontSize="sm">Move Stock</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {/* Mapping over products */}
            
            <Select
              p={4}
              size="sm"
              variant="filled"
              name="product_id"
              value={selectedProductId}
              onChange={(e) => {
                setSelectedProductId(+e.target.value);
                setDetails((prev) => {
                  return { ...prev, product_id: +e.target.value };
                });
              }}
            >
              <option value="" disabled isDisabled>
                Select Product to move
              </option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </Select>
            {selectedProductId ? (
            <Select
              p={4}
              size="sm"
              variant="filled"
              defaultValue={details.source_warehouse_id}
              name="source_warehouse_id"
              onChange={handleChange}
            >
              <option value="" disabled>
                Select source
              </option>
              {products
                .find((product) => product.id === selectedProductId)
                .Warehouses.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.name} @ {warehouse.WarehouseStock.quantity}
                  </option>
                ))}
            </Select>
          ) : (
            <Select
              p={4}
              size="sm"
              variant="filled"
              name="source_warehouse_id"
              placeholder='select product to move first'
              disabled
            >
              <option value="" disabled>
                Select a product first
              </option>
            </Select>
          )}
        
            {/* Mapping over destinationWarehouse */}
            <Select p={4}
              size="sm"
              variant="filled"
              name="destination_id"
              value={details.destination_warehouse_id}
              placeholder='Select warehouse destination'
              onChange={(e) => {
                setDetails((prev) => {
                  return { ...prev, destination_warehouse_id: +e.target.value };
                });
              }}
            >
              {destinationWarehouse.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name}
                </option>
              ))}
            </Select>
            <Input size="sm" p={4}
              variant="filled"
              name="quantity"
              value={details.quantity}
              placeholder='Quantity'
              onChange={(e) => {
                setDetails((prev) => {
                  return { ...prev, quantity: +e.target.value };
                });
              }} />
          </ModalBody>
          <ModalFooter>
                <Button size="sm" bgColor={buttonColor} onClick={handleMoveSubmit}>
                  Submit
                </Button>
                <Button  bgColor={counterColor} size="sm" colorScheme="gray" onClick={handleCloseModal} ml={2}>
                  Cancel
                </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};


//low Stock alert
export const LowStockAlert = ({ data }) => {
  const toast = useToast();
  const hasLowStock = (product) => {
    return product.Warehouses && product.Warehouses.some(
      (warehouse) => warehouse.WarehouseStock.quantity < 10
    );
  };
  const [sufficientStock, setSufficientStock] = useState(true);
  const toastIdRef = useRef();

  useEffect(() => {
    const hasSufficientStock = data.every((product) => !hasLowStock(product));
    setSufficientStock(hasSufficientStock);
  }, [data]);

  const { colorMode } = useColorMode();
  const buttonColor = colorMode === 'dark' ? '#7289da' : '#3bd1c7'; // Moved here

  const handleToast = () => {
    if (
      data.length > 0 &&
      data.some((product) => product.Warehouses && hasLowStock(product)) &&
      !toastIdRef.current
    ) {
      toastIdRef.current = toast({
        title: "Stock Alert",
        description: "Check the dashboard for more details.",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top",
        variant: "top-accent",
        placement: "top",
        render: ({ onClose }) => (
          <Box
            color="white"
            p={3}
            bg={buttonColor}
            borderRadius="md"
            boxShadow="md"
            onClick={() => {
              onClose();
              toastIdRef.current = undefined;
            }}
            cursor="pointer"
          >
            Stock Alert: Check the dashboard for more details.
          </Box>
        ),
      });
    }
  };

  return (
    <Card p={4} borderRadius="md" boxShadow="md" color="gray.400" maxH="344px" bgColor="transparent" borderWidth="1px" borderColor={buttonColor} overflow="scroll">
      <Text fontSize="lg" fontWeight="bold" mb={2} textAlign="center">
        Stock Alert
      </Text>
      {data.length > 0 ? (
        data.map((product) =>
          product.Warehouses && hasLowStock(product) ? (
            <Card key={product.id} mb={2} boxShadow="md" color="gray.400">
              <Text textAlign="center">{product.name}</Text>
              <Badge colorScheme="red" variant="subtle" ml={2}>
                Low Stock
              </Badge>
              <Badge p={2} mt={2} borderRadius="md" bgColor="transparent">
                at{" "}
                {product.Warehouses.filter(
                  (warehouse) =>
                    warehouse.WarehouseStock.quantity >= 1 &&
                    warehouse.WarehouseStock.quantity < 10
                )
                  .map((warehouse) => warehouse.name)
                  .join(", ")}
              </Badge>
            </Card>
          ) : null
        )
      ) : (
        <Spinner size="lg" />
      )}
      {handleToast()}
    </Card>
  );
};







