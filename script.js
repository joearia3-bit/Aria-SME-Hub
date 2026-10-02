"use strict";

/* =========================================
   ARIA SME HUB
   MAIN APPLICATION JAVASCRIPT
========================================= */

const BACKEND_URL =
  "https://script.google.com/macros/s/AKfycbyITnFHfh9oB4EMGbesmcrZEr1aBuRt6Fv9iC8tAT1Sgx04gZc1_O8JfCEOOrYy0F_RrQ/exec";

const screens = document.querySelectorAll(".screen");
const navLinks = document.querySelectorAll(".nav-link");
const goButtons = document.querySelectorAll("[data-go]");

const menuButton = document.getElementById("menuButton");
const mainNav = document.getElementById("mainNav");

const cameraInput = document.getElementById("cameraInput");
const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");
const scanPreview = document.getElementById("scanPreview");
const analyzeButton = document.getElementById("analyzeButton");
const scanStatus = document.getElementById("scanStatus");
const scanResults = document.getElementById("scanResults");
const analysisOutput = document.getElementById("analysisOutput");

const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");
const chatStatus = document.getElementById("chatStatus");


/* =========================================
   SCREEN MANAGEMENT
========================================= */

function showScreen(screenId) {
  const target = document.getElementById(screenId);

  if (!target || !target.classList.contains("screen")) {
    return;
  }

  screens.forEach((screen) => {
    screen.classList.toggle(
      "active",
      screen.id === screenId
    );
  });

  navLinks.forEach((link) => {
    const isActive =
      link.dataset.screen === screenId;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  if (mainNav) {
    mainNav.classList.remove("menu-open");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    showScreen(link.dataset.screen);
  });
});


goButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showScreen(button.dataset.go);
  });
});


/* =========================================
   MOBILE MENU
========================================= */

if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const isOpen =
      mainNav.classList.toggle("menu-open");

    menuButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );
  });
}


/* =========================================
   IMAGE SCANNER
========================================= */

let selectedImage = null;
let previewUrl = null;


function resetScanResults() {
  if (scanResults) {
    scanResults.hidden = true;
  }

  if (analysisOutput) {
    analysisOutput.textContent = "";
  }
}


function handleImageSelection(file) {
  if (!file) {
    return;
  }

  if (!file.type.startsWith("image/")) {
    scanStatus.textContent =
      "Please select a valid image.";
    return;
  }

  if (file.size > 15 * 1024 * 1024) {
    scanStatus.textContent =
      "Image is too large. Choose an image under 15 MB.";
    return;
  }

  selectedImage = file;

  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
  }

  previewUrl = URL.createObjectURL(file);

  previewImage.onload = () => {
    previewImage.hidden = false;

    const placeholder =
      scanPreview.querySelector(
        ".preview-placeholder"
      );

    if (placeholder) {
      placeholder.hidden = true;
    }

    analyzeButton.disabled = false;

    scanStatus.textContent =
      "Image ready. AI identification is not connected yet.";
  };

  previewImage.onerror = () => {
    selectedImage = null;

    analyzeButton.disabled = true;

    scanStatus.textContent =
      "Unable to display this image. Try another file.";
  };

  previewImage.src = previewUrl;

  resetScanResults();
}


if (cameraInput) {
  cameraInput.addEventListener("change", () => {
    handleImageSelection(
      cameraInput.files[0]
    );
  });
}


if (imageInput) {
  imageInput.addEventListener("change", () => {
    handleImageSelection(
      imageInput.files[0]
    );
  });
}


if (analyzeButton) {
  analyzeButton.addEventListener("click", () => {
    if (!selectedImage) {
      scanStatus.textContent =
        "Please select an image first.";
      return;
    }

    scanStatus.textContent =
      "Your image is ready, but AI image recognition is not connected yet.";

    scanResults.hidden = false;

    analysisOutput.textContent =
      "Your image has been loaded successfully. The next step is to connect Gemini so ARIA can identify the item and generate business opportunities.";
  });
}


/* =========================================
   CHAT
========================================= */

function addChatMessage(message, sender) {
  const bubble =
    document.createElement("div");

  bubble.className =
    sender === "user"
      ? "chat-bubble user-message"
      : "chat-bubble assistant-message";

  bubble.textContent = message;

  chatMessages.appendChild(bubble);

  chatMessages.scrollTop =
    chatMessages.scrollHeight;
}


/* =========================================
   TALK TO ARIA
   CONNECT TO GOOGLE APPS SCRIPT
========================================= */

if (chatForm) {
  chatForm.addEventListener(
    "submit",
    async (event) => {
      event.preventDefault();

      const message =
        chatInput.value.trim();

      if (!message) {
        return;
      }

      addChatMessage(
        message,
        "user"
      );

      chatInput.value = "";

      chatStatus.textContent =
        "Connecting to Aria...";

      try {
        const response =
          await fetch(
            BACKEND_URL,
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "text/plain;charset=utf-8"
              },
              body: JSON.stringify({
                message: message
              })
            }
          );

        if (!response.ok) {
          throw new Error(
            "Server returned " +
            response.status
          );
        }

        const data =
          await response.json();

        if (data.success) {
          addChatMessage(
            data.message,
            "assistant"
          );

          chatStatus.textContent =
            "Aria backend is connected.";
        } else {
          addChatMessage(
            "Aria received your message, but returned an error.",
            "assistant"
          );

          chatStatus.textContent =
            data.message ||
            "Backend error.";
        }

      } catch (error) {
        console.error(
          "ARIA backend error:",
          error
        );

        addChatMessage(
          "I could not connect to the ARIA AI service. Please check the connection.",
          "assistant"
        );

        chatStatus.textContent =
          "Connection failed. Please try again.";
      }
    }
  );
}


/* =========================================
   START APPLICATION
========================================= */

showScreen("home");

console.log(
  "ARIA SME HUB JavaScript loaded successfully."
);
