import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../App";
import ReactCodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import smiley from "../assets/smiley.png";
import { IExercise } from "../types/exercise";
import Loader from "../components/Loader";

interface Props {
  exercises: IExercise[];
}

const CodeBlockPage = ({ exercises }: Props) => {
  const { id } = useParams<{ id: string }>();

  if (!id) return "no exercise id";

  const index = parseInt(id) - 1;

  const [code, setCode] = useState(exercises[index].code);
  const [isMentor, setIsMentor] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function handleFirst(isFirstEnter: boolean) {
      setIsMentor(isFirstEnter);
      setLoading(false);
    }
    function handleCodeUpdated(newCode: string) {
      setCode(newCode);
    }
    socket.emit("code_entered", id);
    socket.on("is_first", handleFirst);
    socket.on("updated_code", handleCodeUpdated);

    return () => {
      socket.emit("code_exit");
      socket.off("is_first", handleFirst);
      socket.off("updated_code", handleCodeUpdated);
    };
  }, [socket]);

  function isCorrectSolution() {
    const codeWithoutSpaces = code.replace(/\s/g, "");
    const solutionWithoutSpaces = exercises[index].solution.replace(/\s/g, "");

    return codeWithoutSpaces === solutionWithoutSpaces;
  }

  const onChange = (newCode: string) => {
    setCode(newCode);
    socket.emit("update_code", { newCode, id });
  };

  const WelcomeText = isMentor
    ? "Hello Mentor! Take a moment to review and provide feedback on the submitted code."
    : "Hello Student! It's your turn to shine. Dive in, edit the code, and tackle the exercise";

  return loading ? (
    <Loader />
  ) : (
    <Stack>
      <Heading>{exercises[index].title}</Heading>
      <Text fontSize="lg">{WelcomeText}</Text>
      <Stack direction="row" height="400px">
        <ReactCodeMirror
          value={code}
          editable={!isMentor}
          onChange={onChange}
          theme={vscodeDark}
          style={{ border: "1px solid gray", flex: 1 }}
          height="100%"
        />
        <Flex justifyContent="center" alignItems="center" flex={1}>
          {isCorrectSolution() && (
            <Image src={smiley} height="80%" aspectRatio="1" />
          )}
        </Flex>
      </Stack>
    </Stack>
  );
};

export default CodeBlockPage;
