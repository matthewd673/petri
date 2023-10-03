interface CanvasStateProps {
  width: number,
  height: number,
  scale: number,
}

class CanvasState {
  private props;

  private canvas;
  private context;

  private world;

  constructor(canvas: HTMLCanvasElement | null,
              props: CanvasStateProps) {
    // initialize canvas context
    this.canvas = canvas;
    if (this.canvas === null) {
      console.error("Attempted to construct canvas renderer with null canvas.");
      return;
    }
    this.context = this.canvas.getContext("2d");

    // initialize settings
    this.props = props;

    // initialize world
    this.world = [];
    for (let i = 0; i < this.props.width; i++) {
      let col = [];
      for (let j = 0; j < this.props.height; j++) {
        col.push(0);
      }
      this.world.push(col);
    }
  }

  draw = () => {
    if (!this.context || !this.props) {
      return;
    }

    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.props.scale, this.props.scale);
  }

  setCell = (x: number, y: number, val: number) => {
    if (!this.props || !this.world) {
      console.error("Set cell failed");
      return;
    }

    // keep in bounds
    if (x < 0 || x >= this.props.width ||
        y < 0 || y >= this.props.height) {
          return;
        }

    this.world[x][y] = val;
  }
}

export { CanvasState };