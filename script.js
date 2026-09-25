/* =========================================================
   ARIA SME HUB
   MAIN APPLICATION JAVASCRIPT
   ========================================================= */

"use strict";


/* =========================================================
   SCREEN MANAGEMENT
   ========================================================= */

const screens = document.querySelectorAll(".screen");
const navItems = document.querySelectorAll(".nav-item");


function showScreen(screenName) {

    screens.forEach(function (screen) {
        screen.classList.remove("active");
    });

    const target = document.getElementById(
        screenName + "Screen"
    );

    if (target) {
        target.classList.add("active");
    }

    navItems.forEach(function (item) {
        item.classList.remove("active");

        if (item.dataset.nav === screenName) {
            item.classList.add("active");
        }
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}



/* =========================================================
   HOME
   ========================================================= */

const homeButton = document.getElementById("homeButton");

if (homeButton) {

    homeButton.addEventListener("click", function () {
        showScreen("home");
    });

}



/* =========================================================
   BOTTOM NAVIGATION
   ========================================================= */

navItems.forEach(function (item) {

    item.addEventListener("click", function () {

        const destination = item.dataset.nav;

        if (!destination) {
            return;
        }

        showScreen(destination);

    });

});



/* =========================================================
   BACK BUTTONS
   ========================================================= */

const backButtons =
    document.querySelectorAll(".back-button");


backButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const destination =
            button.dataset.back || "home";

        showScreen(destination);

    });

});



/* =========================================================
   TALK TO ARIA
   ========================================================= */

const talkButton =
    document.getElementById("talkButton");


if (talkButton) {

    talkButton.addEventListener("click", function () {

        showScreen("chat");

        setTimeout(function () {

            const input =
                document.getElementById("chatInput");

            if (input) {
                input.focus();
            }

        }, 300);

    });

}



/* =========================================================
   CHAT
   ========================================================= */

const chatForm =
    document.getElementById("chatForm");

const chatInput =
    document.getElementById("chatInput");

const chatMessages =
    document.getElementById("chatMessages");


function addMessage(text, type) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "message " +
        (type === "user"
            ? "user-message"
            : "aria-message");


    const avatar =
        document.createElement("div");

    avatar.className =
        "message-avatar";

    avatar.textContent =
        type === "user" ? "U" : "A";


    const content =
        document.createElement("div");

    content.className =
        "message-content";


    const name =
        document.createElement("strong");

    name.textContent =
        type === "user" ? "YOU" : "ARIA";


    const paragraph =
        document.createElement("p");

    paragraph.textContent = text;


    content.appendChild(name);
    content.appendChild(paragraph);

    wrapper.appendChild(avatar);
    wrapper.appendChild(content);

    chatMessages.appendChild(wrapper);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}



function addTypingMessage() {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "message aria-message typing-message";

    wrapper.id =
        "typingMessage";


    const avatar =
        document.createElement("div");

    avatar.className =
        "message-avatar";

    avatar.textContent = "A";


    const content =
        document.createElement("div");

    content.className =
        "message-content";


    const name =
        document.createElement("strong");

    name.textContent = "ARIA";


    const paragraph =
        document.createElement("p");

    paragraph.textContent =
        "ARIA is thinking...";


    content.appendChild(name);
    content.appendChild(paragraph);

    wrapper.appendChild(avatar);
    wrapper.appendChild(content);

    chatMessages.appendChild(wrapper);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}



function removeTypingMessage() {

    const typing =
        document.getElementById("typingMessage");

    if (typing) {
        typing.remove();
    }

}



/* =========================================================
   AI REQUEST
   ========================================================= */

async function askARIA(message) {

    addTypingMessage();


    try {

        const response =
            await fetch("/api/chat", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: message
                })

            });


        const data =
            await response.json();


        removeTypingMessage();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "ARIA could not process the request."
            );

        }


        if (data.reply) {

            addMessage(
                data.reply,
                "aria"
            );

        } else {

            addMessage(
                "ARIA did not return a response.",
                "aria"
            );

        }


    } catch (error) {

        removeTypingMessage();


        addMessage(
            "ARIA AI is not connected to the server yet. The interface is ready, but the AI server still needs to be connected.",
            "aria"
        );

        console.error(
            "ARIA AI error:",
            error
        );

    }

}



/* =========================================================
   CHAT FORM
   ========================================================= */

if (chatForm) {

    chatForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const message =
                chatInput.value.trim();


            if (!message) {
                return;
            }


            addMessage(
                message,
                "user"
            );


            chatInput.value = "";

            chatInput.style.height =
                "auto";


            await askARIA(message);

        }
    );

}



/* =========================================================
   AUTO RESIZE CHAT BOX
   ========================================================= */

if (chatInput) {

    chatInput.addEventListener(
        "input",
        function () {

            this.style.height = "auto";

            this.style.height =
                Math.min(
                    this.scrollHeight,
                    140
                ) + "px";

        }
    );

}



/* =========================================================
   VOICE INPUT
   ========================================================= */

