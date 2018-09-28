const { gameTimer } = require('../util/sceneUtils');
const { FADE_TIME, TIMEOUT } = require('../constants');

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

    gameTimer(this, TIMEOUT, () => {
      const label = this.node.getChildByName('timer_lbl');
      label.getComponent(cc.Label).string = 'Times up!';
    });
  }

  // start() {

  // },

  // update (dt) {},
});
