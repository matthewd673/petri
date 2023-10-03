import { FormEvent } from "react";

interface ConfigurationPaneProps {
  width: number,
  height: number,
  scale: number,
}

const ConfigurationPane = () => {
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      // world properties
      width: { value: number },
      height: { value: number },
      default: { value: number },
      oobValue: { value: number },
      oobWrap: { value: number },

      // canvas properties
      scale: { value: number },
    };

    console.log(target.width.value);
  }

  return (
    <div>
      <h2>Configuration</h2>
      <form onSubmit={handleSubmit}>
        <h3>World</h3>
        <label>
          Width (cells):
          <input name="width" type="number" defaultValue={100} />
        </label>
        <label>
          Height (cells):
          <input name="height" type="number" defaultValue={100} />
        </label>
        <label>
          Default value:
          <input name="default" type="number" defaultValue={0} />
        </label>
        <label>
          Out of bounds value:
          <input name="oobValue" type="number" defaultValue={0} />
        </label>
        <label>
          Wrap:
          <input name="oobWrap" type="checkbox" defaultChecked={false} />
        </label>
        <h3>Canvas</h3>
        <label>
          Scale (pixels):
          <input name="scale" type="number" defaultValue={4} />
        </label>
        <button type="submit">Apply</button>
      </form>
    </div>
  )
}

export default ConfigurationPane;