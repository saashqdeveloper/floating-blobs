import { ElementDimension, Position } from "../interfaces/index";
import { getRandomNumber } from "../utils/";
import { gsap } from "gsap/all";

declare const mt: any;
export class Blob {
  elBlobs: HTMLElement[] = [];
  prevX = 0;
  blobs: any = [];
  sizes: number[] = [100, 200, 300];
  blobSelector: string;
  floatElSelector: string;
  constructor() {}

  init(blobElementClass: string, floatElementClass: string) {
    this.blobSelector = blobElementClass;
    this.floatElSelector = floatElementClass;
    document.querySelectorAll(this.blobSelector).forEach((blob: Element) => {
      this.positionBlob(<HTMLElement>blob);
    });
    this.renderFloatingBlobs();
  }

  positionBlob(element: HTMLElement) {
    // assign random size
    const size = this.sizes[Math.floor(getRandomNumber(0, this.sizes.length))];
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;

    this.elBlobs = [...this.elBlobs, element];

    // assign random positions
    const elDimension: ElementDimension = {
      width: element.offsetWidth,
      height: element.offsetHeight,
    };
    const position: Position = {
      posX: this.prevX + Math.floor(getRandomNumber(30, 200)),
      posY: Math.floor(
        getRandomNumber(
          0,
          document.documentElement.scrollHeight - elDimension.height - 200
        )
      ),
    };
    if (this.prevX === 0) {
      position.posX = 10;
    }
    console.log(position);
    gsap.to(element, 0, {
      x: position.posX,
      y: position.posY,
      z: 0,
      opacity: 1,
      stagger: 0.5,
    });

    this.prevX = position.posX + elDimension.width + 10;
  }

  private renderFloatingBlobs() {
    this.blobs = gsap.utils.toArray(this.floatElSelector);
    gsap.from(this.blobs, { opacity: 0, stagger: 0.5 });
    this.blobs.forEach((element: any, i: number) => {
      this.floatX(element, 1);
      this.floatY(element, -3);
      this.rotate(element, 1);
    });
  }

  private floatY(target: HTMLElement, direction: number) {
    gsap.to(target, getRandomNumber(3, 5), {
      y: getRandomNumber(1, 10, direction),
      ease: "easeInOut",
      onComplete: () => this.floatY(target, direction * -1),
      duration: 100,
    });
  }
  private floatX(target: HTMLElement, direction: number) {
    gsap.to(target, getRandomNumber(3, 5), {
      x: getRandomNumber(1, 50, direction),
      ease: "easeInOut",
      onComplete: () => this.floatX(target, direction * -1),
      duration: 100,
    });
  }

  private rotate(target: HTMLElement, direction: number) {
    gsap.to(target, getRandomNumber(5, 10), {
      rotation: getRandomNumber(-10, 10, direction),
      ease: "easeInOut",
      onComplete: () => this.floatY(target, direction * -1),
    });
  }
}

export const blob = new Blob();
