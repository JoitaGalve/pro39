var END =0;
var PLAY =1;
var gameState = PLAY;

var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2, mainRacerImg3;
var player1, oppPinkImg, pinkCG, player2, oppYellowImg, yellowCG, player3, oppRedImg, redCG;

var player1_collided, player2_collided, player3_collided;

var gameOver, gameOverImage;
var restart, restartImage;

var bellSound;

var distance=0;



function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2= loadAnimation("mainPlayer3.png");
  mainRacerImg3 = loadAnimation("mainPlayer3.png")
  
  oppPinkImg = loadAnimation("opponent1.png" ,"opponent2.png")
  oppYellowImg = loadAnimation("opponent4.png" ,"opponent5.png")
  oppRedImg = loadAnimation("opponent7.png","opponent8.png")
  
  
  gameOverImage = loadImage("gameOver.png")
  restartImage = loadImage("restart.png")
  player1_collided = loadAnimation("opponent3.png")
  player2_collided = loadAnimation("opponent6.png")
  player3_collided  = loadAnimation("opponent9.png")
  
  
  gameOverImage = loadImage("gameOver.png")
 
  
  bellSound = loadSound("bell.mp3")
}

function setup() {
  

  
createCanvas(windowWidth, windowHeight);
  
// Moving background
path=createSprite(width/2, 350);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(height/4,width-10,100,100);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.1;
 
restart = createSprite(700, 420, 10, 10)
restart.addImage(restartImage)
restart.scale = 0.2
  
gameOver = createSprite(700, 350, 10, 10)
gameOver.addImage(gameOverImage)
gameOver.scale = 0.8


mainCyclist.setCollider("circle",0,0);
mainCyclist.debug = false 

pinkCG = new Group()
yellowCG = new Group()
redCG = new Group()
  
mainCyclist.degbug = false
}

function draw() {
 background(0);
  
if(gameState===PLAY){
gameOver.visible = false
restart.visible = false
mainCyclist.y = World.mouseY;
    
    if(keyDown("space")&& mainCyclist.y >= 100) {
        mainCyclist.velocityY = -12;
        bellSound.play()
    }
  
   camera.position.x = displayWidth/2
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
    
    //code to reset the background
  if(path.x < 0 ){
    path.x = width/2; 
}
    path.velocityX = -(6 + 2*distance/150)
    
    distance = distance + Math.round(getFrameRate()/60);
    if(distance>0 && distance%100 === 0){ 
    }

    var select_oppPlayer = Math.round(random(1,3))
    if(World.frameCount%150===0){
      if(select_oppPlayer===1) {
      pinkC();
      } else if(select_oppPlayer===2){
        yellowC()
      } else if(select_oppPlayer===3){
        redC();
      }
      
      
    }
    
     
        if(pinkCG.isTouching(mainCyclist)) {
          player1.addAnimation("collided", player1_collided )
          player1.changeAnimation("collided")
          gameState = END; 

      }
    
        if(yellowCG.isTouching(mainCyclist)) {
          player2.addAnimation("collided", player2_collided )
          player2.changeAnimation("collided")
          gameState = END;
            
        }
    
        if(redCG.isTouching(mainCyclist)){
        player3.addAnimation("collided", player2_collided )
        player3.changeAnimation("collided")
        gameState = END;
          
        }
  
   
  
  
   
  }
  
  if(gameState===END) {
    
    gameOver.visible = true
    restart.visible = true
    path.velocityX = 0
    mainCyclist.velocityX = 0
   
    pinkCG.setLifetimeEach(-1);
    pinkCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
    yellowCG.setVelocityXEach(0);  
    redCG.setLifetimeEach(-1);
    redCG.setVelocityXEach(0);
    
    mainCyclist.addAnimation("collided", mainRacerImg3 )
    mainCyclist.changeAnimation("collided")
    
  }
    
  if(mousePressedOver(restart)) {
      Reset();

    }
   
  drawSprites();
  
  
  textSize(20);
  fill(255);
  text("Distance: "+ distance, 1200,30)
  
  
  }
  
function Reset() {
  gameState = PLAY
  mainCyclist.addAnimation("SahilRunning", mainRacerImg1)
  mainCyclist.changeAnimation("SahilRunning")
  pinkCG.destroyEach()
  yellowCG.destroyEach()
  redCG.destroyEach()
  distance=0
}

function pinkC() {
  player1 = createSprite(1100, Math.round(random(50, 250 ),10, 10))
  player1.addAnimation("opponent1.png", oppPinkImg)
  player1.scale = 0.08
  player1.setLifetime = 150
  player1.velocityX = -(6 + 2*distance/150)
  pinkCG.add(player1)   
}

function yellowC() {
  player2 = createSprite(1100, Math.round(random(50, 250), 10, 10))
  player2.addAnimation("opponent4.png" ,oppYellowImg)
  player2.scale = 0.08
  player2.setLifetime = 170
  player2.velocityX = -(6 + 2*distance/150)
  yellowCG.add(player2)  
}

function redC() {
  player3 = createSprite(1100, Math.round(random(50, 250), 10, 10))
  player3.addAnimation("opponent7.png", oppRedImg)
  player3.scale = 0.08

  player3.setLifetime = 170
  player3.velocityX = -(6 + 2*distance/150)
  redCG.add(player3)   
}

