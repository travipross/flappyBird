function Bird(){
	this.y = height/2;
	this.x = width/3;
	this.d = 25;
	this.g = 0.5;
	this.velocity = 0;
	this.flapSpeed = 7;
	
	this.show = function(){
		fill(255,50,50);
		ellipse(this.x,this.y,this.d,this.d);
	}
	
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
	
	this.flap = function(){
		if(this.velocity > 0){
			this.velocity = 0;
		}
		this.velocity-=this.flapSpeed;
	}
}