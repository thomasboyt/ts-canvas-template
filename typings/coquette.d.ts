declare module "coquette" {
  export class Game {
    constructor()
    update(dt: number): void;
  }

  type Coordinates = {
    x: number;
    y: number;
  };

  export enum BoundingBox {
    Rectangle,  // 0
    Circle,     // 1
  }

  export class Entity<Settings> {
    game: Game;
    center: Coordinates;
    size: Coordinates;
    angle: number;
    zindex: number;

    boundingBox: BoundingBox;

    /*
     * Public interface
     */
    draw(ctx: CanvasRenderingContext2D): void;
    update(dt: number): void;
    collision(other: Entity<any>): void;
  }

  // This bit is really fucking weird and I kinda don't understand it.
  // See https://github.com/Microsoft/TypeScript/issues/7234 and React type defs for inspiration.
  // Also it doesn't properly check the passed settings for missing fields??? And lets you pass
  // "null"??? So idk wtf

  type ClassType<P, T, C> = C & (new(settings: P) => T);

  interface EntityClass<T, P> {
    new(settings: P): T;
  }

  interface Entities {
    create<P, T, C extends EntityClass<T, P>>(
      ctor: ClassType<P, T, C>, settings: P): T;
    destroy(entity: Entity<any>): void;

    all(): Entity<any>[];
    all<T, P>(ctor: EntityClass<T, P>): T[];
  }

  interface Inputter {
    isDown(keyCode: number): boolean;
    isPressed(keyCode: number): boolean;
    bindMouseMove(cb: (position: Coordinates) => void): void;
    getMousePosition(): Coordinates;
  }

  interface Renderer {
    getCtx(): CanvasRenderingContext2D;
    setViewCenter(Coordinates): void;
  }

  export default class Coquette {
    constructor(game: Game, canvasId: string, width: number, height: number, backgroundColor: string);

    entities: Entities;
    inputter: Inputter;
    renderer: Renderer;
  }
}