function Pipe(){
	this.gap = 100;//random(50,100);
	this.top = random(50,height-this.gap-50);
	this.bottom = this.top+this.gap;
	this.w = 40;
	this.x = width;
	this.speed = 2;
	this.highlight = false;
	this.passed = false;
	
	this.update = function(){
		this.x -= this.speed;
		if(!this.passed && this.x < bird.x - this.w - bird.d/2){
			this.passed = true;
			score++;
			if (score>highScore){
				highScore = score;
			}
		}
	}
	this.show = function(){
		fill(100,255,25);
		if(this.highlight){
			fill(255,0,0);
		}
		rect(this.x,0,this.w,this.top)
		rect(this.x,this.gap+this.top,this.w,height-this.bottom);
	}
	
	this.offscreen = function(){
		if(this.x < -this.w){
			return true;
		}else{
			return false;
		}
	}
	
	this.hits = function(bird){
		if(bird.y-bird.d/2 < this.top || bird.y+bird.d/2 > this.bottom){
			if(bird.x+bird.d/2 > this.x && bird.x-bird.d/2 < this.x+this.w){
				return true;
			}
		}
		return false;
	}
}