import { ElementDimension, Position } from "../interfaces/index";
import { getRandomNumber } from "./randomGenerator";
import { gsap, Sine } from "gsap/all";

export class Blob {
  elBlobs: HTMLElement[] = [];
  prevX = 0;
  blobs: any = [];
  constructor() {}

  init() {
    document.querySelectorAll(".blob").forEach((blob: HTMLElement) => {
      this.positionBlob(blob);
    });
    this.renderFloatingBlobs();
  }

  positionBlob(element: HTMLElement) {
    this.elBlobs = [...this.elBlobs, element];
    const elDimension: ElementDimension = {
      width: element.offsetWidth,
      height: element.offsetHeight,
    };
    const position: Position = {
      posX: this.prevX + getRandomNumber(30, 200),
      posY: getRandomNumber(
        0,
        document.documentElement.scrollHeight - elDimension.height - 200
      ),
    };
    if (this.prevX === 0) {
      position.posX = 10;
    }
    element.style.transform = `translate3d(${position.posX}px,${position.posY}px, 0)`;

    this.prevX = position.posX + elDimension.width + 10;
  }

  private renderFloatingBlobs() {
    this.blobs = gsap.utils.toArray(".blob-content");
    this.blobs.forEach((element: any, i: number) => {
      this.floatX(element, 1);
      this.floatY(element, -3);
      this.rotate(element, 1);
    });
  }

  private floatY(target: HTMLElement, direction: number) {
    gsap.to(target, getRandomNumber(3, 5), {
      y: getRandomNumber(1, 10, direction),
      ease: Sine.easeInOut,
      onComplete: () => this.floatY(target, direction * -1),
      duration: 100,
    });
  }
  private floatX(target: HTMLElement, direction: number) {
    gsap.to(target, getRandomNumber(3, 5), {
      x: getRandomNumber(1, 50, direction),
      ease: Sine.easeInOut,
      onComplete: () => this.floatX(target, direction * -1),
      duration: 100,
    });
  }

  private rotate(target: HTMLElement, direction: number) {
    gsap.to(target, getRandomNumber(5, 10), {
      rotation: getRandomNumber(-10, 10, direction),
      ease: Sine.easeInOut,
      onComplete: () => this.floatY(target, direction * -1),
    });
  }
}

export const blob = new Blob();
