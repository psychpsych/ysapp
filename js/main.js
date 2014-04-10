
goog.provide('ysBird');



goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Sprite');
goog.require('lime.Label');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');

goog.require('ysBird.Bird');
goog.require('ysBird.Game');
goog.require('ysBird.mainTimeline');




ysBird.start = function(){

	var director = new lime.Director(document.body,600,400).setDisplayFPS(false),
	    initScene = new lime.Scene(),

	    mainLayer = new ysBird.mainTimeline(),
        playBtn = new lime.Sprite().setSize(50,30).setFill('assets/start_game_btn.png').setPosition(50,180).setAnchorPoint(0,0),


    mainLayer.appendChild(playBtn).appendChild(rankBtn);
    var bird = new ysBird.Bird();
    mainLayer.appendChild(bird);


    director.makeMobileWebAppCapable();
    initScene.appendChild(mainLayer);
    goog.events.listen(playBtn,['mousedown','touchstart'],function(e){
        var game = new ysBird.Game();
        director.replaceScene(game.gameScene);
    });

    goog.events.listen(rankBtn,['mousedown','touchstart'],function(e){


    });


	director.replaceScene(initScene);

}



goog.exportSymbol('ysBird.start', ysBird.start);
