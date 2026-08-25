import "@mantine/core/styles.css";
import ky from "ky";
import { Container, Group, MantineProvider, Title } from "@mantine/core";
import { useEffect, useReducer } from "react";

interface Launch {
  mission_patch: string;
  mission_patch_small: string;
  mission_name: string;
  rocket_name: string;
  details: string;
}

function reducer() {}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function getLaunches() {
      const launches: Launch = await ky(
        "https://kata-spacex.onrender.com/api/launches ",
      ).json();
    }

    getLaunches();
  }, []);

  return (
    <MantineProvider>
      <Container size={"sm"}>
        <Title order={1} c={"black"} ta={"center"}>
          SpaceX Launches 2020
        </Title>
        <Group component={"ul"}></Group>
      </Container>
    </MantineProvider>
  );
}

export default App;
