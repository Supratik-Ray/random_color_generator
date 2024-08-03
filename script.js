"use strict";

const container = document.querySelector(".container");
const reload = document.querySelector(".reload");
console.log(reload);
const hex = "0123456789abcdef";

function getRandomColor() {
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += hex[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createColorBox(color) {
  const el = document.createElement("div");
  el.textContent = color;
  el.classList.add("color-box");
  el.style.backgroundColor = color;
  container.insertAdjacentElement("beforeend", el);
}

function renderColorBoxes() {
  container.innerHTML = "";
  for (let i = 0; i < 30; i++) {
    const ranColor = getRandomColor();
    createColorBox(ranColor);
  }
}

function copyText(el) {
  // Select the text inside the div
  const textToCopy = el.textContent;

  // Create a temporary input element
  const tempInput = document.createElement("input");
  tempInput.value = textToCopy;
  document.body.appendChild(tempInput);

  // Select the text in the temporary input
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); // For mobile devices

  // Copy the selected text
  navigator.clipboard.writeText(tempInput.value);

  // Remove the temporary input
  document.body.removeChild(tempInput);

  //create notification
  const notification = document.querySelector(".notification");
  notification.textContent = "Copied the hexcode: " + textToCopy + " !";
  notification.classList.add("show");

  // Hide the notification after 1 second
  setTimeout(function () {
    notification.classList.remove("show");
  }, 1000);
}

container.addEventListener("click", (e) => {
  if (!e.target.classList.contains("color-box")) return;
  copyText(e.target);
});

reload.addEventListener("click", function () {
  if (this.classList.contains("rotate")) return;
  this.classList.add("rotate");
  console.log("settimeout");
  setTimeout(() => this.classList.remove("rotate"), 400);
  renderColorBoxes();
});

renderColorBoxes();
