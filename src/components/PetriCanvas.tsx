import { useEffect, useState, useRef } from "react";
import styles from "./PetriCanvas.module.css";
import Petri from "../utils/Petri";
import WorldConfig from "../utils/WorldConfig";
import CanvasConfig from "../utils/CanvasConfig";

interface PetriCanvasProps {
  worldConfig: WorldConfig,
  canvasConfig: CanvasConfig,
  code: string,
}

interface CodeObject {
  artifact: any,
  callback: Function,
}

const PetriCanvas = ({ worldConfig, canvasConfig, code } : PetriCanvasProps) => {
  const canvasRef = useRef(null);

  const [petri, setPetri] = useState<Petri | undefined>(undefined);

  const [newCode, setNewCode] = useState(false);

  const buildCode = () => {
    if (!petri) {
      console.error("Build code is unavailable");
      return;
    }

    if (!newCode) {
      return;
    }

    // eslint-disable-next-line no-new-func
    const codeFunction = new Function(
      "get", "set",
      code);
    const codeObject = codeFunction(petri.getCell, petri.setCell);
    petri.setSeedFunction(codeObject.seed);
    petri.setStepFunction(codeObject.step);

    setNewCode(false);
  }

  // button handlers
  const handleReseedButton = () => {
    buildCode();
    petri?.seed();
  }

  const handlePlayButton = () => {
    buildCode();
    petri?.seed();
    petri?.step(); // TODO
  }

  // create new petri when config is updated
  useEffect(() => {
    setPetri(new Petri(canvasRef?.current,
                          worldConfig,
                          canvasConfig));
  }, [worldConfig, canvasConfig]);

  // draw initial state when petri is created
  useEffect(() => {
    if (!petri) {
      return;
    }

    petri.draw();
  }, [petri]);

  // handle code updates
  useEffect(() => {
    setNewCode(true);
  }, [code]);

  return (
    <div>
      <canvas
        className={styles.petriCanvas}
        ref={canvasRef}
        width={worldConfig.width * canvasConfig.scale}
        height={worldConfig.height * canvasConfig.scale}
        />
      <button onClick={handleReseedButton}>Re-seed</button>
      <button onClick={handlePlayButton}>Play</button>
      <button>Pause</button>
      <button>Stop</button>
      <button>Step</button>
    </div>
  );
}

export default PetriCanvas;