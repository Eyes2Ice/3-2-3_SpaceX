import styles from "./Overlay.module.css";

interface OverlayProps {
  onClick: () => void;
}

function Overlay({ onClick }: OverlayProps) {
  return <div onClick={onClick} className={styles.overlay}></div>;
}

export default Overlay;
