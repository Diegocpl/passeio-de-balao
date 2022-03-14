var hypnoticBall, database;
var position, cidade, balao;

function preload(){
cidade = loadImage ("Images/cityImage.png")
balao = loadAnimation ("Images/HotAirBallon01.png","Images/HotairBallon02.png","Images/HotAirBallon03.png")
}
function setup(){
  database = firebase.database()

  createCanvas(500,500);
  
  hypnoticBall = createSprite(250,250,10,10);
  hypnoticBall.shapeColor = "red";
  hypnoticBall.addAnimation ("viagemdebalao",balao)
  var hypnoticBallPosition = database.ref("ball/position")
  hypnoticBall.scale = 0.5
  hypnoticBallPosition.on("value", readPosition,showError)


}

function draw(){
  background(cidade);
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}

function writePosition(x,y){

  database.ref("ball/position").set({
    "x":position.x+x,
    "y":position.y+y
  })


}

function readPosition(data){
  position = data.val()

  hypnoticBall.x = position.x
  hypnoticBall.y = position.y
}

function showError(){
  console.log("erro na conexão")
}

