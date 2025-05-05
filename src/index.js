import "./components/DialogBox.js";

import { client as twitchClient } from "https://unpkg.com/mtmi@0.0.3/dist/mtmi.js";

import { OllamaClient } from "./modules/OllamaClient.js";

const container = document.querySelector(".container");

const dialogBox = document.createElement("dialog-box");
container.append(dialogBox);
dialogBox.setName("El Guardián");

twitchClient.connect({ channels: ["manzdev"] });
const ollamaClient = new OllamaClient("gemma3:4b");

twitchClient.on("message", async ({ username, channel, message }) => {
  const p = Math.random();
  const { isTalking } = dialogBox;

  if (p > 0 && !isTalking) {
    const prompt = `

    Eres un usuario del chat de Twitch llamado "El Guardián del Hipertexto".

    Ahora, un usuario llamado ${username} ha escrito el siguiente mensaje: ${message}

    Respóndele en español con un mensaje breve (entre 1 y 200 caracteres), centrado en el tema de su mensaje. Tu respuesta debe parecer humana: varía el tono, usa expresiones coloquiales cuando tenga sentido, y no suenes robótico. Puedes mostrar ingenio, ironía o humor sutil, según el contexto. No uses emojis.

    Importancia del contenido del mensaje del usuario: 90%.
    Importancia de tu personalidad: 10%.
    Evita responder siempre de la misma forma.

    `;
    const { response } = await ollamaClient.ask(prompt);
    dialogBox.setText(`@${username}: ${message} ${response}`);
  }
});
