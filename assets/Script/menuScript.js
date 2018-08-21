const { changeScene } = require('./Util/sceneUtils');
const { SCIENCE_SCENE } = require('./constants');

const setupEventHandlers = (that) => {
  that.sLabel.on('mousedown', () => {
    changeScene(SCIENCE_SCENE);
  });
};

cc.Class({
  extends: cc.Component,

  properties: {
  },

  // use this for initialization
  onLoad() {
    this.sLabel = this.node.getChildByName('spriteS');
    setupEventHandlers(this);
  },

  // called every frame
  update() {

  }
});
