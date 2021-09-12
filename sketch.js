var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()
  ghost = createSprite(200,300)
  ghost.addImage(ghostImg)
  ghost.scale = .3
}

function draw() {
  background(200);
  if(gameState === "play"){
  if(tower.y > 600){
      tower.y = 0
    }
  if(keyDown(LEFT_ARROW)){
    ghost.x = ghost.x - 5;

  }
  if(keyDown(RIGHT_ARROW)){
    ghost.x = ghost.x + 5
  }
  if(keyDown("SPACE")){
    ghost.velocityY = 6;
    ghost.y = ghost.y - 10

  }
  if(ghost.y>600|| ghost.isTouching(invisibleBlockGroup)){
    gameState = "end"
  } 
  if(ghost.isTouching(climbersGroup)){

    ghost.velocityY = 0
  }

  ghost.velocityY = ghost.velocityY + 0.1
  
  spawndoors();

  drawSprites();
  }
  if(gameState === "end"){
      text("GAME OVER", 200,200)  
  }
  spookySound.loop()
}

function spawndoors(){  
  

  if(frameCount%240 ===0){
    door = createSprite(Math.round(random(100,500),-50))
    door.addImage(doorImg)
    door.velocityY = 1;
    door.lifetime = 700;
    doorsGroup.add(door);
    climber = createSprite(door.x,60)
    climber.addImage(climberImg)
    climber.velocityY = 1;
    climber.lifetime = 700;
    climbersGroup.add(climber);
    invisibleBlock = createSprite(door.x,65,climber.width,2)
    //invisibleBlock.debug = true; 
    invisibleBlock.visible = false;
    invisibleBlock.velocityY = 1
    invisibleBlock.lifetime = 700; 
    invisibleBlockGroup.add(invisibleBlock)
    door.depth = ghost.depth 
    ghost.depth = ghost.depth + 1

  }

}


