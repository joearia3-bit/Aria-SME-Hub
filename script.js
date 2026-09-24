/* =========================================
   ARIA SME HUB
   MAIN JAVASCRIPT
   BUILD 1 — INTERACTION FOUNDATION
========================================= */


/* =========================================
   GET ELEMENTS
========================================= */

const scanButton = document.getElementById("scanButton");
const talkButton = document.getElementById("talkButton");
const bottomScan = document.getElementById("bottomScan");

const businessButton = document.getElementById("businessButton");

const messageModal = document.getElementById("messageModal");
const closeModal = document.getElementById("closeModal");

const modalIcon = document.getElementById("modalIcon");
const modalTitle = document.getElementById("modalTitle");
const modalMessage = document.getElementById("modalMessage");
const modalAction = document.getElementById("modalAction");

const menuButton = document.getElementById("menuButton");


/* =========================================
   ARIA MODAL
========================================= */

function showMessage(
    icon,
    title,
    message,
    actionText = "Continue"
) {

    if (!messageModal) {
        return;
    }

    if (modalIcon) {
        modalIcon.textContent = icon;
    }

    if (modalTitle) {
        modalTitle.textContent = title;
    }

    if (modalMessage) {
        modalMessage.textContent = message;
    }

    if (modalAction) {
        modalAction.textContent = actionText;
    }

    messageModal.classList.remove("hidden");
}


function hideMessage() {

    if (!messageModal) {
        return;
    }

    messageModal.classList.add("hidden");
}


/* =========================================
   SCAN WITH ARIA
========================================= */

function openScanner() {

    showMessage(
        "📷",
        "SCAN WITH ARIA",
        "Camera and AI Vision will be connected here. You will be able to show ARIA a product, resource, document or object and ask what you can do with it.",
        "Got it"
    );

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


/* =========================================
   TALK TO ARIA
========================================= */

if (talkButton) {

    talkButton.addEventListener(
        "click",
        function () {

            showMessage(
                "🎤",
                "TALK TO ARIA",
                "Voice and text conversation with ARIA will be connected here. ARIA will understand your request and respond in English.",
                "Continue"
            );

        }
    );

}


/* =========================================
   FEATURE CARDS
========================================= */

const featureCards =
    document.querySelectorAll(".feature-card");


featureCards.forEach(function (card) {

    card.addEventListener(
        "click",
        function () {

            const feature =
                card.dataset.feature;

            openFeature(feature);

        }
    );

});


function openFeature(feature) {

    const features = {

        opportunities: {

            icon: "💡",

            title: "OPPORTUNITIES",

            message:
                "ARIA will discover opportunities based on your resources, skills, location, interests and available capital."

        },


        buyers: {

            icon: "🛒",

            title: "FIND BUYERS",

            message:
                "ARIA will help research potential local, PNG and international buyer leads for products and services."

        },


        partners: {

            icon: "🤝",

            title: "FIND PARTNERS",

            message:
                "ARIA will match complementary resources, skills, businesses and people who may be able to work together."

        },


        global: {

            icon: "🌎",

            title: "GLOBAL MARKET",

            message:
                "ARIA will research potential international markets, buyer categories, market information and export considerations."

        }

    };


    const selected =
        features[feature];


    if (!selected) {
        return;
    }


    showMessage(
        selected.icon,
        selected.title,
        selected.message,
        "Continue"
    );

}


/* =========================================
   MY BUSINESS
========================================= */

if (businessButton) {

    businessButton.addEventListener(
        "click",
        function () {

            showMessage(
                "🏢",
                "MY BUSINESS",
                "Your future ARIA business workspace will connect products, inventory, customers, suppliers, sales, expenses and business intelligence.",
                "Continue"
            );

        }
    );

}


/* =========================================
   BOTTOM NAVIGATION
========================================= */

const navItems =
    document.querySelectorAll(".nav-item");


navItems.forEach(function (item) {

    item.addEventListener(
        "click",
        function () {

            const navigation =
                item.dataset.nav;


            if (!navigation) {
                return;
            }


            if (navigation === "opportunities") {

                showMessage(
                    "💡",
                    "EXPLORE",
                    "Your personalised opportunity feed will appear here.",
                    "Continue"
                );

            }


            if (navigation === "business") {

                showMessage(
                    "🏢",
                    "BUSINESS",
                    "Your complete SME workspace will appear here.",
                    "Continue"
                );

            }


            if (navigation === "profile") {

                showMessage(
                    "👤",
                    "PROFILE",
                    "Your skills, resources, interests, location and preferences will be stored here.",
                    "Continue"
                );

            }

        }
    );

});


/* =========================================
   MENU BUTTON
========================================= */

if (menuButton) {

    menuButton.addEventListener(
        "click",
        function () {

            showMessage(
                "☰",
                "ARIA MENU",
                "Account settings, help, notifications, safety and other ARIA SME HUB tools will appear here.",
                "Continue"
            );

        }
    );

}


/* =========================================
   CLOSE MODAL
========================================= */

if (closeModal) {

    closeModal.addEventListener(
        "click",
        hideMessage
    );

}


if (modalAction) {

    modalAction.addEventListener(
        "click",
        hideMessage
    );

}


/* =========================================
   CLOSE WHEN CLICKING OUTSIDE
========================================= */

if (messageModal) {

    messageModal.addEventListener(
        "click",
        function (event) {

            if (event.target === messageModal) {

                hideMessage();

            }

        }
    );

}


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            hideMessage();

        }

    }
);


