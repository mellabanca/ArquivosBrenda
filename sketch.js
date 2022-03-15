  var Trex, TrexCorrendo, TrexMorto;
  var chao, chaoimagem;
  var chaoinv;
  var nuvem;
  var nuvemimg;
  var obs1;
  var obs2;
  var obs3;
  var obs4;
  var obs5;
  var obs6;
  var pontos;
  var grupoNuvens;
  var grupoObs;
  var JOGANDO = 1;
  var GAMEOVER = 0;
  var estado = JOGANDO;
  var gameover;
  var gameoverImg;
  var reset;
  var resetBotao;


  function preload(){
    TrexCorrendo = loadAnimation("trex1.png","trex3.png","trex4.png");
    TrexMorto = loadAnimation("trex_collided.png");
    chaoimagem = loadImage ("ground2.png");

    nuvemimg = loadImage("cloud.png");

    obs1 = loadImage("obstacle1.png");
    obs2 = loadImage("obstacle2.png");
   obs3 = loadImage("obstacle3.png");
   obs4 = loadImage("obstacle4.png");
   obs5 = loadImage("obstacle5.png");
   obs6 = loadImage("obstacle6.png");

   gameoverImg = loadImage("gameOver.png");
   resetBotao = loadImage("restart.png");
}


  function setup(){

createCanvas(600,200);

   Trex = createSprite(50,160,20,50);
   Trex.addAnimation("correndo",TrexCorrendo);
   Trex.scale = 0.5;

   Trex.addAnimation("morto",TrexMorto);

borda = createEdgeSprites();

    chao = createSprite(200,180,400,20);
    chao.addImage("chao",chaoimagem);
    chao.x = chao.width/2;

    chaoinv = createSprite(100,190,400,10);
    chaoinv.visible = false;

    //var numero = Math.round(random(1,100));
    //console.log(numero);
    pontos = 0;

    grupoNuvens = new Group();
    grupoObs = new Group();

    Trex.debug = false;
    Trex.setCollider("circle", 0, 0, 35);

    gameover = createSprite(300,100);
    gameover.addImage(gameoverImg);
    gameover.scale = 0.8;

    reset = createSprite(300,140);
    reset.addImage(resetBotao);
    reset.scale = 0.4;
}


  function draw(){
    background("white");

    //console.log (Trex.y);


        if(estado === JOGANDO){
      chao.velocityX = -2;
      
      if(keyDown("space") && Trex.y >= 150){
        Trex.velocityY = -10;
    }
  nuvens();
  obstaculos();

  pontos = pontos+Math.round(frameCount/60);

  Trex.velocityY = Trex.velocityY + 1;

  gameover.visible = false;
  reset.visible = false;

  if(grupoObs.isTouching(Trex)){
    estado = GAMEOVER;
  }
    } 
    
        else if (estado === GAMEOVER){
      chao.velocityX = 0;
      
      grupoNuvens.setVelocityXEach(0);
      grupoNuvens.setLifetimeEach(-1);
      
      grupoObs.setVelocityXEach(0);
      grupoObs.setLifetimeEach(-1);

      Trex.changeAnimation("morto");

      Trex.velocityY = 0;

      gameover.visible = true;
      reset.visible = true;

    }



 

  

  
  Trex.collide(chaoinv);


drawSprites();
text(pontos,500,50);

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
    grupoNuvens.add(nuvem);
  }
}

function obstaculos (){
  if (frameCount%60 === 0){
   var obstaculo = createSprite (600,165,10,40);
   obstaculo.velocityX = -6;
   var numero = Math.round(random(1,6));
   switch (numero) {
      case 1: obstaculo.addImage(obs1);
       break;
       case 2: obstaculo.addImage(obs2);
       break;
       case 3: obstaculo.addImage(obs3);
       break;
       case 4: obstaculo.addImage(obs4);
       break;
       case 5: obstaculo.addImage(obs5);
       break;
       case 6: obstaculo.addImage(obs6);
       break;
   
     default:
       break;
   } 

   obstaculo.scale = 0.5;

   obstaculo.lifetime = 300;
   grupoObs.add(obstaculo);

  }

}