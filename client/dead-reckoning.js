module.exports = {
  zerothOrder: function(localBoid, actualBoid) {
    return actualBoid;
  },

  firstOrder: function(localBoid, actualBoid) {
    return [
      localBoid[0],
      localBoid[1],
      actualBoid[2],
      actualBoid[3],
      actualBoid[4],
      actualBoid[5],
    ];
  }
};
