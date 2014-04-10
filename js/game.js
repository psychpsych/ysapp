goog.provide('ysBird.Game');

goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Sprite');
goog.require('lime.Label');
goog.require('lime.scheduleManager');
goog.require('lime.animation.MoveBy');
goog.require('lime.animation.Easing');

goog.require('ysBird.mainTimeline');
goog.require('ysBird.Bird');
goog.require('ysBird.Pipe');


ysBird.Game = function(){
	var gameScene = new lime.Scene();
	var gameLayer = new ysBird.mainTimeline();
	var isDate = goog.now();
	var ysBird = new ysBird.Bird(80);
	var that = this;

	goog.events.listenOnce(gameLayer,['mousedown','touchstart'],function(e){
		that.start();
    });
    goog.events.listen(gameLayer,['mousedown','touchstart'],function(e){
		ysBird.fly();
    });
	gameLayer.appendChild(ysBird);
	
	gameScene.appendChild(gameLayer);
	this.gameScene = gameScene;
	this.ysBird = ysBird;
	this.gameLayer = gameLayer;
	this.pipeNumber = 2;
	this.pipeStartFrom = 300;
	this.pipes = [];
	this.scheduledFunctions = [];
}
ysBird.Game.prototype.start = function(){
	this.addPipes();
	this.scheduledFunctions.push(this.addPipes);
	lime.scheduleManager.scheduleWithDelay(this.addPipes,this,6000);
	
	
	this.scheduledFunctions.push(this.physicalEffect);
	lime.scheduleManager.schedule(this.physicalEffect, this);
	
	this.scheduledFunctions.push(this.checkGameOver);
	lime.scheduleManager.schedule(this.checkGameOver,this)
}
ysBird.Game.prototype.addPipes = function(){
	var newPipes = ysBird.Pipe.prototype.createPipes(this.pipeNumber,this.pipeStartFrom);
	for(var i in newPipes){
		newPipes[i].appendTo(this.gameLayer);
		this.pipes.push(newPipes[i]);
	}
}
ysBird.Game.prototype.physicalEffect = function(){
		if(this.ysBird.flying || this.physcialAlready){
			return
		}
		this.physcialAlready = true;
		var position = this.ysBird.getPosition();
    	var move = new lime.animation.MoveTo(position.x, position.y + 80).setDuration(4).setEasing(lime.animation.Easing.EASEOUT);
    	this.ysBird.runAction(move);
    	var that = this;
    	goog.events.listen(move,lime.animation.Event.STOP,function(){
   			that.physcialAlready = false;
		})
}
ysBird.Game.prototype.checkGameOver = function(){
	for(var i in this.pipes){
		var pipe = this.pipes[i];
		if(goog.math.Box.intersectsWithPadding(this.ysBird.getBoundingBox(),pipe.pipeUp.getBoundingBox(),-10)) {
            this.gameOver();
            return
        }
        if(goog.math.Box.intersectsWithPadding(this.ysBird.getBoundingBox(),pipe.pipeDown.getBoundingBox(),-10)) {
            this.gameOver();
            return
        }
	}
}
ysBird.Game.prototype.gameOver = function(){
	alert("Yorgun mu düştün? O zaman hadi yemeksepeti.com'a!");
	this.stopScheduledFunctions();
	for(var i in this.pipes){
		this.pipes[i].canMove = false;
	}
}


