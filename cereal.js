(function() {
    var requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

window.cancelAnimationFrame =
    window.cancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    function(requestID){
      clearInterval(requestID);
    };

//==background image ====
var bg = new Image();
bg.src = "images/cereal-game-bg2.jpg";
bg.height= 690;

var bg2 = new Image();
bg2.src = "images/cereal-game-bg1.jpg";
bg2.height = 690;
//==end background image ====

//==platform image ====
var platform = new Image();
platform.src = "images/platforms.png";
platform.width = 170;
platform.height = 20;
//==end platform image ===


var avatar_image = new Image();
avatar_image.src = 'images/spoon.png';


//creation of cereal images
var heart_image = new Image();
heart_image.src = 'images/heart.png';

var horse_paw_image = new Image();
horse_paw_image.src = 'images/horse-paw.png';

var moon_image = new Image();
moon_image.src = 'images/moon.png';

var rainbow_image = new Image();
rainbow_image.src = 'images/rainbow.png';

var lucky_charms_image = new Image();
lucky_charms_image.src = 'images/lucky-charms.png';

//score
var score = 0;

var dir;

//marshmallow array
var marshmallow_array = [heart_image,horse_paw_image,moon_image,rainbow_image,lucky_charms_image];
var isPaused = false;
var randomCereal;
var randomMarshmallow;
var randomImage;

//cereals actually on the canvas
var cerealsOnCanvas = [];

//variable declarations
var canvas = document.getElementById('killer-canvas'),
    ctx = canvas.getContext('2d'),
    width = 500,
    height =  700,
    player = {
    x : width/2, //place the player in the middle of the x axis
    y : height - 100, // place the player just 5px above the y axis
    height : 50, // height of the player
    width : 50, //width of the player
    velX : 0, //velocityX
    velY: 0, //velocityY
    speed: 5,
    jumping: false,
    grounded: false,
    //avatar: avatar()
  },
    cereal = {
      width: 50,
      height: 50,
    },
keys = [];
friction = 0.8;
gravity= 0.3;

var alertBox = false;


//collision boxes
var boxes =[];
var outlineInCanvas = [];
var outlineInCanvasBottom = [];

//difference between canvas width and box width
var boxCreationLimit = parseInt(canvas.width - (boxes.width/2));


//below we push 3 boxes into the array.
//below limit
outlineInCanvasBottom.push({
  x:0,
  y:700,
  width: width,
  height: 50
});
//right limit
outlineInCanvas.push({
  x:500,
  y:0,
  width: 10,
  height: height
});

//left limit
outlineInCanvas.push({
  x:0,
  y:0,
  width: 0,
  height: height
});

//6 initial boxes

boxes.push({
  x:330,
  y:10,
  width: 170,
  height: 20,
  cereal: false,
  cerealDrawn : "",
  cerealW : 40,
  cerealH : 40
});

boxes.push({
  x:80,
  y:170,
  width: 170,
  height: 20,
  cereal: false,
  cerealDrawn : "",
  cerealW : 40,
  cerealH : 40
});

boxes.push({
  x:320,
  y:250,
  width: 170,
  height: 20,
  cereal: false,
  cerealDrawn : "",
  cerealW : 40,
  cerealH : 40

});

boxes.push({
  x:20,
  y:550,
  width: 170,
  height: 20,
  cereal: false,
  cerealDrawn : "",
  cerealW : 40,
  cerealH : 40
});

boxes.push({
  x: 300,
  y: 480,
  width: 170,
  height: 20,
  cereal: false,
  cerealDrawn : "",
  cerealW : 40,
  cerealH : 40
});

boxes.push({
  x: 170,
  y:380,
  width: 170,
  height: 20,
  pform: "",
  cereal: false,
  cerealDrawn : "",
  cerealW : 40,
  cerealH : 40
});

canvas.width = width;
canvas.height = height;

//setInterval oop that push the platforms down
var boxScroll = setInterval (function (){
  actualScrolling();
}, 30);

function boxScrollBottom(){
setTimeout(function(){
  actualScrollingBottom();
}, 5000);
}
boxScrollBottom();


//platform scrolling logic
function actualScrolling(){
for(var i=0; i<boxes.length; i++){
  boxes[i].y += 1.5;
  if (score > 3){
    boxes[i].y += 2;
  }else if (score > 70) {
    boxes[i].y += 2.2;
  }
}
}


//bottomplatform logic
function actualScrollingBottom(){
  setInterval (function (){
  outlineInCanvasBottom[0].y+=1;
  console.log('canvas is scrolling');
  }, 100);
}


//  pause function
$('#pause').on('click',function(){
  isPaused= !isPaused;
  if (isPaused){
    $("#pause").text("Resume");
    clearInterval(boxScroll);
  } else {
    $("#pause").text("Pause");
    boxScroll = setInterval (function (){
      actualScrolling();
    }, 30);
  }
  console.log('pause click');
});




function update(){
  if(player.y > 715){
    alert("You suck!");
    location.reload(true);
  }
//checking player and boxes[i] y position

  for(i=0; i < boxes.length; i++ ){
    if (boxes[i].y > height) {
      boxes.splice(i,1); // we get rid of the box outside the canvas

        var number = Math.floor(Math.random() * (5 - 1 + 1 )) + 1;

        if (number == 4){
          randomCereal = true;
          randomMarshmallow = Math.floor(Math.random()* marshmallow_array.length);
          randomImage = (marshmallow_array[randomMarshmallow]);
        } else {
          randomCereal = false;
        }

        boxes.push({
        x: Math.floor(Math.random() * (width - 170 - 1 + 1 )) + 1,
        // x: width - 170,
        y: Math.floor(Math.random() * player.velY-3) + 1,
        width:boxes[i].width,
        height:boxes[i].height,
        cereal : randomCereal,
        pform : platform,
        cerealDrawn : randomImage,
        cerealW: 40,
        cerealH: 40
      });
    }
  }


  // check keys
      if (keys[38] || keys[32] || keys[87]) {
          // up arrow or space
        if(!player.jumping && player.grounded){
         player.jumping = true;
         player.grounded = false; // we're not on the ground anymore
         player.velY = -player.speed * 2;
        }
      }
      if (keys[39] || keys[68]) {
          // right arrow
          if (player.velX < player.speed) {
              player.velX++;
           }
      }
      if (keys[37]|| keys[65]) {
          // left arrow
          if (player.velX > -player.speed) {
              player.velX--;
          }
      }

      player.velX *= friction;
      player.velY += gravity;


      //ctx.clearRect(0,0,width,height);
      //this logic sets the filling rules for the boxes
      //ctx.fillStyle = "black";
      ctx.beginPath();

      //background panning logic activation
      animateBackground();

      player.grounded = false;
      for(var i=0; i < boxes.length; i++) {
      ctx.drawImage(platform, boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
       if (boxes[i].cereal){
         if(boxes[i].cerealDrawn !== ""){
        ctx.drawImage(boxes[i].cerealDrawn,boxes[i].x+70, boxes[i].y-40, 40, 40);
      }
     }

    //  //player - cerealcollision check
     var dir = cerealCollisionCheck(player, boxes[i]);

     if(dir) {
       boxes[i].cereal = false;
       score += 1;
       console.log(score);
       $("#score").text(score);

     }

         dir = collisionCheck(player, boxes[i]);

        if (dir === "l" || dir === "r") {
               player.velX = 0;
               player.jumping = false;
           } else if (dir === "b") {
               player.grounded = true;
               player.jumping = false;
           } else if (dir === "t") {
               player.velY *= -1;
           }
      }

      for(var x=0; x < boxes.length; x++) {
      // ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);

        var dir = collisionCheck(player, boxes[x]);

        if (dir === "l" || dir === "r") {
               player.velX = 0;
               player.jumping = false;
           } else if (dir === "b") {
               player.grounded = true;
               player.jumping = false;
           } else if (dir === "t") {
               player.velY *= -1;
           }
      }

// draw  the outline and check for collisions
      for(var n=0; n < outlineInCanvas.length; n++) {
      ctx.rect(outlineInCanvas[n].x, outlineInCanvas[n].y, outlineInCanvas[n].width, outlineInCanvas[n].height);

         dir = collisionCheck(player, outlineInCanvas[n]);

        if (dir === "l" || dir === "r") {
               player.velX = 0;
               player.jumping = false;
           } else if (dir === "b") {
               player.grounded = true;
               player.jumping = false;
           } else if (dir === "t") {
               player.velY *= -1;
           }
      }

// draw  the outline and check for collisions at bottom

      ctx.rect(outlineInCanvasBottom[0].x, outlineInCanvasBottom[0].y, outlineInCanvasBottom[0].width, outlineInCanvasBottom[0].height);

         dir = collisionCheck(player, outlineInCanvasBottom[0]);

        if (dir === "l" || dir === "r") {
               player.velX = 0;
               player.jumping = false;
           } else if (dir === "b") {
               player.grounded = true;
               player.jumping = false;
           } else if (dir === "t") {
               player.velY *= -1;
           }


      if(player.grounded){
         player.velY = 0;
    }

    player.x += player.velX;
    player.y += player.velY;

      //ctx.drawImage(avatar_image,player.x,player.y, player.width, player.height);

      ctx.fill(); //fill is a method that fills the current drawing path with platforms.

      ctx.drawImage(avatar_image,player.x,player.y, player.width, player.height);


    requestAnimationFrame(update);

  }
//====end of update function=====


//====backgorund function=====

// var canvas = document.getElementById('killer-background');
// var ctx = canvas.getContext('2d');
// var cW = ctx.canvas.width;
// var cH = ctx.canvas.height;

  function Background(){
    this.x = 0;
    this.y = 0;
    this.y2 = -bg2.height;
    this.w = bg.width;
    this.h = bg.height;


    this.scrollBackground = function(){
      if (this.y > bg.height) {
        this.y = -bg.height;
      }

      if (this.y2 > bg2.height) {
        this.y2 = -bg2.height;
      }
      this.y ++;
      this.y2++;
    };
  }

  var background = new Background();
  var background2 = new Background();

  function animateBackground(){
    console.log('animate function');
    ctx.drawImage(bg, background.x, background.y);
    ctx.drawImage(bg2, background.x, background.y2);
    // ctx.save();
    // ctx.clearRect(0,0, canvas.width, canvas.height);
    // background.render();
    if (!isPaused){
    background.scrollBackground();
  }
  }

//====end backgorund function=====

//collision check function
function collisionCheck(shapeA, shapeB){
  //creation of the vector
  vX = (shapeA.x + (shapeA.width/2))  - (shapeB.x + (shapeB.width/2)) ;
  vY = (shapeA.y + (shapeA.height/2))  - (shapeB.y + (shapeB.height/2)) ;
  //sun of the haplf widths and Heights
  halfWidths = (shapeA.width/2) + (shapeB.width/2);
  halfHeights = (shapeB.height/2) + (shapeB.height/2);
  colDir = null;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < halfWidths && Math.abs(vY) < halfHeights) {         // figures out on which side we are colliding (top, bottom, left, or right)
      var oX = halfWidths - Math.abs(vX),
          oY = halfHeights - Math.abs(vY);
      if (oX >= oY) {
            if (vY > 0) {
                colDir = "t"; // top
                shapeA.y += oY;
            } else {
                colDir = "b"; //bottom
                shapeA.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l"; //left
                shapeA.x += oX;
            } else {
                colDir = "r"; //right
                shapeA.x -= oX;
            }
        }
    }
    return colDir;
}

// ceral collision check constructor


function cerealCollisionCheck(shapeA, shapeB){
  //creation of the vector
  vX = (shapeA.x + (shapeA.width/2))  - (shapeB.x + (shapeB.cerealW/2)) ;
  vY = shapeA.y + shapeA.height - (shapeB.y + (shapeB.cerealH/2));
  //sun of the haplf widths and Heights
  halfWidths = (shapeA.width/2) + (shapeB.cerealW/2);
  halfHeights = (shapeB.cerealH/2) + (shapeB.cerealH/2);
  colDir = null;

  if (shapeB.cereal) {

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < halfWidths && Math.abs(vY) < halfHeights - 20 ) {
      console.debug();
        // figures out on which side we are colliding (top, bottom, left, or right)
      var oX = halfWidths - Math.abs(vX),
          oY = halfHeights - Math.abs(vY);
      if (oX >= oY) {
            if (vY > 0) {
                colDir = "t"; // top
                shapeA.y += oY;
            } else {
                colDir = "b"; //bottom
                shapeA.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l"; //left
                shapeA.x += oX;
            } else {
                colDir = "r"; //right
                shapeA.x -= oX;
            }
        }
    }
  }
    return colDir;
}


//refresh button
$("#restart").on('click', function(){
  console.log("restart button has been clicked!");
  location.reload(true);
});







document.body.addEventListener("keydown", function(e) {
  var permittedKeys = [38,32,87,39,68,37,65];
  if ( permittedKeys.includes(e.keyCode)){
      e.preventDefault();
  }


    keys[e.keyCode] = true;
});

  document.body.addEventListener("keyup", function(e) {
      keys[e.keyCode] = false;
  });

window.addEventListener("load",function(){
    update();
});
