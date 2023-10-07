import { useState } from "react";
import PetriCanvas from "./components/PetriCanvas";
import LogicEditor from "./components/LogicEditor";
import ConfigurationPane from "./components/ConfigurationPane";
import { defaultWorldConfig } from "./utils/WorldConfig";
import { defaultCanvasConfig } from "./utils/CanvasConfig";
import styles from "./App.module.css";

const App = () => {
  const [code, setCode] = useState("");
  const [worldConfig, setWorldConfig] = useState(defaultWorldConfig);
  const [canvasConfig, setCanvasConfig] = useState(defaultCanvasConfig);

  return (
    <div>
      <h1 className={styles.title}>petri</h1>
      <div className={styles.sideBySide}>
        <PetriCanvas
          worldConfig={worldConfig}
          canvasConfig={canvasConfig}
          code={code}
          />
        <LogicEditor
          setCode={setCode}
          />
      </div>
      <ConfigurationPane
        worldConfig={worldConfig}
        setWorldConfig={setWorldConfig}
        canvasConfig={canvasConfig}
        setCanvasConfig={setCanvasConfig}
        />
    </div>
  );
}

export default App;
