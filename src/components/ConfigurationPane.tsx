import WorldConfig from "../utils/WorldConfig";
import CanvasConfig from "../utils/CanvasConfig";
import styles from "./ConfigurationPane.module.css"

interface ConfigurationPaneProps {
  worldConfig: WorldConfig,
  setWorldConfig: any,
  canvasConfig: CanvasConfig,
  setCanvasConfig: any,
}

const ConfigurationPane = ({
  worldConfig,
  setWorldConfig,
  canvasConfig,
  setCanvasConfig,
  } : ConfigurationPaneProps) => {
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      // world properties
      width: { value: number },
      height: { value: number },
      default: { value: number },
      oobValue: { value: number },
      oobWrap: { value: boolean },

      // canvas properties
      scale: { value: number },
      delay: { value: number },
      maxGens: { value: number},
    };

    setWorldConfig({
      width: target.width.value,
      height: target.height.value,
      default: target.default.value,
      oobValue: target.oobValue.value,
      oobWrap: target.oobWrap.value,
    });

    setCanvasConfig({
      scale: target.scale.value,
      delay: target.delay.value,
      maxSteps: target.maxGens.value,
    });
  }

  return (
    <div className={styles.configContainer}>
      <h2>Configuration</h2>
      <form onSubmit={handleSubmit} className={styles.configForm}>
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
          Cell scale (pixels):
          <input name="scale" type="number" defaultValue={4} />
        </label>
        <label>
          Step animation delay (ms):
          <input name="delay" type="number" defaultValue={100} />
        </label>
        <label>
          Max generations:
          <input name="maxGens" type="number" defaultValue={0} />
        </label>
        <br />
        <button type="submit" className={styles.submitButton}>Apply</button>
      </form>
    </div>
  )
}

export default ConfigurationPane;