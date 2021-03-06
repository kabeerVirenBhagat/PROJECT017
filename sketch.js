var PLAY = 1;
var OVER = 0;
var score;
var gameState = PLAY;
var monkey,monkey_running,monkey_stop;
var banana,bananaImage,obstacle,obstacleImage;
var foodGroup,obstacleGroup;
var ground,groundImage;

function preload(){
    bananaImage = loadImage("banana.png");
    obstacleImage = loadImage("obstacle.png");
    monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
    monkey_stop = loadAnimation("sprite_0.png");
}

function setup(){
  createCanvas(600,400);
  
  monkey = createSprite(50,350);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.14;
  
  ground = createSprite(300,395,600,15);
  
  foodGroup = new Group();
  obstacleGroup = new Group();
}

function draw(){
  background("LightBlue");
  
  text("Score:" + score, 500,20);   
  
  gameState = PLAY;
  
  if(gameState === PLAY){
    if(foodGroup.isTouching(monkey)){
      score = score + 1;
      foodGroup.destroyEach();
    }
    //score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -7;
    if(ground.x < 300){
      ground.x = ground.width/2;
    }
    if(keyDown("space") && monkey.y >= 317){
      monkey.velocityY = -20;
    }
    if(obstacleGroup.isTouching(monkey)){
      text("Press r to restart.",225,200);
      ground.velocityX = 0;
      obstacleGroup.setLifetimeEach(-1);
      obstacleGroup.setVelocityXEach(0);
      foodGroup.setLifetimeEach(-1);
      foodGroup.setVelocityXEach(0);   
      if(keyDown("r")){
        gameState = OVER;
      }
    } 
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);
    food();
    obstacles();
  } 
  
  if(gameState === OVER){
    reset();
  }
  
  drawSprites();
}

function food(){
  if(frameCount % 80 === 0){
    banana = createSprite(600);
    banana.y = Math.round(random(200,260));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -7;
    banana.lifetime = 200;
    foodGroup.add(banana);
  }
}

function obstacles(){ 
  if(frameCount % 300 === 0) {
    obstacle = createSprite(600,322);             
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.debug = ("rectangle",20,20);
    obstacle.velocityX = -7;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  score = 0;
}