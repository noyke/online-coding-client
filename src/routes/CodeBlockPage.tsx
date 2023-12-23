import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../App";
import { codeBlocks, codeBlocksSolutions } from "../CodeBlocks";
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

  function checkSolution(newCode: string) {
    const clearNewCode = newCode.replace(/\s/g, "");
    const solution = codeBlocksSolutions[index].code.replace(/\s/g, "");

    return clearNewCode === solution;
  }

  const onChange = useCallback((newCode: string) => {
    socket.emit("update_code", newCode);
    if (checkSolution(newCode)) {
      setOpenPopup(true);
    }
  }, []);

  return (
    <>
      <h2>{codeBlock.title}</h2>
      <ReactCodeMirror
        value={codeBlock.code}
        editable={!isReadOnly}
        onChange={onChange}
        theme={vscodeDark}
        style={{ textAlign: "left" }}
      />
      <ImagePopup open={openPopup} />
    </>
  );
};

export default CodeBlockPage;
