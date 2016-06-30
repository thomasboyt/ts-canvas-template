declare module "coquette" {

  /**
   * The interface for the Game object passed to Coquette.
   *
   * Think of this as a top level entity, which can be used to store pseudo-global state. Every
   * entity has a reference to this object, which can be used to access this state as well as
   * Coquette's entity and inputter APIs (through `this.game.c`).
   */
  export interface Game {
    c: Coquette;
    update?(dt: number): void;
  }

  /**
   * Used by anything in Coquette that involves coordinates, including entity position/sizing and
   * mouse coordinates.
   */
  export type Coordinates = {
    x: number;
    y: number;
  };

  /**
   * Specifies the collision bounding box to use.
   */
  // these should be kept in sync with the constants defined in Coquette:
  // https://github.com/maryrosecook/coquette/blob/master/src/collider.js#L81-L82
  export enum BoundingBox {
    Rectangle = 0,
    Circle    = 1,
  }

  /**
   * The base interface for entity objects.
   */
  export interface Entity {
    game: Game;
    center?: Coordinates;
    size?: Coordinates;
    angle?: number;
    zindex?: number;

    boundingBox?: BoundingBox;

    /*
     * Public interface
     */
    draw?(ctx: CanvasRenderingContext2D): void;
    update?(dt: number): void;
    collision?(other: Entity): void;
  }

  interface EntityClass<T, P> {
    // TODO: This isn't getting type-checked properly and I don't know why.
    new(game: Game, settings: P): T;
  }

  // This bit is really fucking weird and I kinda don't understand it.
  // See https://github.com/Microsoft/TypeScript/issues/7234 and React type defs for inspiration.
  // Also it doesn't properly check the passed settings for missing fields??? And lets you pass
  // "null"??? So idk wtf

  type ClassType<P, T, C> = C & (new(game: Game, settings: P) => T);

  interface Entities {
    /**
     * Creates an entity given its constructor and settings.
     */
    create<P, T, C extends EntityClass<T, P>>(
      ctor: ClassType<P, T, C>, settings: P): T;

    /**
     * Destroys the entity passed to it.
     */
    destroy(entity: Entity): void;

    /**
     * Returns all entities.
     */
    all(): Entity[];

    /**
     * Returns all entities of a given type.
     */
    all<T, P>(ctor: EntityClass<T, P>): T[];
  }

  interface Inputter {
    /**
     * Returns whether a given key code or mouse button is down.
     *
     * See inputter.js for predefined constants for keys/mouse buttons.
     */
    isDown(keyCode: number | string): boolean;

    /**
     * Returns whether a given key code or mouse button has been pressed.
     *
     * See inputter.js for predefined constants for keys/mouse buttons.
     */
    isPressed(keyCode: number | string): boolean;

    /**
     * Register a callback to be called with new pointer coordinates when the mouse moves.
     */
    bindMouseMove(cb: (position: Coordinates) => void): void;

    /**
     * Get the current mouse position.
     */
    getMousePosition(): Coordinates;
  }

  interface Renderer {
    /**
     * Get the current canvas context.
     */
    getCtx(): CanvasRenderingContext2D;

    /**
     * Set the view's center to translate the canvas by.
     */
    setViewCenter(Coordinates): void;
  }

  /**
   * The Coquette class, holding a Coquette instances's internal state and modules.
   */
  export default class Coquette {
    constructor(
      game: Game, canvasId: string, width: number, height: number, backgroundColor: string,
      autoFocus?: boolean);

    entities: Entities;
    inputter: Inputter;
    renderer: Renderer;
  }
}