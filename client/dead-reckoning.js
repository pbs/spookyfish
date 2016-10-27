var dt = 1 / 60;

module.exports = {
  zerothOrder: function(fish, serializedServerFish) {
    fish.x = serializedServerFish.x;
    fish.y = serializedServerFish.y;
    return fish;
  },

  firstOrder: function(fish, serializedServerFish) {
    fish.vx = (serializedServerFish.x - fish.x) / dt + serializedServerFish.vx;
    fish.vy = (serializedServerFish.y - fish.y) / dt + serializedServerFish.vy;
    return fish;
  },

  secondOrder: function(fish, serializedServerFish) {
    // TODO: Implement this?
    return fish;
  },
};
