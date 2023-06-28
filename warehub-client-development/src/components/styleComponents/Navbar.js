import { Box, HStack, Spacer } from "@chakra-ui/react";
import ToggleColorButton from "./NavbarItems/ToggleDark";
import Footer from "./Footer";
import Dropdown from "./NavbarItems/Dropdown";

const Navbar = () => {
  return (
    <HStack>
      <Footer />
      <Spacer />
      <Box flex="1" />
      <Dropdown />
      <ToggleColorButton />
    </HStack>
  );
};

export default Navbar;
