import { typewriter } from "@/modules/typewriter.js";

import styles from "./DialogBox.css?raw";

class DialogBox extends HTMLElement {
  isTalking = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return styles;
  }

  connectedCallback() {
    this.render();
  }

  setName(name) {
    const nameContainer = this.shadowRoot.querySelector(".name");
    nameContainer.textContent = name;
  }

  setAvatar(name, image) {
    const imageElement = this.shadowRoot.querySelector(".avatar");
    imageElement.src = image;
    this.setName(name);
  }

  setText(text) {
    const textContainer = this.shadowRoot.querySelector("p");
    textContainer.textContent = text;
    this.isTalking = true;
    typewriter(textContainer, {
      speed: 35,
      fastMode: true,
      onEnd: () => (this.isTalking = false)
    });
  }

  render() {
    this.shadowRoot.setHTMLUnsafe(/* html */`
      <style>${DialogBox.styles}</style>
      <div class="container">
        <img class="avatar" src="images/guardian-full.png" alt="Guardián">
        <div class="dialog-box">
          <span class="name"></span>
          <p style="visibility: hidden"></p>
        </div>
      </div>
    `);
  }
}

customElements.define("dialog-box", DialogBox);
