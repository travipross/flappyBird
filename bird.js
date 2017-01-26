var bird;
var pipes = [];
var score = 0;
var highScore = 0;
var mic;
var upperLim;
var lowerLim;
var sliderTop;
var sliderBottom;
var soundFlap = false;
var soundMode = false;
var b;

function setup(){
 	b = createButton('Turn on Mic');
 	b.position(10,10);
 	b.mousePressed(toggleSound);
	createCanvas(600,600)
	bird = new Bird();
	pipe = new Pipe();
	
	pipes.push(new Pipe());
	mic = new p5.AudioIn();
	if(soundMode){
		mic.start();
		sliderTop = createSlider(0,1,0.12,0.01);
		sliderBottom = createSlider(0,1,0.07,0.01);
	}
	
}

function draw(){
	background(100,100,255);
	
	// sound stuff
	if(soundMode){
		var vol = mic.getLevel();
		fill(255);
		noStroke();
		var y = map(vol,0,1,height,0);
		rect(width-30,y,30,height-y);
		var thresholdTop = sliderTop.value();
		var tyt = map(thresholdTop,0,1,height,0);
		stroke(255,0,0);
		strokeWeight(4);
		line(width-30,tyt,width,tyt);
		var thresholdBottom = sliderBottom.value();
		var tyb = map(thresholdBottom,0,1,height,0);
		stroke(0,0,255);
		strokeWeight(4);
		line(width-30,tyb,width,tyb);
		stroke(0);
		strokeWeight(1);
		
		if(vol > thresholdTop && !soundFlap){
			console.log('flapped');
			bird.flap();
			soundFlap = true;
		}
	
		if(vol < thresholdBottom){
			soundFlap = false;
		}
	}
	
	bird.update();
	bird.show();
	if(frameCount % 200 == 0){
		pipes.push(new Pipe());
	}
	
	for (var i = pipes.length-1; i >= 0; i--){
		pipes[i].update(bird);
		pipes[i].show();
		if(pipes[i].offscreen()){
			pipes.splice(i,1);
		}
		if(pipes[i].hits(bird)){
			pipes[i].highlight = true;
			pipes[i].passed = true;
			score = 0;
		}else{
			pipes[i].highlight = false;
		}
	}
	fill(255)
	stroke(0);
	textSize(30);
	textStyle(BOLD);
	textAlign(RIGHT);
	text("Score: " + score,width-30,50);
	text("Best: " + highScore, width-30,100);
}

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

function touchStarted(){
	bird.flap();
	if(!soundMode){
		return false;
	}
}

function toggleSound(){
	soundMode = !soundMode;
	if(soundMode){
		mic = new p5.AudioIn();
		mic.start();
		sliderTop = createSlider(0,1,0.12,0.01);
		sliderBottom = createSlider(0,1,0.07,0.01);
		b.html('Turn off mic');
	}else{
		mic.stop();
		sliderTop.remove();
		sliderBottom.remove();
		b.html('Turn on mic');
	}
}
