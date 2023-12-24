import { HStack, Image, Heading } from "@chakra-ui/react";
import logo from "../assets/hacker.png";

const Header = () => {
  return (
    <HStack padding="8px" spacing="24px">
      <Image src={logo} boxSize="48px" />
      <Heading>Code Review</Heading>
    </HStack>
  );
};

export default Header;
