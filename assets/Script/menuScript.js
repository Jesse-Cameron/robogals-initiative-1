const { changeScene } = require('./Util/sceneUtils');
const { SCI_NARRATIVE_1_SCENE } = require('./constants');

const setupEventHandlers = (that) => {
  that.sLabel.on('mousedown', () => {
    changeScene(SCI_NARRATIVE_1_SCENE);
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