const voiceButton =
    document.getElementById("voiceButton");


if (voiceButton) {

    voiceButton.addEventListener(
        "click",
        function () {

            const SpeechRecognition =
                window.SpeechRecognition ||
                window.webkitSpeechRecognition;


            if (!SpeechRecognition) {

                addMessage(
                    "Voice input is not supported by this browser. You can type your message instead.",
                    "aria"
                );

                return;
            }


            const recognition =
                new SpeechRecognition();


            recognition.lang = "en-US";

            recognition.interimResults = false;

            recognition.continuous = false;


            voiceButton.classList.add(
                "recording"
            );


            recognition.start();


            recognition.onresult =
                function (event) {

                    const spokenText =
                        event.results[0][0].transcript;

                    chatInput.value =
                        spokenText;

                    chatInput.focus();

                };


            recognition.onerror =
                function (event) {

                    console.error(
                        "Voice error:",
                        event.error
                    );

                };


            recognition.onend =
                function () {

                    voiceButton.classList.remove(
                        "recording"
                    );

                };

        }
    );

}



/* =========================================================
   SCAN WITH ARIA
   ========================================================= */

const scanButton =
    document.getElementById("scanButton");

const bottomScan =
    document.getElementById("bottomScan");


function openScanner() {

    showScreen("scanner");

}


if (scanButton) {

    scanButton.addEventListener(
        "click",
        openScanner
    );

}


if (bottomScan) {

    bottomScan.addEventListener(
        "click",
        openScanner
    );

}



/* =========================================================
   CAMERA / IMAGE SELECTION
   ========================================================= */

const cameraButton =
    document.getElementById("cameraButton");

const imageButton =
    document.getElementById("imageButton");

const imageInput =
    document.getElementById("imageInput");

const hiddenCameraInput =
    document.getElementById(
        "hiddenCameraInput"
    );


if (cameraButton) {

    cameraButton.addEventListener(
        "click",
        function () {

            hiddenCameraInput.click();

        }
    );

}


if (imageButton) {

    imageButton.addEventListener(
        "click",
        function () {

            imageInput.click();

        }
    );

}



function processImage(file) {

    if (!file) {
        return;
    }


    if (!file.type.startsWith("image/")) {

if (imageButton && imageInput) {
    imageButton.addEventListener("click", function (event) {
        event.preventDefault();

        imageInput.value = "";
        imageInput.click();
    });

    imageInput.addEventListener("change", function () {
        if (!imageInput.files || imageInput.files.length === 0) {
            return;
        }

        const file = imageInput.files[0];

        if (!file.type.startsWith("image/")) {
            alert("Please choose an image file.");
            imageInput.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {
            if (scanPreview) {
                scanPreview.src = event.target.result;
                scanPreview.style.display = "block";
            }
        };

        reader.readAsDataURL(file);
    });
}

if (imageInput) {

    imageInput.addEventListener(
        "change",
        function () {

            processImage(
                this.files[0]
            );

        }
    );

}


if (hiddenCameraInput) {

    hiddenCameraInput.addEventListener(
        "change",
        function () {

            processImage(
                this.files[0]
            );

        }
    );

}



/* =========================================================
   SCAN QUESTIONS
   ========================================================= */

const scanQuestions =
    document.querySelectorAll(
        ".scan-question"
    );


scanQuestions.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const question =
                button.dataset.question;


            showScreen("chat");


            setTimeout(function () {

                chatInput.value =
                    question;

                chatInput.focus();

            }, 300);

        }
    );

});



/* =========================================================
   FEATURE SCREENS
   ========================================================= */

const featureCards =
    document.querySelectorAll(
        ".feature-card"
    );


featureCards.forEach(function (card) {

    card.addEventListener(
        "click",
        function () {

            const feature =
                card.dataset.feature;


            if (feature) {

                showScreen(feature);

            }

        }
    );

});



/* =========================================================
   MY BUSINESS
   ========================================================= */

const businessButton =
    document.getElementById(
        "businessButton"
    );


if (businessButton) {

    businessButton.addEventListener(
        "click",
        function () {

            showScreen("business");

        }
    );

}



/* =========================================================
   BUTTONS THAT OPEN CHAT WITH A QUESTION
   ========================================================= */

const chatOpenButtons =
    document.querySelectorAll(
        "[data-open-chat]"
    );


chatOpenButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const question =
                button.dataset.openChat;


            showScreen("chat");


            setTimeout(function () {

                chatInput.value =
                    question;

                chatInput.focus();

            }, 300);

        }
    );

});



/* =========================================================
   MENU
   ========================================================= */

const menuButton =
    document.getElementById(
        "menuButton"
    );


if (menuButton) {

    menuButton.addEventListener(
        "click",
        function () {

            showScreen("profile");

        }
    );

}



/* =========================================================
   KEYBOARD ESCAPE
   ========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            showScreen("home");

        }

    }
);



/* =========================================================
   STARTUP
   ========================================================= */

console.log(
    "ARIA SME HUB loaded."
);
