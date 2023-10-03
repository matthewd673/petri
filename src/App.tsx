import React, { useState } from "react";
import PetriCanvas from "./components/PetriCanvas";
import LogicEditor from "./components/LogicEditor";
import ConfigurationPane from "./components/ConfigurationPane";

const App = () => {
  const [code, setCode] = useState("");

  return (
    <div>
      <h1>petri</h1>
      <PetriCanvas
        width={400}
        height={300}
        scale={2}
        code={code}
        />
      <ConfigurationPane />
      <LogicEditor
        setCode={setCode}
      />
    </div>
  );
}

export default App;
