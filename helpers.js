
//Point data structure
var point = function(x1,y1){
	return {x: x1 || 0,y: y1 || 0};
};

//Circle data structure
var circle = function(point,rad){
	return { o: point || new window.point() , r : rad || 0}; 

}

//Circle Intersection Check
//Note: the x , y and rop values comes from each car's master table
//To check : circle_intersect(new circle({x: car1.x, y: car1.y},car1.rop) , new circle({x: car1.x, y: car1.y},car1.rop));

//Note: The region of presence of two cars , just touching each other on a single point i.e r1 + r2 = dist is 
//not enough , to exchange master information

/*
##  Test Cases   ##
 1) Input:  //Intersecting Scenario
     Circle 1: 10,10 2   Circle 2: 11,11,2
  
    Call:	
   	circle_intersect(new circle({x: 10, y: 10},2) , new circle({x: 11, y: 11},2))

   	Expected Output: true
   	Actual Output: true   	

  2) Input:    //Just touching Scenario
     Circle 1: 10,10,2  Circle 2: 14,10,2

     Call:	
   	 circle_intersect(new circle({x: 10, y: 10},2) , new circle({x: 14, y: 10},2))

   	 Expected Output : false
   	 Actual Output: false

   3) Input:    //Far from touching Scenario
     Circle 1: 10,10,2  Circle 2: 16,10,2

     Call:	
   	 circle_intersect(new circle({x: 10, y: 10},2) , new circle({x: 16, y: 10},2))

   	 Expected Output : false
   	 Actual Output: false  	 
*/

 var circle_intersect = function(circle1,circle2){
	if(typeof circle1 != 'undefined' && typeof circle2 != 'undefined')
	{		
		var r1 = circle1.r; 
		var r2 =  circle2.r;
		var dist =  Math.sqrt((circle2.o.y-circle1.o.y)*(circle2.o.y-circle1.o.y) + (circle2.o.x-circle1.o.x)*(circle2.o.x-circle1.o.x));

		if(dist >= r1 + r2 || dist < Math.abs(r1-r2) || (dist == 0 && r1 == r2 ))
			return false; 
		else
			return true;
		
		
	}else
		return false;
	
}

/*
 Name: Collision detection algorithm 
 Description: This function detects if there is any possiblity of collision with any of the cars , present in its master table
 Input Master Table Schema:
 [
	{
	 ACCEL: 
	 CARID: 
	 ROP: 
	 SPEED: 
	 TIMESTAMP: 
	 ORIENTATION:
	 X: 
	 Y:
	 HEIGHT:
	 WIDTH:
 	}	
 ]

*/
var collisions = function(carId,carMaster){

	   var source = _.find(carMaster,function(car){ return car.CARID == carId});
 	   var collisionList = []; //List containing the carId's of all cars that may collide with 
 	   var timeInterval = 1,inc;
 	   var temp;
 	   for(var i=0;i<carMaster.length && carMaster[i].CARID != carId;i++){
 	   		temp = carMaster[i];
 	   		if(temp.ORIENTATION == 0){ //right
 	   			inc = temp.SPEED + temp*(0.5+timeInterval);
 	   			temp.X += inc;

 	   		}
 	   		else if(temp.ORIENTATION == 180){
				inc = temp.SPEED + temp*(0.5+timeInterval);
 	   			temp.X -= inc; 	   			
 	   		}
 	   		else if(temp.ORIENTATION == 90){
				inc = temp.SPEED + temp*(0.5+timeInterval);
 	   			temp.Y -= inc; 	   			
 	   		}
 	   		else if(temp.ORIENTATION == 270){
				inc = temp.SPEED + temp*(0.5+timeInterval);
 	   			temp.Y += inc; 	   			
 	   		}

 	   		if (source.X < temp.X + temp.WIDTH/2 &&
				    source.X + temp.WIDTH/2 > temp.X &&
				    source.Y < temp.Y + temp.HEIGHT/2 &&
				    source.HEIGHT/2 + source.Y > temp.Y) {
				    	collisionList.push(temp);
			}
 	   }
 	   return collisionList;
 	   //console.log(canCollide('A',carMaster));

}

/*
	This function proposes a path for the vechicle to avoid collision with surrounding vehicles
	Parameters:
		1. carId -> The cars identity
		2. carMaster -> The carMaster table
		3. collisionList -> the Algorithms will return path only if the collisionList is populated
*/

var vehicleAvoidancePath  = function(carId,carMater,collisionList){
	if(collisionList.length){
	   var source = _.find(carMaster,function(car){ return car.CARID == carId});
 	   var timeInterval = 1,inc;
 	   var temp;
 	   for(var i=0;i<carMaster.length && carMaster[i].CARID != carId;i++){
 	   		temp = carMaster[i];
 	   		if(temp.ORIENTATION == 0){ //right
 	   			inc = temp.SPEED + temp*(0.5+timeInterval);
 	   			temp.X += inc;

 	   		}
 	   		else if(temp.ORIENTATION == 180){
				inc = temp.SPEED + temp*(0.5+timeInterval);
 	   			temp.X -= inc; 	   			
 	   		}
 	   		else if(temp.ORIENTATION == 90){
				inc = temp.SPEED + temp*(0.5+timeInterval);
 	   			temp.Y -= inc; 	   			
 	   		}
 	   		else if(temp.ORIENTATION == 270){
				inc = temp.SPEED + temp*(0.5+timeInterval);
 	   			temp.Y += inc; 	   			
 	   		}

 	   		if (source.X < temp.X + temp.WIDTH/2 &&
				    source.X + temp.WIDTH/2 > temp.X &&
				    source.Y < temp.Y + temp.HEIGHT/2 &&
				    source.HEIGHT/2 + source.Y > temp.Y) {
 	   			
				  
			}
 	   }
	}
};
