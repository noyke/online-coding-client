import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Grid, GridItem, HStack } from "@chakra-ui/react";
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
    <Grid
      templateAreas={`"header" "main"`}
      gap="1"
      color="blackAlpha"
      fontWeight="bold"
      height="100vh"
      width="100vw"
    >
      <GridItem pl="2" bg="orange" area={"header"}>
        bla bla
      </GridItem>
      <GridItem pl="2" bg="green" area={"main"}>
        <RouterProvider router={router} />
      </GridItem>
    </Grid>
  );
}

export default App;
