
var monkey1 , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground1,bac2;
var PLAY=1;
var END=0;
var gameState=PLAY;
var invisibleGround;

var Survivaltime=0;
var score=0;

var jumpSound;
var restart1;



function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  ground1=loadImage("ground2.png");
  bac2=loadImage("bac mon.png");
  restart1=loadImage("download (1).png");

  monkey1=loadAnimation("sprite_1.png");
  
  jumpSound = loadSound("jump.mp3")

}



function setup() {

  createCanvas(800,425);

  bac1=createSprite(400,210,800,425);
  bac1.visible=false
  
  bac=createSprite(0,210,400,10);
  bac.addImage("bac2",bac2 );
  bac.x = bac.width /2;
  bac.scale=2;
  
  
  monkey=createSprite(75,0,50,50);
  monkey.addAnimation("monkey_running",monkey_running);
  monkey.addAnimation("monkey1",monkey1);
  monkey.scale=0.2;
  monkey.debug=false;
  monkey.setCollider("circle",-75 ,-5);
  
  bac1=createSprite(410,210,800,425);
  bac1.visible=false;
  
  restart=createSprite(400,225,20,20);
  restart.addImage("restart1",restart1);
  
invisibleGround = createSprite(200,410,1000,10);
  invisibleGround.visible = false;
  
  obstacleGroup=createGroup();
  FoodGroup=createGroup(); 
   

  

}
 
  
function draw() {
  
  background(200) 


    console.log("this is ",gameState)
  
  restart.visible=false;

  
  if(gameState==PLAY){
       bac.velocityX = -(2*2 +Survivaltime /200);
    
    Survivaltime = Survivaltime + Math.round(getFrameRate()/60);


 if(keyDown("space")&& monkey.y >= 150) {
    monkey.velocityY = -12;
        jumpSound.play();
   
    }
    
if(mousePressedOver(bac1)&& monkey.y >= 150) {
        jumpSound.play();
    monkey.velocityY = -12;
 
}
    

    
  monkey.velocityY = monkey.velocityY + 1;

  
  if (bac.x < 0) {
    bac.x = bac.width / 2;

 }
 if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score=score+1;
 }    
  if(monkey.isTouching(obstacleGroup)){
    gameState=END;
  }
}  else if(gameState==END){
    bac.velocityX=0;
  
    obstacleGroup.setVelocityXEach(0);
  
    FoodGroup.setVelocityXEach(0);
  
    FoodGroup.destroyEach();
  
    obstacleGroup.setLifetimeEach(-1);
  
    monkey.changeAnimation("monkey1",monkey1);
  
    restart.visible=true;
  
if(mousePressedOver(restart)) {
  gameState=PLAY;
  restart.visible=false;
  obstacleGroup.destroyEach();
  score=0;
  Survivaltime=0;  
  monkey.changeAnimation("monkey_running",monkey_running);
  monkey.y=0;

 
}  

  }
 
      
  monkey.collide(invisibleGround);
    


  
  drawSprites();

  spamBlock();
  spambanana();   
 textSize(20); 
  text("Survivaltime:"+Survivaltime,300,25);
 textSize(20); 
  text("score:"+score,600,25);  
}

function spamBlock(){
  
    if (frameCount % 200 === 0) {

      var block=createSprite(850,375,50,50);
           block.velocityX = -(2*2 + Survivaltime/200);
      block.addImage("obstaceImage",obstaceImage);
      block.scale=0.2; 
      block.lifeTime=100;
      //block.debug=true;
      block.setCollider("circle",49,0.5);
      obstacleGroup.add(block); 

    }
}

function spambanana(){
  
  if (frameCount % 175 === 0) {
  
    var banana=createSprite(1000,200,30,30);  

    
    banana.y=random(100,250); 
    banana.addImage("bananaImage",bananaImage);
    banana.scale=0.1;
           banana.velocityX = -(2*2 + Survivaltime/200);

    //banana.debug=true;
    FoodGroup.add(banana);

  }
}




