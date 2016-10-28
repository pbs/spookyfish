var config = require('../shared/config');
var viewport = require('./viewport');
var school = require('../shared/school');

var boundingRect;
var WIDTH;
var HEIGHT;
var ctx;
var renderer;
var stage;

var fishImages = [
  "src-img/halloween_fish1.png",
  "src-img/halloween_fish2.png", 
  "src-img/halloween_fish3.png"
];

module.exports = {
  load: function (callback){
    PIXI.loader.add(fishImages).load(function() {
      this.init();
      callback && callback();
    }.bind(this));
  },
  
  init: function() {
    // Setup the renderer
    renderer = new PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.view);

    stage = new PIXI.Container();
    
    renderer.view.style.position = "absolute";
    
    renderer.view.style.display = "block";
    renderer.autoResize = true;
    renderer.resize(window.innerWidth, window.innerHeight);
    
    viewport.setElement(renderer.view);
    
    // things
    var screenPosition = Number(location.hash.substring(1))
    if(isNaN(screenPosition)) {
      screenPosition = 0;
    }
    var screenLeft = screenPosition * config.WINDOW_DEFAULT_WIDTH;
    var screenRight = screenLeft + config.WINDOW_DEFAULT_WIDTH;

    viewport.setBoundaries(0, screenLeft, config.WINDOW_DEFAULT_HEIGHT, screenRight);
    window.viewport = viewport;

    boundingRect = document.body.getBoundingClientRect();
    WIDTH = boundingRect.width;
    HEIGHT = boundingRect.height;
        
    school.all().forEach(function(fish, index){
      var randomFish = fishImages[fish.id % fishImages.length];
            
      fish.sprite = new PIXI.Sprite(
        PIXI.loader.resources[randomFish].texture
      );
            
      fish.sprite.x = fish.x;
      fish.sprite.y = fish.y;
      fish.sprite.anchor.set(0.5);
      
      fish.sprite.scale.set(fish.scale, fish.scale);
            
      stage.addChild(fish.sprite);
    });
    
    renderer.render(stage);
    requestAnimationFrame(this.update.bind(this));
  },
  
  update: function() {
    school.tick();
    requestAnimationFrame(this.update.bind(this));


    this.draw();
    renderer.render(stage);
  },

  draw: function() {
    //ctx.clearRect(0, 0, WIDTH, WIDTH);
    //ctx.fillStyle = 'black';

    school
      .all()
      .map(viewport.attachLocalCoords)
      .forEach(function(attached, index) {
        var localCoords = attached.localCoords;
        var fish = attached.fish;
        fish.sprite.x = localCoords.x;
        fish.sprite.y = localCoords.y;
      
        var fishTexturePath = fishImages[fish.id % fishImages.length];
        fish.sprite.texture = PIXI.loader.resources[fishTexturePath].texture;
      
        //thisFish.rotation = Math.sin(boid[3]);
        
        fish.sprite.scale.x = Math.sign(fish.vx) * Math.abs(fish.sprite.scale.x);      
      });
  },
};
