// List of songs with their file names and duration
var samples = [
  { name: "Cry for me", file: "Cry for me.mp3", duration: "3:45" },
  { name: "Enjoy the show", file: "Enjoy the show.mp3", duration: "5:02" },
  { name: "Take me back to LA", file: "The Weeknd - Take Me Back To LA (Audio).mp3", duration: "4:14" },
  { name: "Sao Paulo", file: "The Weeknd - São Paulo feat. Anitta (Official Audio).mp3", duration: "5:02" },
  { name: "Reflections laughing", file: "Reflections laughing.mp3", duration: "4:52" },
  { name: "Rather lie", file: "Playboi Carti & The Weeknd - RATHER LIE (Official Audio).mp3", duration: "3:29" },
  { name: "One of the girls", file: "The Weeknd, JENNIE, Lily-Rose Depp - One Of The Girls (Official Video).mp3", duration: "4:05" },
  { name: "Popular", file: "The Weeknd, Playboi Carti, Madonna - Popular (Official Audio).mp3", duration: "3:36" },
  { name: "As you are", file: "As you are.mp3", duration: "5:41" }
];
// Variables to keep track of the current playing audio
var currentAudio = null;
var isPaused = false;
// Get elements from the HTML
var pauseResumeButton = document.getElementById("pause-resume");
var sampleContainer = document.getElementById("samples");
//Loop through each song in the samples array and create a button for it
samples.forEach(function(sample) {
  var button = document.createElement("button"); //Creates a button
  button.classList.add("sample-button"); // Add a CSS class for styling
  // Set button text to song name and duration
  button.innerHTML = `<strong>${sample.name}</strong><br>${sample.duration}`;
  // When the button is clicked, play the corresponding song
  button.onclick = function() {
    //If there's an audio playing, stop it
    if (currentAudio) {
      currentAudio.pause(); // Pause the current song
      currentAudio.currentTime = 0; //Reset playback to the beginning
    }
    //Create a new audio object and play it
    currentAudio = new Audio(sample.file);
    currentAudio.loop = true; // Enable looping
    currentAudio.play();
    isPaused = false; //Reset pause state
    //Show and update the pause/resume button
    pauseResumeButton.style.display = "inline-block";
    pauseResumeButton.innerText = "Pause";
    //When the song finishes, hide the pause button
    currentAudio.onended = function() {
      pauseResumeButton.style.display = "none";
    };
  };
  //Add the button to the page
  sampleContainer.appendChild(button);
});
//Functionality for the pause/resume button
pauseResumeButton.addEventListener("click", function() {
  if (currentAudio) { //Check if there's a song playing
    if (isPaused) {
      currentAudio.play(); // Resume playback
      pauseResumeButton.innerText = "Pause";
    } else {
      currentAudio.pause(); //Pause playback
      pauseResumeButton.innerText = "Resume";
    }
    isPaused = !isPaused; //Toggle pause state
  }
});
//Text-to-Speech functionality
document.getElementById('speak').addEventListener('click', function() {
  var text = document.getElementById('tts-input').value; // Get text from input box
  if (text.trim() !== "") { // Make sure text is not empty
    var utterance = new SpeechSynthesisUtterance(text); // reate a speech object
    speechSynthesis.speak(utterance); //Speak the text
  }
});
