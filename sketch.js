var Trex, TrexCorrendo;


function preload(){
  TrexCorrendo = loadAnimation("trex1.png","trex3.png","trex4.png");

}

function setup(){
  createCanvas(600,200)
  Trex = createSprite(50,160,20,50);
  Trex.addAnimation("correndo",TrexCorrendo);
  Trex.scale = 0.5;
  borda = createEdgeSprites();
}

function draw(){
  background("white");

  if(keyDown("space")){
    Trex.velocityY = -10;
  }

  Trex.velocityY = Trex.velocityY + 1;

  Trex.collide(borda[3]);

  drawSprites();

}