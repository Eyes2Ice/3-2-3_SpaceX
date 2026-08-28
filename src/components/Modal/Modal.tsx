import { createPortal } from "react-dom";
import { Box, Group, Title, CloseButton, Text, Image } from "@mantine/core";
import type { Launch } from "../../App";
import styles from "./Modal.module.css";
import Overlay from "../Overlay/Overlay";
import { useEffect } from "react";

interface ModalProps extends Launch {
  onClose: () => void;
}

function Modal({
  links: { mission_patch },
  mission_name,
  rocket: { rocket_name },
  details,
  onClose,
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const modalElement = document.getElementById("modal");

  if (!modalElement) return null;

  return createPortal(
    <>
      <Box className={styles.modal}>
        <Group className={styles["modal__top"]}>
          <Title order={2} fz={"lg"} fw={500}>
            {mission_name}
          </Title>
          <CloseButton onClick={onClose} />
        </Group>
        <Box className={styles["modal__img"]}>
          <Image src={mission_patch} />
        </Box>
        <Group className={styles["modal__info"]}>
          <Text>Mission name:</Text>
          <Text className={styles["modal__text"]}>{mission_name}</Text>
        </Group>
        <Group className={styles["modal__info"]}>
          <Text>Rocket name:</Text>
          <Text className={styles["modal__text"]}>{rocket_name}</Text>
        </Group>
        <Group className={styles["modal__info"]}>
          <Text>Details:</Text>
          <Text className={styles["modal__text"]}>{details}</Text>
        </Group>
      </Box>
      <Overlay onClick={onClose} />
    </>,

    modalElement,
  );
}

export default Modal;
