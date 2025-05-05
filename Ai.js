let url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key="
let Api__key ="AIzaSyAxlRzifCn9MA8kDrtqlNY2mMvI3KzZ3ss";

let language ="en-US";
let playload ={
  "contents": [{
    "parts":
    [{"text": "Explain how AI works"}
    ]
    }]
   }
   
function changelanguage(event){
    let language = event.target.value;
console.log(language);
}

let recognize = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
let saySpeech = window.speechSynthesis;
let useroutput = document.querySelector(".output");
let input = document.querySelector(".input");
if(!recognize){
    alert("Your browser does not support speech recognition. Please use a compatible browser.");
}{
    const getData = ()=>{
        let data = axios.post(`${url}+${Api__key}`,playload)
        .then((Response)=>{
            let output = Response.data.candidates[0].content.parts[0].text;
            console.log(Response.data.candidates[0].content.parts[0].text);

            let formattedOutput = output.replace(/\*\*/g, "").replace(/\*/g, "<li>") + "</li>";
            useroutput.innerHTML = `<ul>${formattedOutput}</ul>`;


            Speaks("As designed by Sai kiran Akula, I am here to assisting you" + output);;
        }).catch((err)=>{
    console.log(err);
        })
       }
recognize.lang = language;;
recognize.interimResults = false;
recognize.maxAlternatives = 1;

recognize.onresult = (event)=>{
    let recognizeresul = event.results[0][0].transcript;
    console.log(event.results[0][0].transcript);
    input.innerHTML = recognizeresul
    playload.contents[0].parts[0].text = recognizeresul;
    getData();
   
    
}

const Speaks = (text)=>{
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    let voices = speechSynthesis.getVoices();

    // Select a voice for Hindi or Telugu
    if (language === "hi-IN") {
        utterance.voice = voices.find(voice => voice.lang === "hi-IN") || voices[0];
    } else if (language === "te-IN") {
        utterance.voice = voices.find(voice => voice.lang === "te-IN") || voices[0];
    }
    // Select a voice for English
    else if (language === "en-US") {
        utterance.voice = voices.find(voice => voice.lang === "en-US") || voices[0];
    } else {
        utterance.voice = voices[0]; // Default voice
    }
    saySpeech.speak(utterance);
}
function stopSpeaking() {
    saySpeech.cancel();
    console.log("AI speech stopped.");
     
}

function startListening() {
    recognize.start();
    console.log("recognizing the words");
}

}