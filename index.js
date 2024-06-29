// alert("Congo! javascript is working!")
var gameContainer = document.querySelector(".game-container");
let scoreContainer = document.querySelector(".score-container");
var foodbox_X, foodbox_Y;
var snake_X = 5,
  snake_Y = 5;
var velocity_X = 0,
  velocity_Y = 0;
var snakeBody = [];
let score = 0;
//function for putting the food for snake
function putFood() {
  foodbox_X = Math.floor(Math.random() * 25) + 1;
  // console.log(foodbox_X);
  foodbox_Y = Math.floor(Math.random() * 25) + 1;
  // console.log(foodbox_Y);
  for (var i = 0; i < snakeBody.length; i++) {
    if (snakeBody[i][1] === foodbox_Y && snakeBody[i][0] === foodbox_X) {
      putFood();
    }
  }
}

//function for gameover()
function gameOver() {
  snake_X = 5;
  snake_Y = 5;
  putFood();
  velocity_X = 0;
  velocity_Y = 0;
  snakeBody = [];
  score = 0;
  scoreContainer.innerHTML = "Score : " + score;
  alert("Game Over!");
}

//for intailize the game
function renderGame() {
  var UpdateGame = `<div class="snake-food"style="grid-area: ${foodbox_Y}/${foodbox_X};"></div>`;

  if (snake_X === foodbox_X && snake_Y === foodbox_Y) {
    snakeBody.push([foodbox_X, foodbox_Y]);
    putFood();
    score += 10;
    scoreContainer.innerHTML = "Score : " + score;
  }else {
     if(snakeBody){

         snakeBody.pop();
     }
  }
  snake_X += velocity_X;
  snake_Y += velocity_Y;

  snakeBody.unshift([snake_X, snake_Y]);
  if (snake_X === 0 || snake_Y === 0 || snake_X === 26 || snake_Y === 26) {
    gameOver();
  }
  for (let i = 1; i < snakeBody.length; i++) {
    if (
      snakeBody[0][0] === snakeBody[i][0] &&
      snakeBody[0][1] === snakeBody[i][1]
    ) {
      gameOver();
    }
  }
  for (var i = 0; i < snakeBody.length; i++) {
    UpdateGame += `<div class="snake" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
  }
  gameContainer.innerHTML = UpdateGame;
}

putFood();
setInterval(renderGame, 150);
if(score > 50){
    setInterval(renderGame, 130);
}
else if(score > 100){
    setInterval(renderGame, 100);
}
if(score > 200){
    setInterval(renderGame, 80);
}
if(score > 300){
    setInterval(renderGame, 50);
}


//for funtioing the key from up,down,left,right
document.addEventListener("keydown", function (e) {
  console.log(e.key);
  let key = e.key;
  if (key === "ArrowUp" && velocity_Y != 1) {
    velocity_X = 0;
    velocity_Y = -1;
  } else if (key === "ArrowDown" && velocity_Y != -1) {
    velocity_X = 0;
    velocity_Y = 1;
  } else if (key === "ArrowLeft" && velocity_X != 1) {
    velocity_X = -1;
    velocity_Y = 0;
  } else if (key === "ArrowRight" && velocity_X != -1) {
    velocity_X = 1;
    velocity_Y = 0;
  }
});
