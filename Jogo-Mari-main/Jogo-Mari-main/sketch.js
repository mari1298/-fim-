var bgfloresta, raposa, imraposa, floresta, dora,leao, passaro,cobra;
var obscimag, obsbaixog, recomesar, recoima;
var PLAY = 0;
var END = 1;
var GameSTA = PLAY;
var score = 0

function preload(){
  bgfloresta = loadImage("assets/flore.jpg")
  imraposa = loadImage("assets/raposa.png")
  dora = loadImage("assets/dorapre.png")
  leao = loadImage("assets/leaobanguela.png")
  passaro = loadImage("assets/obsTop2.png")
  cobra = loadImage("assets/sr.cobra.png")
  recoima = loadImage("assets/restart.png")
}

function setup(){
  createCanvas(1000,550)

  //imagem de plano de fundo
  floresta = createSprite(500,275);
  floresta.addImage(bgfloresta);
  floresta.scale = 0.9

  //criando canto superior e inferior
  bottomGround = createSprite(200,390,800,20);
  bottomGround.visible = false;

  topGround = createSprite(200,10,800,20);
  topGround.visible = false;

   recomesar = createSprite(500,250)
   recomesar.addImage(recoima)
   
  //criando o balão     
  raposa = createSprite(150,200,20,50);
  raposa.addImage(imraposa);
  raposa.scale = 0.2;

  obscimag = new Group();
  obsbaixog = new Group();
  raposa.debug=false
  raposa.setCollider("circle",0,0,150)
}

function criObista(){
 if(frameCount%140===0){
  var obisdecima = createSprite(1000,100);
  obisdecima.velocityX= -3;
  var aleatorio = Math.round(random(1,2));
  switch(aleatorio){
    case 1: obisdecima.addImage(dora);
    obisdecima.scale = 0.5
     break;
    case 2: obisdecima.addImage(passaro);
    obisdecima.scale = 0.2
     break;
   default:break;
  }

  obisdecima.debug=false
  obisdecima.setCollider("circle",0,0,250)
  obisdecima.lifetime= 345;
  obscimag.add(obisdecima);
 }
}

function criObista1(){
  if(frameCount%200===0){
   var obisdebaixo = createSprite(1000,500);
   obisdebaixo.velocityX=-4
   var aleatorio = Math.round(random(1,2));
   switch(aleatorio){
     case 1: obisdebaixo.addImage(leao);
     obisdebaixo.scale = 0.4
      break;
     case 2: obisdebaixo.addImage(cobra);
     obisdebaixo.scale = 0.1
      break;
    default: break;
   }

   obisdebaixo.debug=false
   obisdebaixo.setCollider("circle",0,0,250)
   obisdebaixo.lifetime= 345;
   obsbaixog.add(obisdebaixo);
  }
 
}
 

function draw() {
  
  background("black");

  if(GameSTA === PLAY){
    //fazendo o balão de ar quente pular
    if(keyDown("space")) {
      raposa.velocityY = -6 ;
    }
      //adicionando gravidade
    raposa.velocityY = raposa.velocityY + 2;
    score=Math.round(frameCount)
    recomesar.visible=false

    criObista();
    criObista1();
   if(obsbaixog.isTouching(raposa)|| obscimag.isTouching(raposa) ||raposa.y>460 ||raposa.y<40){
    GameSTA = END  
   }

 } else if(GameSTA === END){
    raposa.velocityY = 00 ;
    obsbaixog.setVelocityXEach(0)
    obscimag.setVelocityXEach(0)

    recomesar.visible=true
    
    obsbaixog.setLifetimeEach(-1) 
    obscimag.setLifetimeEach(-1) 
    if(mousePressedOver(recomesar)){
      GameSTA = PLAY
      score = 0
    } 
   
  }

 
  drawSprites();
  textSize(20)
   text("pontos:" + score,850,50)
   if(GameSTA === END){
    textSize(45)
    text("Fim de jogo",400,200)
  }
}
