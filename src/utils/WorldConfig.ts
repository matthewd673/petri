interface WorldConfig {
  width: number,
  height: number,
  default: number,
  oobValue: number,
  oobWrap: boolean,
}

export const defaultWorldConfig: WorldConfig = {
  width: 100,
  height: 100,
  default: 0,
  oobValue: 0,
  oobWrap: false,
}

export default WorldConfig;