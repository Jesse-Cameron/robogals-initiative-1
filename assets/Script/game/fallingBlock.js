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

cc.Class({
  extends: cc.Component,

  properties: {
    speed: 50,
    movingHorizontal: true,
    movingVertical: true
  },

  /**
  * handler for the `touchmove` event
  *
  * @param {cc.Event.EventTouch} moveEvent - triggered movement event
  * @param {integer} frameWidth - width of the cocos view frame
  * @param {integer} halfBlockWidth - half the width of the moving block
  * @param {integer} bufferSize - edge of screen buffer size
  */
  movementEventHandler({
    moveEvent,
    frameWidth,
    halfBlockWidth,
    bufferSize
  }) {
    if (moveEvent.getID() !== 0) {
      return;
    }

    const blockX = this.node.position.x;
    const deltaX = moveEvent.getDelta().x;
    const nextX = blockX + limit(deltaX);
    const newPosition = cc.v2(nextX, this.node.position.y);
    const worldX = this.node.parent.convertToWorldSpaceAR(newPosition).x; // convert block to world coordinates

    if (worldX > (frameWidth - halfBlockWidth - bufferSize)) {
      this.node.emit('touchcancel');
      return;
    }

    if (worldX < (halfBlockWidth + bufferSize)) {
      this.node.emit('touchcancel');
      return;
    }

    this.movingVertical = false;
    const blockAction = cc.moveTo(0, newPosition);
    if (this.movingHorizontal) {
      this.node.runAction(blockAction);
    }
  },

  /** Sets up movement event handling */
  setupEventHandler() {
    const bufferSize = 25; // margin between block and edge of screen
    const frameWidth = cc.view.getFrameSize().width;
    const halfBlockWidth = this.node.width / 2;

    this.node.on('touchmove', (moveEvent) => {
      this.movementEventHandler({
        moveEvent,
        bufferSize,
        frameWidth,
        halfBlockWidth
      });
    });

    this.node.on('touchstart', () => {
      this.movingHorizontal = true;
    });

    this.node.on('touchcancel', () => {
      this.movingVertical = true;
      this.movingHorizontal = false;
      this.node.stopAllActions();
    });

    this.node.on('touchend', () => {
      this.movingVertical = true;
      this.movingHorizontal = false;
      this.node.stopAllActions();
    });
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

    this.setupEventHandler(this);
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
