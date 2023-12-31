import CanvasConfig from "./CanvasConfig";
import WorldConfig from "./WorldConfig";

class Petri {
  private worldConfig;
  private canvasConfig;

  private canvas;
  private context;

  private world;

  private lastFrameTime = 0;
  private currentSteps = 0;
  private canAnimate = false;

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

    // stop animating
    this.lastFrameTime = 0;
    this.currentSteps = 0;
    this.canAnimate = false;

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
    if (!this.canvasConfig) {
      console.error("Animate is unavailable");
      return;
    }

    // done when max is reached or animation is paused
    if (!this.canAnimate ||
        (this.canvasConfig.maxGens > 0 &&
         this.currentSteps >= this.canvasConfig.maxGens)) {
      return;
    }

    // delay animation
    if (time - this.lastFrameTime < this.canvasConfig.delay) {
      window.requestAnimationFrame(this.animate);
      return;
    }

    // perform steps and continue animating
    this.lastFrameTime = time;
    this.stepAll();
    this.currentSteps += 1;

    window.requestAnimationFrame(this.animate);
  };

  play = () => {
    this.canAnimate = true;
    this.animate(0);
  }

  pause = () => {
    this.canAnimate = false;
  }

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
        const color = this.colorFunction(this.world[i][j]);
        this.context.fillStyle = `rgb(${color[0]},${color[1]},${color[2]})`;

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

    if (!this.worldConfig.oobWrap) {
      return this.worldConfig.oobValue;
    }
    else {
      return this.world[x % this.worldConfig.width][y % this.worldConfig.height];
    }
  }
}

export default Petri;