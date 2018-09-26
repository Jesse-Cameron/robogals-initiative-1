
const limit = (x) => {
  const maxMove = 80;
  return Math.tanh(1 / maxMove * x) * maxMove;
};

const setupEventHandlers = (that) => {
  that.block1.on('touchmove', (moveEvent) => {
    if (moveEvent.getID() !== 0) {
      return;
    }

    const blockX = that.block1.position.x; // convert block coordinates
    const deltaX = moveEvent.getDelta().x;
    const nextX = blockX + limit(deltaX);
    const newPosition = cc.v2(nextX, that.block1.position.y);

    const worldX = that.block1.parent.convertToWorldSpaceAR(newPosition).x;

    if (worldX > 760) {
      that.block1.emit('touchend');
      return;
    }

    if (worldX < 160) {
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

  onLoad() {
    this.block1 = this.node.getChildByName('block1');
    setupEventHandlers(this);
  },

  start() {
  }

  // update (dt) {},
});
