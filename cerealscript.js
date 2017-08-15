//checks collision between player and cereal
      var dir = collisionCheck(player, boxes[i].cerealDrawn);

            for (var i = 0; i < boxes.length; i++) {
              if (boxes[i].cereal && (dir === "l" || dir === "r" || dir === "t" || dir === "b") ){
                boxes.cerealDrawn = undefined;
                //or
              delete boxes.cerealDrawn;
              }

            }
