const { FADE_TIME } = require('../constants');

cc.Class({
  extends: cc.Component,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:
  onLoad() {
    this.node.opacity = 0;
    this.node.color = new cc.Color(0, 0, 0);
    this.node.runAction(
      cc.fadeIn(FADE_TIME)
    );
  }

  // start() {

  // },

  // update (dt) {},
});
