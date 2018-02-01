function Bird(){
    // position
	this.y = height/2;
	this.x = width/3;
	
	// size
	this.d = 25;
	
	// speed and gravity
	this.g = 0.5;
	this.velocity = 0;
	this.flapSpeed = 7; // upward speed each "flap"
	
	// draw red circle as a bird
	this.show = function(){
		fill(255,50,50);
		ellipse(this.x,this.y,this.d,this.d);
	}
	
	// update position according to speed and gravity
	this.update = function(){
		this.velocity += this.g;
		this.y += this.velocity;
		
		if(this.y > height){
			this.y = height;
			this.velocity = 0;
		}
		
		if(this.y < 0){
			this.y = 0;
			this.velocity = 0;
		}
	}
	
	// increase upward vertical speed by flapspeed (minimum of flapspeed)
	this.flap = function(){
		if(this.velocity > 0){
			this.velocity = 0;
		}
		this.velocity-=this.flapSpeed;
	}
}
