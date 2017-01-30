var bird;
var pipes = [];
var score = 0;
var highScore = 0;
var mic;
var fft;
var upperLim;
var lowerLim;
var sliderTop;
var sliderBottom;
var soundFlap = false;
var soundMode = true;
var b;

function setup(){
	// test comment
 	b = createButton('Turn off Mic');
 	b.position(10,10);
 	b.mousePressed(toggleSound);
	createCanvas(400,600);
	bird = new Bird();
	pipe = new Pipe();
	
	pipes.push(new Pipe());
	mic = new p5.AudioIn();
	if(soundMode){
		mic.start();
		fft = new p5.FFT();
		fft.setInput(mic);
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
		
		var spectrum = fft.analyze();
		beginShape();
		noFill();
		for (var i = 0; i<spectrum.length; i++){
			vertex(i,map(spectrum[i],0,255,height,0));
		}
		endShape();
		
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
