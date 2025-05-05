const ENDPOINT_URL = "http://172.21.0.1:11434/api/generate";

const fetchOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  }
};

export class OllamaClient {
  modelName = null;

  constructor(modelName) {
    this.setModel(modelName);
  }

  setModel(modelName) {
    this.modelName = modelName;
  }

  async ask(question) {
    const body = JSON.stringify({
      model: this.modelName,
      stream: false,
      prompt: question
    });
    const response = await fetch(ENDPOINT_URL, { ...fetchOptions, body });
    const data = await response.json();
    return data;
  }
}
