import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import LobbyPage from "./routes/LobbyPage";
import CodeBlockPage from "./routes/CodeBlockPage";
import { connect } from "socket.io-client";
import Header from "./components/Header";
import { useEffect, useState } from "react";

export const socket = connect("http://localhost:3001");

function App() {
  const [exercises, setExercises] = useState([
    { title: "", code: "", solution: "" },
  ]);

  useEffect(() => {
    fetch("http://localhost:3001/exercises")
      .then((response) => response.json())
      .then((data) => {
        setExercises(data);
      });
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LobbyPage exercises={exercises} />,
    },
    {
      path: "exercise/:id",
      element: <CodeBlockPage exercises={exercises} />,
    },
  ]);

  return (
    <ChakraProvider>
      <Grid templateAreas={`"header" "main"`}>
        <GridItem bg="orange" area={"header"}>
          <Header />
        </GridItem>
        <GridItem area={"main"} padding="48px">
          <RouterProvider router={router} />
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
