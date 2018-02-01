function Pipe(){
	this.gap = 100;//random(50,100); // width between top and bottom
	this.top = random(50,height-this.gap-50);
	this.bottom = this.top+this.gap;
	this.w = 40; // width of pipe
	this.x = width;  // positon on screen (starts at right side of canvas)
	this.speed = 2;  // speed of movement across screen
	this.highlight = false;  // indicates whether bird is colliding
	this.passed = false; // indicates whether bird has passed this pipe sucessfully
	
	this.update = function(){
		this.x -= this.speed;  // move left on screen
		if(!this.passed && this.x < bird.x - this.w - bird.d/2){  // if not yet passed and has moved beyond bird position..
			this.passed = true; // mark this pipe as passed
			score++; // increment score
			if (score>highScore){ // update high score
				highScore = score;
			}
		}
	}
	// draw green rectangles according to pipe position
	this.show = function(){
		fill(100,255,25);
		if(this.highlight){
			fill(255,0,0);
		}
		rect(this.x,0,this.w,this.top)
		rect(this.x,this.gap+this.top,this.w,height-this.bottom);
	}
	
	// function that checks whether pipe has passed offscreen to the left
	this.offscreen = function(){
		if(this.x < -this.w){
			return true;
		}else{
			return false;
		}
	}
	
	// function that checks if pipe is intersecting the bird
	this.hits = function(bird){
		if(bird.y-bird.d/2 < this.top || bird.y+bird.d/2 > this.bottom){
			if(bird.x+bird.d/2 > this.x && bird.x-bird.d/2 < this.x+this.w){
				return true;
			}
		}
		return false;
	}
}