/* =========================================
   ARIA STARTUP
========================================= */

console.log(
    "ARIA SME HUB loaded successfully."
);

console.log(
    "Advanced AI, camera, voice, database and opportunity systems will connect through the backend."
);


/* =========================================
   JAVASCRIPT CONNECTION TEST
========================================= */

alert("ARIA JavaScript is connected.");========================================= */

if (talkButton) {

    talkButton.addEventListener(
        "click",
        function () {

            showMessage(
                "🎤",
                "TALK TO ARIA",
                "Voice and text conversation with ARIA will be connected here. ARIA will understand your request and respond in English.",
                "Continue"
            );

        }
    );

}


/* =========================================
   FEATURE CARDS
========================================= */

const featureCards =
    document.querySelectorAll(".feature-card");


featureCards.forEach(function (card) {

    card.addEventListener(
        "click",
        function () {

            const feature =
                card.dataset.feature;

            openFeature(feature);

        }
    );

});


function openFeature(feature) {

    const features = {

        opportunities: {

            icon: "💡",

            title: "OPPORTUNITIES",

            message:
                "ARIA will discover opportunities based on your resources, skills, location, interests and available capital."

        },


        buyers: {

            icon: "🛒",

            title: "FIND BUYERS",

            message:
                "ARIA will help research potential local, PNG and international buyer leads for products and services."

        },


        partners: {

            icon: "🤝",

            title: "FIND PARTNERS",

            message:
                "ARIA will match complementary resources, skills, businesses and people who may be able to work together."

        },


        global: {

            icon: "🌎",

            title: "GLOBAL MARKET",

            message:
                "ARIA will research potential international markets, buyer categories, market information and export considerations."

        }

    };


    const selected =
        features[feature];


    if (!selected) {
        return;
    }


    showMessage(
        selected.icon,
        selected.title,
        selected.message,
        "Continue"
    );

}


/* =========================================
   MY BUSINESS
========================================= */

if (businessButton) {

    businessButton.addEventListener(
        "click",
        function () {

            showMessage(
                "🏢",
                "MY BUSINESS",
                "Your future ARIA business workspace will connect products, inventory, customers, suppliers, sales, expenses and business intelligence.",
                "Continue"
            );

        }
    );

}


/* =========================================
   BOTTOM NAVIGATION
========================================= */

const navItems =
    document.querySelectorAll(".nav-item");


navItems.forEach(function (item) {

    item.addEventListener(
        "click",
        function () {

            const navigation =
                item.dataset.nav;


            if (!navigation) {
                return;
            }


            if (navigation === "opportunities") {

                showMessage(
                    "💡",
                    "EXPLORE",
                    "Your personalised opportunity feed will appear here.",
                    "Continue"
                );

            }


            if (navigation === "business") {

                showMessage(
                    "🏢",
                    "BUSINESS",
                    "Your complete SME workspace will appear here.",
                    "Continue"
                );

            }


            if (navigation === "profile") {

                showMessage(
                    "👤",
                    "PROFILE",
                    "Your skills, resources, interests, location and preferences will be stored here.",
                    "Continue"
                );

            }

        }
    );

});


