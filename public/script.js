const LEFTVIEW = document.querySelector(".leftViewBox h1");
const RIGHTVIEW = document.querySelector(".rightViewBox h1");

const LEFTMESSAGE = document.querySelector(".leftchat");
const RIGHTMESSAGE = document.querySelector(".rightchat");

const LEFTCODE = document.querySelector(".leftcode");
const RIGHTCODE = document.querySelector(".rightcode");

// Who are you? (Hardcoded for now, replace later with logged in user)
const currentUser = "Archit"; 
const chatPartner = "Ravi"; // you can change this dynamically

// ---------------- Encryption ----------------
function encrypt(msg) {
    let encrypted = "";
    for (let ch of msg) {
        encrypted += String.fromCharCode(ch.charCodeAt(0) + 1);
    }
    return encrypted;
}

// ---------------- Send Message ----------------
async function sendMessage(to, text) {
    await fetch("/user/index", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, text })
    });
}

// Left box send
LEFTMESSAGE.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const message = LEFTMESSAGE.value.trim();
        if (message !== "") {
            await sendMessage(chatPartner, message);
            LEFTMESSAGE.value = "";
        }
    }
});

// Right box send
RIGHTMESSAGE.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const message = RIGHTMESSAGE.value.trim();
        if (message !== "") {
            await sendMessage(chatPartner, message);
            RIGHTMESSAGE.value = "";
        }
    }
});

// ---------------- Poll Messages ----------------
async function fetchMessages() {
    try {
        const res = await fetch(`/user/chat/${currentUser}/${chatPartner}`);
        const data = await res.json();

        // Last messages from each side
        const lastFromUser = data.filter(m => m.from === currentUser).pop();
        const lastFromPartner = data.filter(m => m.from === chatPartner).pop();

        if (lastFromUser) LEFTVIEW.innerHTML = lastFromUser.text;
        if (lastFromPartner) RIGHTVIEW.innerHTML = lastFromPartner.text;
    } catch (err) {
        console.error("Error fetching messages", err);
    }
}

// Poll every 2s
setInterval(fetchMessages, 2000);
