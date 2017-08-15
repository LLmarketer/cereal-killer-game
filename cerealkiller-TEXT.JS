window.onkeyup = function(e) {
   var key = e.keyCode ? e.keyCode : e.which;

   if (key == 38) { //up arrow
       player.posY *= friction;
   }else if (key == 37) { // left arrow
     player.posX *= friction;
     player.velY += gravity;
   }else if (key == 39) { // right arrow
     player.posX /= friction;
     player.velY += gravity;
}
//check the player does not go outside the window
if (player.posX >= width-player.width) {
    player.posX = width-player.width;
} else if (player.posX <= 0) {
    player.posX = 0;
}
//jumping
if (keys[38] || keys[32]) {
    // up arrow or space
  if(!player.jumping){
   player.jumping = true;
   player.velY = -player.speed*2;
  }
}


};
