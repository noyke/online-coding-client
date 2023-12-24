import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../App";
import { codeBlocks } from "../CodeBlocks";
import ReactCodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import smiley from "../assets/smiley.png";

const CodeBlockPage = () => {
  const { codeId } = useParams<{ codeId: string }>();

  if (!codeId) return "No Code Id";

  const index = parseInt(codeId) - 1;

  const [code, setCode] = useState(codeBlocks[index].code);
  const [isMentor, setIsMentor] = useState(false);

  useEffect(() => {
    socket.on("is_first", (isFirstEnter) => {
      setIsMentor(isFirstEnter);
    });
    socket.on("updated_code", (newCode) => {
      setCode(newCode);
    });
  }, [socket]);

  function isCorrectSolution() {
    const codeWithoutSpaces = code.replace(/\s/g, "");
    const solutionWithoutSpaces = codeBlocks[index].solution.replace(/\s/g, "");

    return codeWithoutSpaces === solutionWithoutSpaces;
  }

  const onChange = (newCode: string) => {
    setCode(newCode);
    socket.emit("update_code", newCode);
  };

  const WelcomeText = isMentor
    ? "Hello Mentor! Take a moment to review and provide feedback on the submitted code."
    : "Hello Student! It's your turn to shine. Dive in, edit the code, and tackle the exercise";

  return (
    <Stack>
      <Heading>{codeBlocks[index].title}</Heading>
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
