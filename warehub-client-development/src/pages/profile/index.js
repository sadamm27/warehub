import { fetchUser } from "@/fetching/fetchData";
import React, { useEffect, useState } from "react";
import { EditForm } from "./edit";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  HStack,
  Heading,
  IconButton,
  Spacer,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorMode,
} from "@chakra-ui/react";
import { FiRefreshCcw } from "react-icons/fi";

const index = () => {
  const { colorMode } = useColorMode();
  const buttonColor = colorMode === "dark" ? "#7289da" : "#3bd1c7";
  const user = async () => {
    // Replace 'fetchData' with your actual fetch function
    const response = await fetchUser();
    return response;
  };

  const User = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const response = await user();
          setData(response);
          setIsLoading(false);
        } catch (err) {
          setError(err);
          setIsLoading(false);
        }
      };
      fetchData();
    }, []);
    return { data, setData, isLoading, setIsLoading, error, setError };
  };

  const { data, setData, isLoading } = User();

  const handleclick = async () => {
    const response = await user();
    setData(response);
  };

  if (isLoading === true) {
    return <div>Loading data...</div>;
  }

  return (
    <div>
      <Heading as="h2" size="lg" mb="4" textAlign="center">
        Profile
      </Heading>
      <TableContainer>
        <Table size="sm">
          <Tbody >
            {Object.keys(data).map((key, index) => {
              const subData = data[key];
              if (index == 5 || index == 0 || index == 8 || index == 9) {
                return 
                <div key={index}>
                </div>;
              }
              return (
                  <Tr key={index}>
                    <Td key={key}>
                      {key}
                    </Td>
                    <Td key={subData}>
                      {subData}
                    </Td>
                  </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Spacer/>
      <Stack direction='row' spacing={4} align='center'>
        <ButtonGroup>
          <EditForm data={data} />
          <IconButton
            size="sm"
            bgColor={buttonColor}
            icon={<FiRefreshCcw />}
            onClick={handleclick}
          />
        </ButtonGroup>
      </Stack>
    </div>
  );
};

export default index;
