import "./components/DialogBox.js";

const container = document.querySelector(".container");

const dialogBox = document.createElement("dialog-box");
container.append(dialogBox);
dialogBox.setName("El Guardián");
dialogBox.setText("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure voluptatum vel accusamus vitae recusandae debitis molestias exercitationem quos molestiae ducimus error voluptates, quaerat omnis laboriosam animi a eveniet quidem quod? magni porro.");
