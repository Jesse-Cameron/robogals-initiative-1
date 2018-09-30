
const limit = (x) => {
  const maxMove = 80;
  return Math.tanh(1 / maxMove * x) * maxMove;
};

const setupEventHandlers = (that) => {

  const bufferSize = 50;    // margin between block and edge of screen
  const frameWidth = cc.view.getFrameSize().width;

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
};

cc.Class({
  extends: cc.Component,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:
  onLoad() {

    // touch input block
    this.block1 = this.node.getChildByName('block1');
    setupEventHandlers(this);
  }

  // start() {

  // },

  // update (dt) {},
});
