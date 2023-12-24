import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../App";
import { codeBlocks } from "../CodeBlocks";
import ReactCodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import ImagePopup from "../components/ImagePopup";

const CodeBlockPage = () => {
  const { codeId } = useParams<{ codeId: string }>();

  if (!codeId) return "No Code Id";

  const index = parseInt(codeId) - 1;

  const [codeBlock, setCodeBlock] = useState(codeBlocks[index]);
  const [isReadOnly, setReadOnly] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    socket.on("is_first", (isFirstEnter) => {
      setReadOnly(isFirstEnter);
    });
    socket.on("updated_code", (newCode) => {
      setCodeBlock({ ...codeBlock, code: newCode });
    });
  }, [socket]);

  const WelcomeText = isReadOnly
    ? "Hi Mentor! Please checkout this code"
    : "Hi Student! you can now update the code";

  function checkSolution(newCode: string) {
    const clearNewCode = newCode.replace(/\s/g, "");
    const solution = codeBlocks[index].solution.replace(/\s/g, "");

    return clearNewCode === solution;
  }

  const onChange = (newCode: string) => {
    socket.emit("update_code", newCode);

    if (checkSolution(newCode)) {
      setOpenPopup(true);
    }
  };

  return (
    <>
      <h3>{WelcomeText}</h3>
      <h2 style={{ textAlign: "left" }}>{codeBlock.title}</h2>
      <ReactCodeMirror
        value={codeBlock.code}
        editable={!isReadOnly}
        onChange={onChange}
        theme={vscodeDark}
        style={{ textAlign: "left", width: "700px" }}
        minHeight="600px"
      />
      <ImagePopup open={openPopup} />
    </>
  );
};

export default CodeBlockPage;
