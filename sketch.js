
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var SurvivalTime = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x = ground.width/2;
  console.log(ground.x)

  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
 
}


function draw() {
  background('rgb(0,250,0)');
  stroke("black");
  textSize(20);
  fill("black");
  text("SurvivalTime :"+ SurvivalTime,100,50)
  
  if (gameState === PLAY){
    
  spawnBananas();
  spawnObstacles(); 
    
  
  SurvivalTime = SurvivalTime +      Math.round(getFrameRate()/60);
    
  if (keyDown("space") && monkey.y > 210){
      monkey.velocityY=-10;
  }
  
  monkey.velocityY = monkey.velocityY+0.8
  
  if (ground.x < 0){
      ground.x = ground.width/2;
  }
  
  monkey.collide(ground)
  
  if (monkey.isTouching(obstacleGroup)){
      gameState = END;
  } 
  }
   
 else if(gameState === END){
  FoodGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0);
   
  FoodGroup.setLifetimeEach(-1);
  obstacleGroup.setLifetimeEach(-1);
   
  ground.velocityX = 0;
  monkey.velocityX = 0;
   
  monkey.collide(ground)
    
  }
  
  
  
  

 drawSprites();
}

function spawnBananas(){
  if (frameCount % 80 === 0){
  banana = createSprite(600,155,40,10)
  banana.addImage(bananaImage);
  banana.y = Math.round(random(120,200))
  banana.scale = 0.1;
  banana.velocityX = -3;
  
  banana.lifetime = 200;
  
  banana.depth = monkey.depth;
  monkey.depth = monkey.depth + 1;
  
  FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if (frameCount % 300 === 0){
  obstacle = createSprite(400,250,5,10);
  obstacle.velocityX = -6;
  obstacle.addImage(obstacleImage);
  obstacle.y = Math.round(random(307,306))
  obstacle.scale = 0.2;
    
  obstacle.lifetime = 200;
    
  obstacleGroup.add(obstacle)
  }
}



