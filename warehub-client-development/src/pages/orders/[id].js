import { useState, useEffect } from "react"
import { fetchOrderById } from "@/fetching/fetchById";
import { FiSettings } from "react-icons/fi";
import {
    Card, Badge, Box, Image, Text, VStack, Flex, Grid, useColorMode, HStack, Center
} from '@chakra-ui/react';

/*
needed data
order = 
{   order: {total_price}, 
    products: {name, image, SKU, price}, 
    warehouse: {name}, 
    customer: {first_name, last_name}, 
    details: {price, quantity, }}
*/

const OrderDetails = ({orderId}) => {
    const [order, setOrder] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [dummyState, setDummyState] = useState(0); // create dummy state

    useEffect(() => {

        const fetchOrder = async () => {
          try {
            const data = await fetchOrderById(orderId);
            setOrder(data);
            setLoading(false);
          } catch (err) {
            setLoading(true)
          }
        };
        fetchOrder();
      }, [orderId, dummyState]);

      if (isLoading) {
        return <div>Loading...</div>;
      }

    
    const orders = order.order //object .total_price .name 1
    const details = order.details //[{},{}] map product_id quantity price
    const customer = order.customer // .first_name .last_name 1
    const warehouse = order.warehouse // .name 1
    const products = order.products //[] .SKU .price .name .image // .OrderProduct.price / quantity .createdAt
    
    return (
        <>
         <OrderDetailsCard orders={orders} details={details} customer={customer} warehouse={warehouse} products={products}/>
         </>
    );
};
export default OrderDetails;

export async function getServerSideProps(ctx) {
    const {id} = ctx.query;

    return { props: {orderId : +id} }
}

//Display Order By id
const OrderDetailsCard = ({ orders, details, customer, warehouse, products }) => {

    const totalQuantity = products.reduce(
        (total, product) => total + product.OrderProduct.quantity,
        0
      );
    const {colorMode} = useColorMode();
    const buttonColor = colorMode === 'dark' ? '#7289da' : '#3bd1c7';

      return (
        <Card direction={{ base: 'column', sm: 'row' }}
        borderWidth="2px"
        overflow='hidden'
        variant='outline'
        size="lg"
        p={4}
        borderColor={buttonColor}>
          <VStack spacing="4" align="start">
          <Box>
            <VStack align="start">
              <Text fontSize="sm" fontWeight="bold">Order Details</Text>
              <Text fontSize="sm">{customer.first_name} {customer.last_name}'s Order</Text>
              <Text fontSize="sm">from {warehouse.name}</Text>
              <Text fontSize="sm">Invoice Total : {orders.total_price}</Text>
              <Text fontSize="sm">Total product's quantity: {totalQuantity}</Text>
              <Text fontSize="sm" as="strong">{new Date(orders.createdAt).toLocaleDateString()}</Text>
            </VStack>
          </Box>

            <Text fontSize="sm" fontWeight="bold">Product's detail :</Text>
          </VStack>   
                {products.map((product) => (
                  <Box flex="1">
                  <SlideableCard key={product.SKU} buttonColor={buttonColor} product={product} />
                  </Box>
                ))}
        </Card>
      );
};

const SlideableCard = ({ product, buttonColor }) => {
    return (
      <Card maxW="sm" p="4" borderWidth="0" variant="outline" overflow="hidden">
        <Box>
          <Center>
          <Image borderRadius="8" src={product.image} alt={product.name} boxSize="250px" objectFit="cover"/>
          </Center>
          <VStack>
          <Text fontSize="md" fontWeight="bold">{product.name}</Text>
          <Badge size="sm" colorScheme="green">{product.SKU}</Badge>
          <Text fontSize="sm">Base Price: {product.price}</Text>
          <Text fontSize="sm" fontWeight="bold">Sold at:</Text>
          <Text fontSize="sm">
            Price: {product.OrderProduct.price} | Quantity: {product.OrderProduct.quantity}
          </Text>    
          </VStack>
          </Box>
      </Card>
    );
};
