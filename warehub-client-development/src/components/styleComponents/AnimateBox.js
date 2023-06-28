import { Box, keyframes } from '@chakra-ui/react';
import { FiBox } from 'react-icons/fi';
const MovingBox = () => {
    const containerWidth = 290;
const movingAnimation = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(${containerWidth}px); }
  100% { transform: translateX(0); }
`;

  return (
    <Box
      as={FiBox}
      w="45px"
      h="45px"
      borderRadius="md"
      animation={`${movingAnimation} 5s infinite`}
    />
  );
};

export default MovingBox;
