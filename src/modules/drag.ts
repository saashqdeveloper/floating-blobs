import { gsap, Draggable } from "gsap/all";
gsap.registerPlugin(Draggable);
export class Drag {
  selector: HTMLElement;

  constructor() {}

  init(selector: string) {
    this.selector = document.getElementById(selector);
    Draggable.create(this.selector);
  }
}
export const drag = new Drag();
