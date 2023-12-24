import { Link } from "react-router-dom";
import { socket } from "../App";
import { codeBlocks } from "../CodeBlocks";
import {
  Card,
  CardHeader,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

const LobbyPage = () => {
  const notifyCodeEnter = (codeId: number) => {
    socket.emit("code_enter", codeId);
  };

  return (
    <VStack>
      <Stack alignItems="center" spacing="16px">
        <Heading>Exercises</Heading>
        <Text>Please choose one of the following exercises</Text>
        <Stack>
          {codeBlocks.map((codeBlock, index) => (
            <Card variant="outline" key={index}>
              <CardHeader>
                <Link
                  to={`/code/${index + 1}`}
                  onClick={() => notifyCodeEnter(index + 1)}
                >
                  {codeBlock.title}
                </Link>
              </CardHeader>
            </Card>
          ))}
        </Stack>
      </Stack>
    </VStack>
  );
};

export default LobbyPage;
