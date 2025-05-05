let url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=";
let Api__key = "AIzaSyAxlRzifCn9MA8kDrtqlNY2mMvI3KzZ3ss";

let language = "en-US";
let payload = {
    "contents": [{
        "parts": [{"text": "Explain how AI works"}]
    }]
};

function changelanguage(event) {
    language = event.target.value;
    console.log("Language changed to:", language);
}

let recognize = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
let saySpeech = window.speechSynthesis;
let useroutput = document.querySelector(".output");
let input = document.querySelector(".input");

if (!recognize) {
    alert("Your browser does not support speech recognition. Please use a compatible browser.");
}

const getData = () => {
    axios.post(`${url}${Api__key}`, payload)
        .then((response) => {
            let output = response.data.candidates[0].content.parts[0].text;
            console.log(output);

            let formattedOutput = output.replace(/\*\*/g, "").replace(/\*/g, "<li>") + "</li>";
            useroutput.innerHTML = `<ul>${formattedOutput}</ul>`;

            Speaks("As designed by Srujan Akula, I am here to assist you. " + output);
        })
        .catch((err) => {
            console.log("Error fetching AI response:", err);
        });
};

recognize.lang = language;
recognize.interimResults = false;
recognize.maxAlternatives = 1;

recognize.onresult = (event) => {
    stopSpeaking(); // Stop previous speech before listening
    let recognizeresul = event.results[0][0].transcript;
    console.log("User input:", recognizeresul);
    input.innerHTML = recognizeresul;

    payload.contents[0].parts[0].text = recognizeresul;
    getData();
};

const Speaks = (text) => {
    stopSpeaking(); // Stop previous speech before speaking new output
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    let voices = speechSynthesis.getVoices();

    // Select the appropriate voice
    utterance.voice = voices.find(voice => voice.lang === language) || voices[0];

    saySpeech.speak(utterance);
};

// Function to stop AI speech before speaking a new response
function stopSpeaking() {
    saySpeech.cancel();
    console.log("Stopped previous speech.");
}

// Function to start listening
function startListening() {
    stopSpeaking(); // Stop previous speech before listening
    recognize.start();
    console.log("Recognizing words...");
}
