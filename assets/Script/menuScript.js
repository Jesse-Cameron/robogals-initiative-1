
const { changeScene } = require('./Util/sceneUtils');

const setupEventHandlers = (that) => {
  that.sLabel.on('mousedown', () => {
    changeScene('science_level');
  });
};

cc.Class({
  extends: cc.Component,

  properties: {
  },

  // use this for initialization
  onLoad() {
    this.sLabel = this.node.getChildByName('label_S');
    setupEventHandlers(this);
  },

  // called every frame
  update() {

  }
});
