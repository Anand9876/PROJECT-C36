//Create variables here
var dog;
var happyDog;
var database;
var foodS;
var foodStock;
var dogImage,dogImage1;
var foodObj;
var fedTime,lastFed,feed,addFood;

function preload()
{
	//load images here
  dogImage=loadImage("images/Dog.png");
  dogHappy=loadImage("images/happydog.png");
}

function setup() {
	createCanvas(1000, 400);

  dog=createSprite(800,200,150,150);
  dog.addImage(dogImage);
  dog.scale=0.15;

  database =firebase.database();
    

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
    
}


function draw() {  
  background(46,139,87);
  
  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })

  fill(255,255,254);
  textSize(15);
  if(lastFed >= 12){
    text("Last Feed:"+lastFed%12+"PM",350,30)
  }
  else if(lastFed==0){
    text("Last Feed:12AM",350,30);
  }
  else{
    text("Last Feed:"+lastFed+"AM",350,30)
  }
  drawSprites();

}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}
function feedDog(){
  dog.addImage(dogHappy);
  foodObj.updateFoodStock(foodObj.getfoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getfoodStock(),
    FeedTime: hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}



