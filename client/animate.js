var viewport = require('./viewport');
var flock = require('../shared/flock');

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
    renderer = new PIXI.autoDetectRenderer(WIDTH, HEIGHT);
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
    
    flock.boids().forEach(function(boid, index){
      var randomFish = Math.floor(Math.random() * (2 - 0));
      var randomScale = Math.floor(Math.random() * (5 - 2) - 2 ) / 5;
            
      var fish = new PIXI.Sprite(
        PIXI.loader.resources[fishImages[randomFish]].texture
      );
            
      fish.x = boid[0];
      fish.y = boid[1];
      
      fish.scale.set(randomScale, randomScale);
      
      boid.push(randomScale, fish);
      
//      boid[3] = randomScale;
//      boid[4] = fish;
            
      stage.addChild(fish); 
    });
    
    renderer.render(stage);
    requestAnimationFrame(this.update.bind(this));
  },
  
  update: function() {
    requestAnimationFrame(this.update.bind(this));

    
    flock.tick();

    this.draw();
    renderer.render(stage);
  },

  draw: function() {
    //ctx.clearRect(0, 0, WIDTH, WIDTH);
    //ctx.fillStyle = 'black';

    flock
      .boids()
      .filter(viewport.containsBoid)
      .map(viewport.toLocalCoords)
      .forEach(function(boid, index) {
        var thisFish = boid[boid.length-1];
        console.log(thisFish);
        
        //boid = [x, y, w, h, vx, vy ]
        thisFish.x = boid[0];
        thisFish.y = boid[1];
        thisFish.vx = boid[4];
        thisFish.vy = boid[5];
      
        //ctx.fillRect(boid[0], boid[1], 4, 4);
      });
      
  },
};
