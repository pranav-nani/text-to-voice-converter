let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");
const fileInput = document.getElementById("fileInput");
const listenButton = document.getElementById("listenButton");
const stopButton = document.getElementById("stopButton");

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  speech.voice = voices[0];

  voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
}

listenButton.addEventListener("click", () => {
  speech.text = document.querySelector("textarea").value;
  window.speechSynthesis.speak(speech);
});

voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value];
});

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const fileText = e.target.result;
    document.querySelector("textarea").value = fileText;
    speech.text = fileText;
    window.speechSynthesis.speak(speech);
  };

  reader.readAsText(file);
});

stopButton.addEventListener("click", () => {
  window.speechSynthesis.cancel();
});
