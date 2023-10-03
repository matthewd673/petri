import { useEffect, useState, useRef } from "react";
import styles from "./PetriCanvas.module.css";
import { CanvasState } from "../utils/CanvasState";

interface PetriCanvasProps {
  width: number,
  height: number,
  scale: number,
  code: string,
}

const PetriCanvas = ({ width, height, scale, code } : PetriCanvasProps) => {
  const canvasRef = useRef(null);
  const [renderer, setRenderer] = useState<CanvasState | undefined>(undefined);

  // handle sizing and scaling changes
  useEffect(() => {
    setRenderer(new CanvasState(canvasRef?.current,
                                {
                                  width,
                                  height,
                                  scale
                                }));
    renderer?.draw();
  }, [width, height, scale]);

  useEffect(() => {
    console.log(code);
  }, [code]);

  return (
    <canvas
      className={styles.petriCanvas}
      ref={canvasRef}
      width={width * scale}
      height={height * scale}
      />
  );
}

export default PetriCanvas;