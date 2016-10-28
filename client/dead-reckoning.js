var dt = 1 / 60;

// This performs dead reckoning: The client has a local estimation of the server's data, but periodically the server
// will send the correct data. These functions will take the server's data and "fix" the client's data to attempt to
// line it up visually. If all the clients do this, the idea is that they will all visually show the same thing (more
// or less), even though their data might drift a little over time.
module.exports = {
  // Really dumb correction, essentially teleports the fish to the correct location.
  zerothOrder: function(fish, serializedServerFish) {
    fish.x = serializedServerFish.x;
    fish.y = serializedServerFish.y;
    fish.vx = serializedServerFish.vx;
    fish.vy = serializedServerFish.vy;
    return fish;
  },

  // First order: Only changes velocity to attempt to align the fish's position. This is better because it's less jerky
  firstOrder: function(fish, serializedServerFish) {
    fish.vx = (serializedServerFish.x - fish.x) / dt + serializedServerFish.vx;
    fish.vy = (serializedServerFish.y - fish.y) / dt + serializedServerFish.vy;
    return fish;
  },

  // If we acceleration, we'd apply the same idea above as velocity
  secondOrder: function(fish, serializedServerFish) {
    // TODO: Implement this?
    return fish;
  },
};
