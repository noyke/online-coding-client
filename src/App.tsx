import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LobbyPage from "./routes/LobbyPage";
import CodeBlockPage from "./routes/CodeBlockPage";
import { connect } from "socket.io-client";

export const socket = connect("http://localhost:3001");

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LobbyPage />,
    },
    {
      path: "code/:codeId",
      element: <CodeBlockPage />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
