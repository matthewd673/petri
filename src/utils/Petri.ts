import CanvasConfig from "./CanvasConfig";
import WorldConfig from "./WorldConfig";

class Petri {
  private worldConfig;
  private canvasConfig;

  private canvas;
  private context;

  private world;

  private lastFrameTime = 0;

  private seedFunction: Function | undefined;
  private stepFunction: Function | undefined;
  private colorFunction: Function | undefined;

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

  setColorFunction = (color: Function) => {
    this.colorFunction = color;
  }

  seed = () => {
    if (!this.worldConfig ||
        !this.world) {
          console.error("Unavailable to step");
          return;
    }

    if (!this.seedFunction) {
      console.error("Attempted to seed but seed function is undefined");
      return;
    }

    for (let i = 0; i < this.worldConfig.width; i++) {
      for (let j = 0; j < this.worldConfig.height; j++) {
        this.world[i][j] = this.seedFunction(i, j);
      }
    }

    this.draw();
  }

  stepAll = () => {
    if (!this.worldConfig ||
        !this.world) {
          console.error("Unavailable to step");
          return;
    }

    if (!this.stepFunction) {
      console.error("Attempted to step but step function is undefined");
      return;
    }

    for (let i = 0; i < this.worldConfig.width; i++) {
      for (let j = 0; j < this.worldConfig.height; j++) {
        this.world[i][j] = this.stepFunction(i, j);
      }
    }

    this.draw();
  }

  animate = (time: number) => {
    if (time - this.lastFrameTime < 100) { // 100ms delay
      window.requestAnimationFrame(this.animate);
      return;
    }
    this.lastFrameTime = time;
    this.stepAll();
    window.requestAnimationFrame(this.animate);
  };

  draw = () => {
    if (!this.context ||
        !this.worldConfig ||
        !this.canvasConfig ||
        !this.world ||
        !this.colorFunction) {
      console.error("Draw is unavailable")
      return;
    }

    for (let i = 0; i < this.worldConfig.width; i++) {
      for (let j = 0; j < this.worldConfig.height; j++) {
        this.context.fillStyle = this.colorFunction(this.world[i][j]);
        // this.context.fillStyle = "rgb(100, 0, 0)";

        this.context.fillRect(
          i * this.canvasConfig.scale,
          j * this.canvasConfig.scale,
          this.canvasConfig.scale,
          this.canvasConfig.scale
          );
      }
    }
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
    if (!this.world ||
        !this.worldConfig) {
      console.error("Get cell is unavailable");
      return;
    }

    if (x >= 0 && x < this.worldConfig.width &&
        y >= 0 && y < this.worldConfig.height) {
          return this.world[x][y];
        }

    return this.worldConfig.oobValue; // TODO: oobWrap

  }
}

export default Petri;