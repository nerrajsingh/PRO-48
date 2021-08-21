let ground;
let lander;
var lander_img;
var bg_img;
var thrust;
var rcs_left;
var rcs_right;
var gameState="play"


var vx = 0;
var vy = 0;
var g = 0.05;
var fuel = 100;

function preload()
{
  lander_img = loadImage("normal.png");
  bg_img = loadImage("bg_sur.png");
  thrust = loadAnimation("b_thrust_1.png","b_thrust_2.png","b_thrust_3.png");
  crash= loadAnimation("crash1.png","crash2.png","crash3.png");
  land = loadAnimation("landing1.png" ,"landing2.png","landing_3.png");
  rcs_left = loadAnimation("left_thruster_1.png","left_thruster_2.png");
  normal = loadAnimation("normal.png");
  rcs_right = loadAnimation("right_thruster_1.png","right_thruster_2.png");
  blastImage=loadImage("crash3.png");
  blast=loadSound("blast2.mp3");
  blast.looping=false;


  thrust.playing= true;
  thrust.looping= false;
  rcs_left.looping = false;
  rcs_right.looping = false;
}

function setup() {
  createCanvas(1000,700);
  frameRate(80);
  timer = 1500;
  ground1=createGroup();
  ground2=createSprite(500,650,1000,10);
  ground2.visible=false;


  thrust.frameDelay = 5;
  rcs_left.frameDelay = 5;
  rcs_right.frameDelay = 5;

  lander = createSprite(100,50,30,30);
  lander.addImage(lander_img);
  lander.scale = 0.1;

  //lander.addAnimation('thrust',"b_thrust_1.png","b_thrust_2.png","b_thrust_3.png" );
  lander.addAnimation('thrusting',thrust);
  lander.addAnimation('left',rcs_left);
  lander.addAnimation('normal',normal);
  lander.addAnimation('right',rcs_right);

  


  rectMode(CENTER);
  textSize(15);
}

function draw() 
{
  background(51);
  image(bg_img,0,0);
  push()
  fill(255);
  text("Horizontal Velocity: " +round(vx,2),800,50);
  text("Fuel: "+fuel,800,25);
  text("Vertical Velocity: "+round(vy),800,75);
  pop();

  //fall down
  
  if(gameState==="play"){
    vy +=g;
    lander.position.y+=vy;
    lander.position.x +=vx;
  blink();


    if(lander.isTouching(ground1) ){
      gameState="end";
      a=lander.x;
      b=lander.y;
    }
    if(lander.isTouching(ground2)){
      gameState="END1";
      c=lander.x;
      d=lander.y;

    }
  }
if(gameState==="END1"){
  textSize(40);
  fill("White");
  text("LANDING UNSUCCESFUL",370,400)
  image(blastImage,c-150,d-200,250,250);
  lander.visible=false;
  blast.play();



}
  if(gameState==="end"){
    lander.x=a;
    lander.y=b;
    textSize(40);
    fill("White");
    text("LANDING SUCCESFUL",370,400)
  }


  drawSprites();
}
function blink(){
  if(frameCount%20===0){
    ground = createSprite(500,600,100,10);

ground.shapeColor="green"
ground.lifetime=10 
ground1.add(ground)
  }
}

function keyPressed()
{
  if(keyCode==UP_ARROW && fuel>0)
  {
    upward_thrust();
    lander.changeAnimation('thrusting');
    thrust.nextFrame();
    
  }
  if(keyCode==RIGHT_ARROW && fuel>0)
  {
    lander.x=lander.x+5;
    lander.changeAnimation('left');
    right_thrust();
  }

  if(keyCode==LEFT_ARROW && fuel>0)
  {
    lander.x=lander.x-5;
    lander.changeAnimation('right');
    left_thrust();
  }
}

function upward_thrust()
{
  vy = -1;
  fuel-=1;
}

function right_thrust()
{ 
  vx += 0.2;
  fuel -=1;
}

function left_thrust()
{
  vx -= 0.2;
  fuel-=1;
}
