module.exports = {
  init: function() {
    document.querySelector('canvas').addEventListener('click', this.onClick);
  },

  onClick: function(evt) {
    console.log(evt);
  }
};
