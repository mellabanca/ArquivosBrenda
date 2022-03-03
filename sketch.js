  var Trex, TrexCorrendo;
  var chao, chaoimagem;
  var chaoinv;
  var nuvem;
  var nuvemimg;


  function preload(){
    TrexCorrendo = loadAnimation("trex1.png","trex3.png","trex4.png");
    chaoimagem = loadImage ("ground2.png");

    nuvemimg = loadImage("cloud.png");
}


  function setup(){

createCanvas(600,200);

   Trex = createSprite(50,160,20,50);
   Trex.addAnimation("correndo",TrexCorrendo);
   Trex.scale = 0.5;

borda = createEdgeSprites();

    chao = createSprite(200,180,400,20);
    chao.addImage("chao",chaoimagem);
    chao.x = chao.width/2;

    chaoinv = createSprite(100,190,400,10);
    chaoinv.visible = false;

    //var numero = Math.round(random(1,100));
    //console.log(numero);
}


  function draw(){

 background("white");

 //console.log (Trex.y);

  chao.velocityX = -2;

  if(keyDown("space") && Trex.y >= 150){
    Trex.velocityY = -10;
}

  if (chao.x < 0){
    chao.x = chao.width/2;
}

  Trex.velocityY = Trex.velocityY + 1;
  Trex.collide(chaoinv);

nuvens();

drawSprites();
}

function nuvens(){
  if (frameCount%60 === 0){
    nuvem = createSprite(600,100,40,10);
    nuvem.addImage (nuvemimg);
    nuvem.scale = 0.7;
    nuvem.y = Math.round(random(10,100));
    nuvem.velocityX = -3;
    nuvem.depth = Trex.depth;
    Trex.depth = Trex.depth + 1;
    nuvem.lifetime = 250;
  }
}