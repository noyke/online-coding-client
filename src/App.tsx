import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import { connect } from "socket.io-client";

import CodeBlockPage from "./routes/CodeBlockPage";
import LobbyPage from "./routes/LobbyPage";
import Header from "./components/Header";
import Loader from "./components/Loader";
import { IExercise } from "./types/exercise";
import theme from "./theme";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const socket = connect(SERVER_URL);

function App() {
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(SERVER_URL + "/exercises")
      .then((response) => response.json())
      .then((data) => {
        setExercises(data);
        setLoading(false);
      });
  }, []);

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
    <ChakraProvider theme={theme}>
      <Grid templateAreas={`"header" "main"`}>
        <GridItem bg="orange" area={"header"}>
          <Header />
        </GridItem>
        <GridItem area={"main"} padding="48px">
          {loading ? <Loader /> : <RouterProvider router={router} />}
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
