import CanvasConfig from "./CanvasConfig";
import WorldConfig from "./WorldConfig";

class Petri {
  private worldConfig;
  private canvasConfig;

  private canvas;
  private context;

  private world;

  private seedFunction: Function | undefined;
  private stepFunction: Function | undefined;

  constructor(canvas: HTMLCanvasElement | null,
              worldConfig: WorldConfig,
              canvasConfig: CanvasConfig) {
    // initialize canvas context
    this.canvas = canvas;
    if (this.canvas === null) {
      console.error("Attempted to construct canvas renderer with null canvas.");
      return;
    }
    this.context = this.canvas.getContext("2d");

    // initialize settings
    this.worldConfig = worldConfig;
    this.canvasConfig = canvasConfig;

    // initialize world
    this.world = [];
    for (let i = 0; i < this.worldConfig.width; i++) {
      let col = [];
      for (let j = 0; j < this.worldConfig.height; j++) {
        col.push(worldConfig.default);
      }
      this.world.push(col);
    }
  }

  resetWorld = () => {
    if (!this.worldConfig || !this.world) {
      console.error("Reset is unavailable");
      return;
    }

    for (let i = 0; i < this.worldConfig.width; i++) {
      for (let j = 0; j < this.worldConfig.height; j++) {
        this.world[i][j] = this.worldConfig.default;
      }
    }
  }

  setSeedFunction = (seed: Function) => {
    this.seedFunction = seed;
  }

  setStepFunction = (step: Function) => {
    this.stepFunction = step;
  }

  seed = () => {
    if (!this.seedFunction) {
      console.error("Attempted to seed but seed function is undefined");
      return;
    }

    this.seedFunction();

    this.draw();
  }

  step = () => {
    if (!this.stepFunction) {
      console.error("Attempted to step but step function is undefined");
      return;
    }

    this.stepFunction();

    this.draw();
  }

  draw = () => {
    if (!this.context ||
        !this.worldConfig ||
        !this.canvasConfig ||
        !this.world) {
      console.error("Draw is unavailable")
      return;
    }

    for (let i = 0; i < this.worldConfig.width; i++) {
      for (let j = 0; j < this.worldConfig.height; j++) {
        // TODO: temp color system
        if (this.world[i][j] === 1) {
          this.context.fillStyle = "black";
        }
        else {
          this.context.fillStyle = "white";
        }

        this.context.fillRect(
          i * this.canvasConfig.scale,
          j * this.canvasConfig.scale,
          this.canvasConfig.scale,
          this.canvasConfig.scale
          );
      }
    }

    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvasConfig.scale, this.canvasConfig.scale);
  }

  setCell = (x: number, y: number, val: number) => {
    if (!this.worldConfig || !this.world) {
      console.error("Set cell is unavailable");
      return;
    }

    // keep in bounds
    if (x < 0 || x >= this.worldConfig.width ||
        y < 0 || y >= this.worldConfig.height) {
          return;
        }

    this.world[x][y] = val;
  }

  getCell = (x: number, y: number) => {
    if (!this.world) {
      console.error("Get cell is unavailable");
      return;
    }

    return this.world[x][y]; // TODO: very basic
  }
}

export default Petri;