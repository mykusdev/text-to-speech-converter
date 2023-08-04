const textarea = document.querySelector("textarea");
voiceList = document.querySelector("select"),
speechButton = document.querySelector("button");

let synthesis = speechSynthesis,
isSpeaking = true;

function voices(){
    for(let voice of synthesis.getVoices()){
        let selected = voice.name === "Google US English" ? "selected" : "";
    
    let option = `<option class="options" value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
    voiceList.insertAdjacentHTML("beforeend", option);
    }
}

synthesis.addEventListener("voiceschanged", voices);

function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text);
    for(let voice of synthesis.getVoices()){
        if(voice.name === voiceList.value){
            utterance.voice = voice;
        }
    }
    speechSynthesis.speak(utterance);
}

speechButton.addEventListener("click", e => {
    e.preventDefault();
    if(textarea.value !== ""){
        if(!synthesis.speaking){
            textToSpeech(textarea.value);
        }
        if(textarea.value.length > 80){
            if(isSpeaking){
                synthesis.resume();
                isSpeaking = false;
                speechButton.innerText = "Pause";

            }else{
                synthesis.pause();
                isSpeaking = true;
                speechButton.innerText = "Resume";
            }
            setInterval(() => {
                if(!synthesis.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechButton.innerText = "Convert to Speech";
                }
            });
        }else{
            speechButton.innerText = "Convert to Speech";
        }
    }
});