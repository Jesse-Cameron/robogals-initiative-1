
const { changeScene } = require('./Util/sceneUtils');

const setupEventHandlers = (that) => {
  that.sLabel.on('mousedown', () => {
    changeScene('menu');
  });
};

cc.Class({
  extends: cc.Component,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:
  onLoad() {
    this.sLabel = this.node.getChildByName('home_button');
    setupEventHandlers(this);
  }

  // start() {

  // },

  // update (dt) {},
});
