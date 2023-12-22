import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../App";
import { codeBlocks } from "../CodeBlocks";

const CodeBlockPage = () => {
  const { codeId } = useParams<{ codeId: string }>();

  if (!codeId) return "No Code Id";
  const [codeBlock, setCodeBlock] = useState(codeBlocks[parseInt(codeId) - 1]);
  const [isReadOnly, setReadOnly] = useState(false);

  useEffect(() => {
    socket.on("is_first", (isFirstEnter) => {
      setReadOnly(isFirstEnter);
    });
    socket.on("updated_code", (newCode) => {
      setCodeBlock({ ...codeBlock, code: newCode });
    });
  }, [socket]);

  if (isReadOnly)
    return (
      <>
        <h1>{codeBlock.title}</h1>
        <h2>{codeBlock.code}</h2>
      </>
    );

  return (
    <>
      <h1>{codeBlock.title}</h1>
      <textarea
        onChange={(event) => socket.emit("update_code", event.target.value)}
      >
        {codeBlock.code}
      </textarea>
    </>
  );
};

export default CodeBlockPage;
