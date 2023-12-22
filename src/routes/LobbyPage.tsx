import { Link } from "react-router-dom";
import { socket } from "../App";

const LobbyPage = () => {
  const notifyCodeEnter = (codeId: string) => {
    socket.emit("code_enter", codeId);
  };
  return (
    <div>
      <h1>Choose code block:</h1>
      <h2>
        <Link
          to={`/code/1`}
          id="1"
          onClick={(event) => notifyCodeEnter(event.currentTarget.id)}
        >
          Code 1
        </Link>
      </h2>
      <h2>
        <Link
          to={`/code/2`}
          id="2"
          onClick={(event) => notifyCodeEnter(event.currentTarget.id)}
        >
          Code 2
        </Link>
      </h2>
      <h2>
        <Link
          to={`/code/3`}
          id="3"
          onClick={(event) => notifyCodeEnter(event.currentTarget.id)}
        >
          Code 3
        </Link>
      </h2>
      <h2>
        <Link
          to={`/code/4`}
          id="4"
          onClick={(event) => notifyCodeEnter(event.currentTarget.id)}
        >
          Code 4
        </Link>
      </h2>
    </div>
  );
};

export default LobbyPage;
