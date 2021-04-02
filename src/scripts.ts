import "./styles.css";
import * as _ from "lodash";
import { blob } from "./modules/blob";

class Main {
  constructor() {
    this._init();
  }

  private _init() {
    blob.init();
  }
}
window.addEventListener("load", () => {
  const initialize = new Main();
});
