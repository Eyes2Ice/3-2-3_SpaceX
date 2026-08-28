import "@mantine/core/styles.css";
import Modal from "./components/Modal/Modal";
import ky from "ky";
import {
  Container,
  Group,
  MantineProvider,
  Title,
  Card,
  Image,
  Text,
  Button,
  Box,
} from "@mantine/core";
import { useEffect, useReducer } from "react";

export interface Launch {
  mission_name: string;
  details: string;
  rocket: {
    rocket_name: string;
  };
  links: {
    mission_patch: string;
    mission_patch_small: string;
  };
}

interface ApiResponse {
  launches: Launch[];
}

interface LaunchesState {
  launchesList: Launch[];
  currentLaunch: Launch | null;
  modalOpen: boolean;
}

const initialState = {
  launchesList: [],
  currentLaunch: null,
  modalOpen: false,
};

type LaunchesAction =
  | { type: "set_launches"; payload: Launch[] }
  | { type: "select_launch"; payload: Launch | null }
  | { type: "modal_close" };

function reducer(state: LaunchesState, action: LaunchesAction) {
  switch (action.type) {
    case "set_launches":
      return {
        ...state,
        launchesList: action.payload,
      };
    case "select_launch":
      return {
        ...state,
        currentLaunch: action.payload,
        modalOpen: true,
      };
    case "modal_close":
      return {
        ...state,
        currentLaunch: null,
        modalOpen: false,
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const controller = new AbortController();

    async function getLaunches() {
      try {
        const data = await ky(
          "https://kata-spacex.onrender.com/api/launches ",
          {
            signal: controller.signal,
          },
        ).json<ApiResponse>();

        dispatch({ type: "set_launches", payload: data.launches });
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Ошибка загрузки:", error);
        }
      }
    }

    getLaunches();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <MantineProvider>
      <Container size={"md"}>
        <Title order={1} c={"black"} ta={"center"}>
          SpaceX Launches 2020
        </Title>
        <Group style={{ justifyContent: "center" }} mt={20} component="ul">
          {state.launchesList.map((launch) => {
            return (
              <Card
                key={launch.mission_name}
                component="li"
                shadow="sm"
                padding="md"
                radius="md"
                withBorder
                style={{ alignItems: "center", gap: 10 }}
              >
                <Box style={{ maxWidth: "200px", aspectRatio: 1 }}>
                  <Image w="100%" src={launch.links.mission_patch_small} />
                </Box>
                <Title order={3}>{launch.mission_name}</Title>
                <Text opacity={0.5}>{launch.rocket.rocket_name}</Text>
                <Button
                  fullWidth
                  fz="md"
                  mt="15px"
                  onClick={() => {
                    dispatch({
                      type: "select_launch",
                      payload: launch,
                    });
                  }}
                >
                  See more
                </Button>
              </Card>
            );
          })}
        </Group>
      </Container>
      {state.modalOpen && state.currentLaunch && (
        <Modal
          {...state.currentLaunch}
          onClose={() => {
            dispatch({ type: "modal_close" });
          }}
        ></Modal>
      )}
    </MantineProvider>
  );
}

export default App;
