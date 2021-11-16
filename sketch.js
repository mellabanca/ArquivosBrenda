var Trex, TrexCorrendo;
var chao, chaoimagem;
function preload(){
  TrexCorrendo = loadAnimation("trex1.png","trex3.png","trex4.png");
  chaoimagem = loadImage ("ground2.png");
}
function setup(){
createCanvas(600,200)
Trex = createSprite(50,160,20,50);
Trex.addAnimation("correndo",TrexCorrendo);
Trex.scale = 0.5;
borda = createEdgeSprites();
chao = createSprite(200,180,400,20);
chao.addImage("chao",chaoimagem);
chao.x = chao.width/2;
}
function draw(){
background("white");
chao.velocityX = -2;
if(keyDown("space")){
Trex.velocityY = -10;
}
if (chao.x < 0){
chao.x = chao.width/2;
}
Trex.velocityY = Trex.velocityY + 1;
Trex.collide(chao);
drawSprites();
}