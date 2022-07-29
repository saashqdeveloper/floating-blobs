import "./styles.css";
import * as _ from "lodash";
import { blob, drag } from "./modules";

class Main {
  constructor() {
    this._init();
  }

  private _init() {
    blob.init(".blob", ".blob-content");
    drag.init("blobs");
  }
}
window.addEventListener("load", () => {
  const initialize = new Main();
});
