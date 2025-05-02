import styles from "./DialogBox.css?raw";

class DialogBox extends HTMLElement {
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

  setText(text) {
    const textContainer = this.shadowRoot.querySelector("p");
    textContainer.textContent = text;
  }

  render() {
    this.shadowRoot.setHTMLUnsafe(/* html */`
      <style>${DialogBox.styles}</style>
      <div class="dialog-box">
        <span class="name"></span>
        <p></p>
        <img class="avatar" src="images/guardian-full.png" alt="Guardián">
      </div>
    `);
  }
}

customElements.define("dialog-box", DialogBox);
