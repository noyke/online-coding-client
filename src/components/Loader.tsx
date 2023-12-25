import { Flex, Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Flex justifyContent="center" alignItems="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="orange"
        size="xl"
      />
    </Flex>
  );
};

export default Loader;
