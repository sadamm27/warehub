import {
  BulkInsertForm,
  LowStockAlert,
} from "@/components/dataComponents/products/products";
import ProfitLoss from "@/components/dataComponents/profitLoss";
import {
  Grid,
  Box,
  useMediaQuery,
  Stack,
  Image,
  VStack,
  HStack,
  useColorMode,
  Badge,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { fetchData } from "@/fetching/fetchData";
import { useState, useEffect } from "react";
import { LatestCustomer } from "@/components/dataComponents/customers";
import WarehouseBar from "@/components/dataComponents/warehouses/warehouseCharts";
import { FiShoppingBag, FiUsers } from "react-icons/fi";
import { allVendors } from "@/components/dataComponents/allData";
import MovingBox from "@/components/styleComponents/AnimateBox";

const LastTransaction = () => {
  const fetchOrders = async () => {
    // Replace 'fetchData' with your actual fetch function
    const response = await fetchData("orders");
    return response.data;
  };

  const useOrders = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const response = await fetchOrders();
          setData(response);
          setIsLoading(false);
        } catch (err) {
          setError(err);
          setIsLoading(false);
        }
      };
      fetchData();
    }, []);

    return { data };
  };

  const { data } = useOrders();

  return (
    <Box
      height="100%"
      width="100%"
      overflow="auto"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {data !== null && data.length > 0 ? (
        <div>
          <Text textAlign="center" color="gray.400">
            {" "}
            Latest Transactions
          </Text>
          {data.slice(-3).map((transaction) => (
            <div key={transaction.id}>
              <Box display="flex" alignItems="center" marginBottom="1rem">
                <Box marginRight="0.5rem">
                  <Badge colorScheme="green">
                    <FiShoppingBag />
                  </Badge>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.500">
                    Customer:{" "}
                    <Text as="span" color="gray.600">
                      {transaction.Customer.first_name}{" "}
                      {transaction.Customer.last_name}
                    </Text>
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Created At:{" "}
                    <Text as="span" color="gray.600">
                      {new Date(transaction.createdAt).toLocaleString()}
                    </Text>
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Total Price:{" "}
                    <Badge colorScheme="green">{transaction.total_price}</Badge>
                  </Text>
                </Box>
              </Box>
            </div>
          ))}
        </div>
      ) : (
        <Spinner/>
      )}
    </Box>
  );
};

const Dashboard = () => {
  const fetchProducts = async () => {
    const data = await fetchData("products");
    return data;
  };

  const useProducts = () => {
    const [data, setData] = useState({ products: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const reponse = await fetchProducts();
          setData(reponse);
          setIsLoading(false);
        } catch (err) {
          setError(err);
          setIsLoading(false);
        }
      };

      fetchData();
    }, []);

    return { data, setData };
  };

  const { data } = useProducts();
  const { vendors } = allVendors();
  const totalVendors = vendors.length;
  const [isSmallerScreen] = useMediaQuery("(max-width: 768px)");
  const { colorMode } = useColorMode();
  const imageUrl =
    colorMode === "dark"
      ? "darkBulk.png"
      : "https://img.freepik.com/free-vector/checking-boxes-concept-illustration_114360-2465.jpg?w=740&t=st=1684387560~exp=1684388160~hmac=e225f2314b5666af1ce71c24159d0e45587d38a74f171444232d2e4243fef2a1";
  const buttonCollor = colorMode === "dark" ? "#7289da" : "#3bd1c7";
  const latestImage =
    colorMode === "dark" ? "fittingDark.png" : "fittingLight.png";
  return (
    <>
      {isSmallerScreen ? (
        <Stack spacing={4} minW="100%">
          <Box p={4}>
            <ProfitLoss />
          </Box>
          <Box p={4}>
            <LowStockAlert data={data.products} />
          </Box>
          <Box p={4} borderColor={buttonCollor}>
            <VStack>
              <Image src={imageUrl} />
              <BulkInsertForm />
            </VStack>
          </Box>
          <Box p={4}>
            <LastTransaction />
          </Box>
          <Box p={4}>
            <WarehouseBar />
          </Box>
          <Box p={4}>
            <VStack>
              <HStack>
                <FiUsers size={20} />
                <Text>{totalVendors}</Text>
              </HStack>
              <Text as="span" color="green.300">
                Vendors supplied us!
              </Text>
            </VStack>
          </Box>
          <Box p={4}>
            <LatestCustomer />
          </Box>
        </Stack>
      ) : (
        <Grid templateRows="repeat(2, 1fr)" gap={4} minW="100%" maxH="100vh">
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            <Box p={4}>
              <LowStockAlert data={data.products} />
            </Box>
            <Box
              p={4}
              justifyContent="center"
              alignItems="center"
              alignSelf="stretch"
            >
              <VStack>
                <Image src={imageUrl} maxW="100%" maxH="10%" />
                <BulkInsertForm />
              </VStack>
            </Box>
            <Box p={4}>
              <ProfitLoss />
            </Box>
          </Grid>
          <Grid templateColumns="3fr 2fr" gap={4}>
            <Box p={4}>
              <WarehouseBar />
            </Box>
            <Box p={4}>
              <LastTransaction />
            </Box>
          </Grid>
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            <Box p={4}>
              <LatestCustomer />
            </Box>
            <Box p={4}>
              <VStack>
                <HStack>
                  <FiUsers size={20} />
                  <Text>{totalVendors}</Text>
                </HStack>
                <Text as="span" color="green.300">
                  Vendors supplied us!
                </Text>
              </VStack>
            </Box>
            <Box p={4}>
              <MovingBox />
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Dashboard;
