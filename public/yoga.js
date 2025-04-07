function filterPoses(mood) {
  const poses = document.querySelectorAll(".pose");

  poses.forEach((pose) => {
    if (mood === "all") {
      pose.style.display = "block";
    } else if (pose.classList.contains(mood)) {
      pose.style.display = "block";
    } else {
      pose.style.display = "none";
    }
  });
}