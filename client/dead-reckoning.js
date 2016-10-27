var dt = 1 / 60;

module.exports = {
  zerothOrder: function(localBoid, actualBoid) {
    localBoid[0] = actualBoid[0];
    localBoid[1] = actualBoid[1];
    localBoid[2] = actualBoid[2];
    localBoid[3] = actualBoid[3];
    localBoid[4] = actualBoid[4];
    localBoid[5] = actualBoid[5];
    return localBoid;
  },

  firstOrder: function(localBoid, actualBoid) {
    var vx = (actualBoid[0] - localBoid[0]) / dt + actualBoid[0];
    var vy = (actualBoid[1] - localBoid[1]) / dt + actualBoid[1];
    localBoid[2] = vx;
    localBoid[3] = vy;
    return localBoid;
  },

  secondOrder: function(localBoid, actualBoid) {
    var ax = 2 / dt / dt * (actualBoid[0] - localBoid[0] + dt * (actualBoid[1] - localBoid[1]));
    var ay = 2 / dt / dt * (actualBoid[1] - localBoid[1] + dt * (actualBoid[1] - localBoid[1]));
    localBoid[4] = ax;
    localBoid[5] = ay;
    return localBoid;
  },
};
