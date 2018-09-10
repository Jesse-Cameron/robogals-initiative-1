const { changeScene } = require('./Util/sceneUtils');
const {
  SCI_NARRATIVE_1_SCENE,
  TECH_NARRATIVE_1_SCENE
} = require('./constants');

const setupEventHandlers = (that) => {
  that.sLabel.on('mousedown', () => {
    changeScene(SCI_NARRATIVE_1_SCENE);
  });

  that.tLbl.on('mousedown', () => {
    changeScene(TECH_NARRATIVE_1_SCENE);
  });
};

cc.Class({
  extends: cc.Component,

  properties: {
  },

  // use this for initialization
  onLoad() {
    this.sLabel = this.node.getChildByName('spriteS');
    this.tLbl = this.node.getChildByName('spriteT');
    setupEventHandlers(this);
  },

  // called every frame
  update() {

  }
});
