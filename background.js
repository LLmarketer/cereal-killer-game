// button cancel animation for pause - resumer button]

var pauseResume = "";

var pauseResume = requestAnimationFrame (update);

function startStopAnimation (e){
  if(this.textContent === "Pause"){
    cancelAnimationFrame(pauseResume);
    this.textContent = "Resume";
  } else {
    requestAnimationFrame (update);
    this.textContent = "Pause";
  }
}



var pauseButton = getElementById('pause');
pauseButton.addEventListener('click',startStopAnimation, false);
