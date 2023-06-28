import React from "react";
import { Link, Flex, Icon, Text, useColorMode } from '@chakra-ui/react';

const SideItem = ({ icon, title, active, navSize, to, onClick, activeColor }) => {
  const { colorMode } = useColorMode();
  const hoverColor = colorMode === 'dark' ? '#7289da' : '#66b2b2';

  return (
    <Link
      backgroundColor={active ? activeColor : 'none'}
      p={3}
      borderRadius={8}
      _hover={{ textDecor: 'none', backgroundColor: hoverColor }}
      w={navSize === 'large' && '100%'}
      href={to}
      onClick={onClick}
    >
      <Flex>
        <Icon as={icon} fontSize="xl" color={active ? '#ffffff' : '#5e6870'} />
        <Text
          ml={5}
          display={navSize === 'small' ? 'none' : 'flex'}
          color={active ? '#ffffff' : '#5e6870'}
        >
          {title}
        </Text>
      </Flex>
    </Link>
  );
};

export default SideItem;
