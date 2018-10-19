/**
 * Limits the x value to a certain size. Using tanh as an activation function
 *
 * @param {int} x - the integer you want to limit
 * @returns {int} - new limited x
 */
const limit = (x) => {
  const maxMove = 100;
  return Math.tanh(1 / maxMove * x) * maxMove;
};

/**
 *
 * @param {cc.Event.EventTouch} event - movement event
 */
const movementEventHandler = ({
  that,
  moveEvent,
  frameWidth,
  halfBlockWidth,
  bufferSize
}) => {
  if (moveEvent.getID() !== 0) {
    return;
  }

  const blockX = that.node.position.x;
  const deltaX = moveEvent.getDelta().x;
  const nextX = blockX + limit(deltaX);
  const newPosition = cc.v2(nextX, that.node.position.y);
  const worldX = that.node.parent.convertToWorldSpaceAR(newPosition).x; // convert block to world coordinates

  if (worldX > (frameWidth - halfBlockWidth - bufferSize)) {
    that.node.emit('touchcancel');
    return;
  }

  if (worldX < (halfBlockWidth + bufferSize)) {
    that.node.emit('touchcancel');
    return;
  }

  that.movingVertical = false;
  const blockAction = cc.moveTo(0, newPosition);
  if (that.movingHorizontal) {
    that.node.runAction(blockAction);
  }
};

const setupEventHandler = (that) => {
  const bufferSize = 25; // margin between block and edge of screen
  const frameWidth = cc.view.getFrameSize().width;
  const halfBlockWidth = that.node.width / 2;

  that.node.on('touchmove', (moveEvent) => {
    movementEventHandler({
      that,
      moveEvent,
      bufferSize,
      frameWidth,
      halfBlockWidth
    });
  });

  that.node.on('touchstart', () => {
    that.movingHorizontal = true;
  });

  that.node.on('touchcancel', () => {
    that.movingVertical = true;
    that.movingHorizontal = false;
    that.node.stopAllActions();
  });

  that.node.on('touchend', () => {
    that.movingVertical = true;
    that.movingHorizontal = false;
    that.node.stopAllActions();
  });
};

cc.Class({
  extends: cc.Component,

  properties: {
    speed: 50,
    movingHorizontal: true,
    movingVertical: true
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    const sp = this.node.addComponent(cc.Sprite);
    cc.loader.loadRes('assets/block', cc.SpriteFrame, (err, spriteFrame) => {
      if (err) {
        cc.error(err);
      }
      sp.spriteFrame = spriteFrame;
    });

    setupEventHandler(this);
  },

  start() {

  },

  update(dt) {
    if (this.movingVertical) {
      this.node.y -= this.speed * dt;
    }
  }

  // this code is currently unused as we have nothing to collide with !
  // onCollisionEnter(other, self) {

  // }
});
