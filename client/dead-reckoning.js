var dt = 1 / 60;

module.exports = {
  zerothOrder: function(localBoid, actualBoid) {
    return actualBoid;
  },

  firstOrder: function(localBoid, actualBoid) {
    return [
      localBoid[0],
      localBoid[1],
      (actualBoid[0] - localBoid[0]) / dt + actualBoid[0],
      (actualBoid[1] - localBoid[1]) / dt + actualBoid[1],
      actualBoid[4],
      actualBoid[5],
    ];
  },

  secondOrder: function(localBoid, actualBoid) {
    var ax = 2 / dt / dt * (actualBoid[0] - localBoid[0] + dt * (actualBoid[1] - localBoid[1]));
    var ay = 2 / dt / dt * (actualBoid[1] - localBoid[1] + dt * (actualBoid[1] - localBoid[1]));

    return [
      localBoid[0],
      localBoid[1],
      localBoid[2],
      localBoid[3],
      ax,
      ay
    ];
  },
};
