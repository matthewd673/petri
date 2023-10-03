import React, { useState } from "react";
import PetriCanvas from "./components/PetriCanvas";
import LogicEditor from "./components/LogicEditor";
import ConfigurationPane from "./components/ConfigurationPane";
import { defaultWorldConfig } from "./utils/WorldConfig";
import { defaultCanvasConfig } from "./utils/CanvasConfig";

const App = () => {
  const [code, setCode] = useState("");
  const [worldConfig, setWorldConfig] = useState(defaultWorldConfig);
  const [canvasConfig, setCanvasConfig] = useState(defaultCanvasConfig);

  return (
    <div>
      <h1>petri</h1>
      <PetriCanvas
        worldConfig={worldConfig}
        canvasConfig={canvasConfig}
        code={code}
        />
      <ConfigurationPane
        worldConfig={worldConfig}
        setWorldConfig={setWorldConfig}
        canvasConfig={canvasConfig}
        setCanvasConfig={setCanvasConfig}
        />
      <LogicEditor
        setCode={setCode}
      />
    </div>
  );
}

export default App;
