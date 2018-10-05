const { gameTimer } = require('../util/sceneUtils');
const { FADE_TIME, TIMEOUT } = require('../constants');

const limit = (x) => {
  const maxMove = 80;
  return Math.tanh(1 / maxMove * x) * maxMove;
};

const bufferSize = 50;    // margin between block and edge of screen
const frameWidth = cc.view.getFrameSize().width;

const setupEventHandlers = (that) => {

  that.block1.on('touchmove', (moveEvent) => {
    if (moveEvent.getID() !== 0) {
      return;
    }

    const blockX = that.block1.position.x; // convert block coordinates
    const blockWidth = that.block1.width;

    const deltaX = moveEvent.getDelta().x;
    const nextX = blockX + limit(deltaX);
    const newPosition = cc.v2(nextX, that.block1.position.y);

    const worldX = that.block1.parent.convertToWorldSpaceAR(newPosition).x;

    if (worldX > frameWidth - blockWidth/2 - bufferSize) {
      that.block1.emit('touchend');
      return;
    }

    if (worldX <  blockWidth/2 + bufferSize) { 
      that.block1.emit('touchend');
      return;
    }
    // console.log(`delta ${deltaX}, activated: ${limit(deltaX)}`);

    const blockAction = cc.moveTo(0, newPosition);
    that.block1.runAction(blockAction);
  });

  that.count = 0;
  that.gameTimerCb = () => {
    const label = that.node.getChildByName('timer_lbl');
    switch (that.count) {
      case 0:
        label.color = new cc.Color(184, 95, 0);
        break;
      case 1:
        label.color = new cc.Color(121, 0, 0);
        label.getComponent(cc.Label).string = 'TIMES UP';
        break;
      default:
        that.unschedule(that.gameTimerCb);
        break;
    }
    that.count += 1;

  };

  gameTimer({
    component: that,
    length: TIMEOUT,
    repeat: 2,
    timeOutCallback: that.gameTimerCb
  });
};

cc.Class({
  extends: cc.Component,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:
  onLoad() {
    // touch input block
    this.block1 = this.node.getChildByName("block1");
    setupEventHandlers(this);
  }
  // start() {

  // update (dt) {},
});
