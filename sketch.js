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
  var morte;
  var pontuacao;
  var pulo;


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

   morte = loadSound("die.mp3");
   pontuacao = loadSound("checkPoint.mp3");
   pulo = loadSound("jump.mp3");
}


  function setup(){

createCanvas(windowWidth,windowHeight);

   Trex = createSprite(50,height-70,20,50);
   Trex.addAnimation("correndo",TrexCorrendo);
   Trex.scale = 0.5;

   Trex.addAnimation("morto",TrexMorto);

borda = createEdgeSprites();

    chao = createSprite(width/2,height-80,width,125);
    chao.addImage("chao",chaoimagem);
    chao.x = chao.width/2;

    chaoinv = createSprite(width/2,height-10,width,125);
    chaoinv.visible = false;

    //var numero = Math.round(random(1,100));
    //console.log(numero);
    pontos = 0;

    grupoNuvens = new Group();
    grupoObs = new Group();

    Trex.debug = false;
    Trex.setCollider("circle", 0, 0, 35);

    gameover = createSprite(width/2,height/2-50);
    gameover.addImage(gameoverImg);
    gameover.scale = 0.8;

    reset = createSprite(width/2,height/2);
    reset.addImage(resetBotao);
    reset.scale = 0.4;
}


  function draw(){
    background("white");

    //console.log (Trex.y);


        if(estado === JOGANDO){
      chao.velocityX = -(4+pontos/500);

      if(chao.x < 0){
        chao.x = chao.width/2;
      }
      
      if(keyDown("space") && Trex.y >= height-150 || touches.length > 0 && Trex.y >= height-150){
        Trex.velocityY = -15;
        pulo.play();
        touches = [];
    }
  nuvens();
  obstaculos();

  pontos = pontos+Math.round(frameRate()/60);

  Trex.velocityY = Trex.velocityY + 1;

  gameover.visible = false;
  reset.visible = false;

  if (pontos % 500 === 0 && pontos > 0){
    pontuacao.play();
  }

  if(grupoObs.isTouching(Trex)){
    estado = GAMEOVER;
    morte.play();
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

      if(mousePressedOver(reset) || touches.length > 0){
        reiniciar();
        touches = [];
      }

    }

  
  Trex.collide(chaoinv);


drawSprites();
text(pontos,width-100,height/2-150);

}

function reiniciar(){
  estado = JOGANDO;
  grupoNuvens.destroyEach();
  grupoObs.destroyEach();
  Trex.changeAnimation("correndo");
  pontos = 0;
}

function nuvens(){
  if (frameCount%60 === 0){
    nuvem = createSprite(width+20,height-300,40,10);
    nuvem.addImage (nuvemimg);
    nuvem.scale = 0.7;
    nuvem.y = Math.round(random(10,height/2));
    nuvem.velocityX = -3;
    nuvem.depth = Trex.depth;
    Trex.depth = Trex.depth + 1;
    nuvem.lifetime = 250;
    grupoNuvens.add(nuvem);
  }
}

function obstaculos (){
  if (frameCount%60 === 0){
   var obstaculo = createSprite (width,height-95,10,40);
   obstaculo.velocityX = -(6+pontos/500);
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