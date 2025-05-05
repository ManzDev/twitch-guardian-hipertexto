export const typewriter = (selector, options) => {
  const element = typeof selector === "string" ? document.querySelector(selector) : selector;
  const originalText = element.textContent;

  const defaultOptions = {
    speed: 50, // Velocidad de escritura (en milisegundos por carácter)
    cursor: true, // Mostrar cursor intermitente
    cursorAtEnd: true, // Mantener el cursor al finalizar
    blinkSpeed: 350, // Velocidad de parpadeo del cursor (en milisegundos)
    randomDelay: true, // Agregar retraso aleatorio entre caracteres
    fastMode: false, // Acelera en palabras y frena en espacios
    clsFix: true, // Solución para CLS (Cumulative Layout Shift)
    onEnd: () => {}
  };

  const getDelay = (char) => {
    if (settings.fastMode) {
      return (char === " " || char === ".") ? Math.floor(Math.random() * 100) : 5;
    }

    return settings.randomDelay ? Math.floor(Math.random() * 100) : 0;
  };

  const settings = { ...defaultOptions, ...options };
  let cursor;

  if (settings.cursor) {
    cursor = document.createElement("span");
    cursor.className = "cursor";
    cursor.textContent = "|";
    element.append(cursor);

    setInterval(() => {
      cursor.style.visibility = cursor.style.visibility === "hidden" ? "visible" : "hidden";
    }, settings.blinkSpeed);
  }

  let waitTime = 0;
  let time;
  for (let index = 1; index <= originalText.length; index++) {
    const char = originalText.at(index);
    const delay = getDelay(char);
    time = waitTime + delay;
    waitTime += delay + settings.speed;
    setTimeout(() => {
      element.textContent = originalText.slice(0, Math.max(0, index));
      element.append(cursor);
      index >= originalText.length && !settings.cursorAtEnd && cursor.remove();
    }, time);
  }
  setTimeout(() => settings.onEnd(), time);

  // Solución para CLS / FUOC
  if (settings.clsFix) {
    setTimeout(() => (element.style.visibility = "visible"), 100);
  }
};
