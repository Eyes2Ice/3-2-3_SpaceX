import "@mantine/core/styles.css";
import ky from "ky";
import { Container, Group, MantineProvider, Title } from "@mantine/core";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    async function getLaunches() {
      const launches = await ky(
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
