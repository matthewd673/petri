interface CanvasConfig {
  scale: number,
  delay: number,
  maxGens: number,
}

export const defaultCanvasConfig: CanvasConfig = {
  scale: 4,
  delay: 100,
  maxGens: 0,
}

export default CanvasConfig;