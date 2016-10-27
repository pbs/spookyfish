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
  load: function (){
    PIXI.loader.add(fishImages).load(this.init.bind(this));
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
    var screenLeft = screenPosition * window.innerWidth/2;
    var screenRight = screenLeft + window.innerWidth/2;

    viewport.setBoundaries(0, screenLeft, window.innerHeight, screenRight);
    window.viewport = viewport;

    boundingRect = document.body.getBoundingClientRect();
    WIDTH = boundingRect.width;
    HEIGHT = boundingRect.height;
        
    school.all().forEach(function(fish, index){
      var randomFish = fishImages[Math.floor(Math.random() * fishImages.length)];
      var randomScale = Math.floor(Math.random() * (5 - 2) - 2 ) / 5;
            
      fish.sprite = new PIXI.Sprite(
        PIXI.loader.resources[randomFish].texture
      );
            
      fish.sprite.x = fish.x;
      fish.sprite.y = fish.y;
      fish.sprite.anchor.set(0.5);
      fish.randomScale = randomScale;
      
      fish.sprite.scale.set(randomScale, randomScale);
            
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
      .forEach(function(fish, index) {
        fish.sprite.x = fish.x;
        fish.sprite.y = fish.y;
      
        //thisFish.rotation = Math.sin(boid[3]);
        
        fish.sprite.scale.x = Math.sign(fish.vx) * Math.abs(fish.sprite.scale.x);      
      });
  },
};
