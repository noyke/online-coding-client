import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IExercise } from "../types/exercise";

interface Props {
  exercises: IExercise[];
}

const LobbyPage = ({ exercises }: Props) => {
  return (
    <VStack>
      <Stack alignItems="center" spacing="16px">
        <Heading>Exercises</Heading>
        <Text>Please choose one of the following exercises</Text>
        <Stack>
          {exercises.map((exercise, index) => (
            <Card variant="outline" key={index}>
              <CardHeader>
                <Link to={`/exercise/${index + 1}`}>{exercise.title}</Link>
              </CardHeader>
            </Card>
          ))}
        </Stack>
      </Stack>
    </VStack>
  );
};

export default LobbyPage;
