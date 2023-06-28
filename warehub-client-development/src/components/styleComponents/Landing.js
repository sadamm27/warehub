import {
  Box,
  Flex,
  Text,
  Button,
  useColorMode,
  IconButton,
  useDisclosure,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import React from "react";
import NextLink from "next/link";
import { FiBox } from "react-icons/fi";
import { FaBullseye } from "react-icons/fa";
import { VscChecklist } from "react-icons/vsc";
import { SiGoogleanalytics } from "react-icons/si";
import { Link } from "react-scroll";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  useColorModeValue,
} from "@chakra-ui/react";
import LoginPage from "./Login";

const AnimatedNumber = ({ value, text }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const valueRef = useRef(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      valueRef.current += 3;
      if (valueRef.current >= value) {
        valueRef.current = value;
        clearInterval(intervalId);
      }
      setAnimatedValue(valueRef.current);
    }, 10);

    return () => {
      clearInterval(intervalId);
    };
  }, [value]);

  return (
    <Box mr={4} textAlign="left">
      <Text fontSize="4xl" fontWeight="bold">
        {animatedValue}
      </Text>
      <Text>{text}</Text>
    </Box>
  );
};

const Landing = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  useColorModeValue("White", "gray.700");
  const [isLogin, setIsLogin] = useState(false);

  const { colorMode } = useColorMode();
  const buttonColor = colorMode === "dark" ? "#7289da" : "#3bd1c7";
  const counterColor = colorMode === "dark" ? "LogisticDark.png" : "LogisticLight.png";
  return (
    <Box
      bg={useColorModeValue("white", "#1A202C")}
      py={0}
      px={0}
      position={"absolute"}
    >
      {/* Header */}
      <Flex justify="space-between" align="center" p={4}>
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Flex align="center" pr={2} mx={10}>
            <Box as={FiBox} color="gray.600" alt="Warehub Logo" height={24} />
            <Text fontSize="2xl" fontWeight="bold" mt={5} mb={6} ml={6}>
              Warehub
            </Text>
          </Flex>
        </motion.div>
      </Flex>

      {/* Navbar */}
      <Flex justify="flex-end" align="center" p={-10} mt={-20}>
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link to="fitur" smooth={true} duration={500}>
            <Button
              variant="link"
              _hover={{ color: "black.300" }}
              mx={2}
              mr={10}
            >
              Features
            </Button>
          </Link>
        </motion.div>
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link to="layanan" smooth={true} duration={500}>
            <Button
              variant="link"
              _hover={{ color: "black.300" }}
              mx={2}
              mr={10}
            >
              Services
            </Button>
          </Link>
        </motion.div>
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link to="tentang-kami" smooth={true} duration={500}>
            <Button
              variant="link"
              _hover={{ color: "black.300" }}
              mx={2}
              mr={10}
            >
              About us
            </Button>
          </Link>
        </motion.div>
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <HStack mr={6}>
            <Button onClick={onOpen} bgColor={buttonColor}>
              Login
            </Button>
          </HStack>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <LoginPage />
            </ModalContent>
          </Modal>
        </motion.div>
      </Flex>

      {/* Section 1 */}
      <Box bg={useColorModeValue("white", "#1A202C")} py={16} px={8}>
        <Flex justify="space-between">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Box>
              <Text fontSize="lg" mt={4} mb={8}>
                A complete warehouse management solution for your business. We
                are a team committed to helping you optimize your warehouse
                operations.
              </Text>
              <NextLink href="/register">
                <Button bgColor={buttonColor} mt={8}>
                  Free Trial for 1 Month
                </Button>
              </NextLink>
              <Flex justify="flex-start" align="center" mt={8}>
                <AnimatedNumber value={100} text="Brand Owner" />
                <AnimatedNumber value={100} text="User Active" />
                <AnimatedNumber value={100} text="Partner" />
              </Flex>
            </Box>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Box position="relative" width={500} height={400}>
              <img
                src={counterColor}
                alt="Dummy Web Admin"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </Box>
          </motion.div>
        </Flex>
      </Box>

      {/* Section 2 */}
      <Box bgColor={buttonColor} py={10} px={0} mx={0}>
        <Text fontSize="2xl" color="white" textAlign="center" mb={8}>
          Trusted by renowned brands
        </Text>
        <Flex maxWidth="100%" justifyContent="center">
          <Flex flexDirection="column" alignItems="center" mx={4}>
            <img
              src="https://logodix.com/logo/814217.png"
              alt="Company Logo 1"
              style={{
                width: "100px",
                height: "auto",
                filter: "brightness(0) invert(1)",
              }}
            />
          </Flex>
          <Flex flexDirection="column" alignItems="center" mx={4}>
            <img
              src="https://i.pinimg.com/originals/d4/f2/5b/d4f25b4b1480eaaa2ae85868356f1b29.png"
              alt="Company Logo 2"
              style={{
                width: "100px",
                height: "auto",
                filter: "brightness(0) invert(1)",
              }}
            />
          </Flex>
          <Flex flexDirection="column" alignItems="center" mx={4}>
            <img
              src="https://logos-world.net/wp-content/uploads/2020/07/Asus-Logo.png"
              alt="Company Logo 3"
              style={{
                width: "100px",
                height: "auto",
                filter: "brightness(0) invert(1)",
              }}
            />
          </Flex>
          <Flex flexDirection="column" alignItems="center" mx={4}>
            <img
              src="https://logos-world.net/wp-content/uploads/2020/09/Lakme-Logo-2011-2019.png"
              alt="Company Logo 4"
              style={{
                width: "100px",
                height: "auto",
                filter: "brightness(0) invert(1)",
              }}
            />
          </Flex>
          <Flex flexDirection="column" alignItems="center" mx={4}>
            <img
              src="https://www.cetoday.ch/sites/default/files/inline-images/Eiger-logo-black.png"
              alt="Company Logo 5"
              style={{
                width: "100px",
                height: "auto",
                filter: "brightness(0) invert(1)",
              }}
            />
          </Flex>
          <Flex flexDirection="column" alignItems="center" mx={4}>
            <img
              src="http://lofrev.net/wp-content/photos/2016/08/lacoste_vector_logo.png"
              alt="Company Logo 6"
              style={{
                width: "100px",
                height: "auto",
                filter: "brightness(0) invert(1)",
              }}
            />
          </Flex>
        </Flex>
      </Box>

      {/* Section 3 */}
      <Box py={16} px={8} bg={useColorModeValue("white", "#1A202C")} id="fitur">
        <Text fontSize="2xl" fontWeight="bold" mb={8} textAlign="center">
          Advantageous features of using Warehub
        </Text>
        <Flex justify="space-between">
          {/* Card 1 */}
          <Flex justify="space-between">
            {/* Card 1 */}
            <Box
              w="30%"
              bg={useColorModeValue("white", "#1A202C")}
              p={4}
              rounded="md"
              boxShadow="md"
              transition="background-color 0.3s"
            >
              <Text fontSize="xl" fontWeight="bold" mb={4}>
                Operational Efficiency
              </Text>
              <Text lineHeight="tall" mb={4}>
                Helps improve the operational efficiency of your warehouse
                through real-time stock monitoring, automated order processing.
              </Text>
              <IconButton
                size="sm"
                bgColor={buttonColor}
                icon={<VscChecklist />}
              />
            </Box>

            {/* Card 2 */}
            <Box
              w="30%"
              bg={useColorModeValue("white", "#1A202C")}
              p={4}
              rounded="md"
              boxShadow="md"
              transition="background-color 0.3s"
            >
              <Text fontSize="xl" fontWeight="bold" mb={4}>
                Data Accuracy and Precision
              </Text>
              <Text lineHeight="tall" mb={4}>
                You can ensure high data accuracy and precision in inventory
                tracking. This reduces the risk of human errors, stock loss, and
                shipping mistakes.
              </Text>
              <IconButton
                size="sm"
                bgColor={buttonColor}
                icon={<FaBullseye />}
              />
            </Box>

            {/* Card 3 */}
            <Box
              w="30%"
              bg={useColorModeValue("white", "#1A202C")}
              p={4}
              rounded="md"
              boxShadow="md"
              transition="background-color 0.3s"
            >
              <Text fontSize="xl" fontWeight="bold" mb={4}>
                Analysis and Decision Making
              </Text>
              <Text lineHeight="tall" mb={4}>
                Providing reports and analysis that facilitate better
                decision-making. You can track demand trends and identify the
                best-selling products.
              </Text>
              <IconButton
                size="sm"
                bgColor={buttonColor}
                icon={<SiGoogleanalytics />}
              />
            </Box>
          </Flex>
        </Flex>
      </Box>

      {/* Section 4 */}
      <Box
        py={16}
        px={8}
        bg={useColorModeValue("white", "#1A202C")}
        id="layanan"
      >
        <Flex justify="center" align="center">
          {/* Left side */}
          <Box w="50%">
            <Text fontSize="2xl" fontWeight="bold" textAlign="left">
              Efficient Inventory Management
            </Text>
            <Text mt={4} textAlign="left">
              Warehub provides inventory management features that allow users to
              track stock items, organize product categories, and monitor
              inventory movements in real-time.
            </Text>
          </Box>

          {/* Right side */}
          <Box w="50%">
            <Flex justify="center">
              <img
                src="adminweb2.png"
                alt="Dashboard Admin"
                style={{ width: "50%" }}
              />
            </Flex>
          </Box>
        </Flex>
      </Box>

      {/* Section 5 */}
      <Box py={16} px={8} bg={useColorModeValue("white", "#1A202C")}>
        <Flex justify="center" align="center">
          {/* Right side */}
          <Box w="50%">
            <Flex justify="center">
              <img
                src="adminweb3.png"
                alt="Dashboard Admin"
                style={{ width: "50%" }}
              />
            </Flex>
          </Box>

          {/* Left side */}
          <Box w="50%">
            <Text fontSize="2xl" fontWeight="bold" textAlign="left">
              Monitor Product Stock and Transactions
            </Text>
            <Text mt={4} textAlign="left">
              Users can track transactions related to their products. Accessible
              information includes purchase details, sales, and product
              shipments. By monitoring transactions, users can gain a better
              understanding of their business activities, including sales
              patterns, product popularity, and demand trends.
            </Text>
          </Box>
        </Flex>
      </Box>

      {/* Section 6 */}
      <Box py={0} px={8} bgColor={buttonColor} id="tentang-kami">
        <Flex alignItems="center">
          <Box flex={1}>
            <Text fontSize="2xl" fontWeight="bold" color="white">
              About Us
            </Text>
            <Accordion allowToggle mt={8}>
              {/* Pertanyaan 1 */}
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Text color="white" fontWeight="bold">
                        What is Warehub?
                      </Text>
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Text color="white">
                    Warehub is an e-commerce platform that provides marketing,
                    inventory management, and logistics solutions for online
                    businesses.
                  </Text>
                </AccordionPanel>
              </AccordionItem>

              {/* Pertanyaan 2 */}
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Text color="white" fontWeight="bold">
                        How can I sign up for Warehub?
                      </Text>
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Text color="white">
                    You can sign up for Warehub by visiting our official website
                    and following the provided registration steps.
                  </Text>
                </AccordionPanel>
              </AccordionItem>

              {/* Pertanyaan 3 */}
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Text color="white" fontWeight="bold">
                        What are the benefits of using Warehub?
                      </Text>
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Text color="white">
                    The benefits of using Warehub include access to various
                    logistics services, efficient inventory management, and
                    integration with marketing platforms to enhance sales.
                  </Text>
                </AccordionPanel>
              </AccordionItem>

              {/* Pertanyaan 4 */}
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Text color="white" fontWeight="bold">
                        How does the shipping process work with Warehub?
                      </Text>
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Text color="white">
                    After you receive an order, Warehub will handle the
                    packaging and shipping process of the goods to your
                    customers through connected logistics services.
                  </Text>
                </AccordionPanel>
              </AccordionItem>

              {/* Pertanyaan 5 */}
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Text color="white" fontWeight="bold">
                        Does Warehub have a shipment tracking feature?
                      </Text>
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Text color="white">
                    Yes, Warehub provides a shipment tracking feature that
                    allows you and your customers to track the delivery status
                    of the goods in real-time.
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
          <Box
            py={16}
            px={8}
            bgColor={buttonColor}
            id="gambar-pertanyaan"
            marginLeft="auto"
          >
            <img src="bertanya.png" alt="Gambar" width={350} height={300} />
          </Box>
        </Flex>
      </Box>
      {/* Footer */}
      <Box py={2} px={6} bg={useColorModeValue("white", "#1A202C")}>
        <Flex justify="center">
          <Box mr={8}>
            <Flex align="center" pr={2} mx={10}>
              <Box as={FiBox} color="gray.600" alt="Warehub Logo" height={24} />
              <Text fontSize="2xl" fontWeight="bold" mt={5} mb={6} ml={6}>
                Warehub
              </Text>
            </Flex>
          </Box>
          <Box>
            <Box mt={7} textAlign="center">
              <a href="mailto:info@warehub.com">
                <Button bgColor={buttonColor}>Contact Us</Button>
              </a>
            </Box>
          </Box>
        </Flex>
        <Text mt={8} ml={4} fontSize="sm" textAlign="center">
          © 2023 Warehub. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
};

export default Landing;
