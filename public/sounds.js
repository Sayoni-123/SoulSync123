function playTrack(src) {
  const audioPlayer = document.getElementById("audio-player");
  const audioSource = document.getElementById("audio-source");

  // Set the source of the audio player
  audioSource.src = src;

  // Load the new audio file and play it
  audioPlayer.load();
  audioPlayer.play();
}