/* =========================================
   MENU BUTTON
========================================= */

if (menuButton) {

    menuButton.addEventListener(
        "click",
        function () {

            showMessage(
                "☰",
                "ARIA MENU",
                "Account settings, help, notifications, safety and other ARIA SME HUB tools will appear here.",
                "Continue"
            );

        }
    );

}


/* =========================================
   CLOSE MODAL
========================================= */

if (closeModal) {

    closeModal.addEventListener(
        "click",
        hideMessage
    );

}


if (modalAction) {

    modalAction.addEventListener(
        "click",
        hideMessage
    );

}


/* =========================================
   CLOSE WHEN CLICKING OUTSIDE
========================================= */

if (messageModal) {

    messageModal.addEventListener(
        "click",
        function (event) {

            if (event.target === messageModal) {

                hideMessage();

            }

        }
    );

}


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            hideMessage();

        }

    }
);


/* =========================================
   ARIA STARTUP
========================================= */

console.log(
    "ARIA SME HUB loaded successfully."
);

console.log(
    "Advanced AI, camera, voice, database and opportunity systems will connect through the backend."
);


/* =========================================
   JAVASCRIPT CONNECTION TEST
========================================= */

alert("ARIA JavaScript is connected.");
    opportunities: {
        icon: "💡",
        title: "OPPORTUNITIES",
        message:
            "ARIA will discover opportunities based on your resources, skills, location, interests and available capital."
    },

    buyers: {
        icon: "🛒",
        title: "FIND BUYERS",
        message:
            "ARIA will help research potential local, PNG and international buyer leads for products and services."
    },

    partners: {
        icon: "🤝",
        title: "FIND PARTNERS",
        message:
            "ARIA will match complementary resources, skills, businesses and people who may be able to work together."
    },

    global: {
        icon: "🌎",
        title: "GLOBAL MARKET",
        message:
            "ARIA will research potential international markets, buyer categories, market information and export considerations."
    }

};


const selected = features[feature];


if (!selected) {
    return;
}


showMessage(
    selected.icon,
    selected.title,
    selected.message,
    "Continue"
);

}

/* =========================================
MY BUSINESS
========================================= */

if (businessButton) {

businessButton.addEventListener("click", function () {

    showMessage(
        "🏢",
        "MY BUSINESS",
        "Your future ARIA business workspace will connect products, inventory, customers, suppliers, sales, expenses and business intelligence.",
        "Continue"
    );

});

}

/* =========================================
BOTTOM NAVIGATION
========================================= */

const navItems =
document.querySelectorAll(".nav-item");

navItems.forEach(function (item) {

item.addEventListener("click", function () {

    const navigation = item.dataset.nav;


    if (!navigation) {
        return;
    }


    if (navigation === "opportunities") {

        showMessage(
            "💡",
            "EXPLORE",
            "Your personalised opportunity feed will appear here."
        );

    }


    if (navigation === "business") {

        showMessage(
            "🏢",
            "BUSINESS",
            "Your complete SME workspace will appear here."
        );

    }


    if (navigation === "profile") {

        showMessage(
            "👤",
            "PROFILE",
            "Your skills, resources, interests, location and preferences will be stored here."
        );

    }

});

});

/* =========================================
MENU BUTTON
========================================= */

if (menuButton) {

menuButton.addEventListener("click", function () {

    showMessage(
        "☰",
        "ARIA MENU",
        "Account settings, help, notifications, safety and other ARIA SME HUB tools will appear here."
    );

});

}

/* =========================================
CLOSE MODAL
========================================= */

if (closeModal) {

closeModal.addEventListener("click", hideMessage);

}

if (modalAction) {

modalAction.addEventListener("click", hideMessage);

}

/* =========================================
CLOSE WHEN CLICKING OUTSIDE
========================================= */

if (messageModal) {

messageModal.addEventListener("click", function (event) {

    if (event.target === messageModal) {

        hideMessage();

    }

});

}

/* =========================================
ESCAPE KEY
========================================= */

document.addEventListener("keydown", function (event) {

if (event.key === "Escape") {

    hideMessage();

}

});

/* =========================================
ARIA STARTUP
========================================= */

console.log(
"ARIA SME HUB loaded successfully."
);

console.log(
"Advanced AI, camera, voice, database and opportunity systems will connect through the backend."
);
