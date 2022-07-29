import { gsap, Draggable } from "gsap/all";
gsap.registerPlugin(Draggable);
export class Drag {
  selector: HTMLElement;

  constructor() {}

  init(selector: string) {
    this.selector = document.getElementById(selector);
    const container = document.getElementById("#blob-container");
    Draggable.create(this.selector, {
      bounds: container,
    });
  }
}
export const drag = new Drag();
