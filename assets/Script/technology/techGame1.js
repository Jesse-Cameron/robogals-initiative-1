const { gameTimer } = require('../util/sceneUtils');
const { FADE_TIME, TIMEOUT } = require('../constants');

const MAX_BLOCK_NUMBER = 3;

const generateNumberBlocks = () => {
  return Math.floor(Math.random() * MAX_BLOCK_NUMBER);
};

const setupEventHandlers = (that) => {
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

const setupBlockEventHandler = (newBlock) => {
  const bufferSize = 50; // margin between block and edge of screen
  const frameWidth = cc.view.getFrameSize().width;
  const halfBlockWidth = newBlock.width / 2;

  newBlock.on('touchmove', (moveEvent) => {
    if (moveEvent.getID() !== 0) {
      return;
    }

    const blockX = newBlock.position.x;
    const deltaX = moveEvent.getDelta().x;
    const nextX = blockX + limit(deltaX);
    const newPosition = cc.v2(nextX, newBlock.position.y);
    const worldX = newBlock.parent.convertToWorldSpaceAR(newPosition).x; // convert block to world coordinates

    if (worldX > (frameWidth - halfBlockWidth - bufferSize)) {
      newBlock.emit('touchcancel');
      return;
    }

    if (worldX < (halfBlockWidth + bufferSize)) {
      newBlock.emit('touchcancel');
      return;
    }

    const blockAction = cc.moveTo(0, newPosition);
    newBlock.runAction(blockAction);
  });
}
const createFallingBlock = (that) => {
  const newBlock = cc.instantiate(that.blockPrefab);
  that.node.addChild(newBlock);
  
  setupBlockEventHandler(newBlock);
  
  const worldX = (Math.random() * (cc.view.getFrameSize().width - 200)) + 400;
  const spawnX = newBlock.convertToNodeSpace(cc.v2(worldX, that.generatedBlockY)).x;
  newBlock.setPosition(cc.v2(spawnX, that.generatedBlockY));
};

cc.Class({
  extends: cc.Component,

  properties: {
    blockPrefab: cc.Prefab,
    generatedBlockY: 400,
    previousDt: 0,
    blockFallRate: 3
  },

  onLoad() {
    this.node.opacity = 0;
    this.node.color = new cc.Color(0, 0, 0);
    this.node.runAction(
      cc.fadeIn(FADE_TIME)
    );
    this.block = this.node.getChildByName('block');
    setupEventHandlers(this);
  },

  update(dt) {
    this.previousDt += dt;
    // generate new blocks by fall rate
    if (this.previousDt > this.blockFallRate) {
      const numberOfBlocks = generateNumberBlocks();
      for (let i = 0; i <= numberOfBlocks; i++) {
        createFallingBlock(this);
      }
      this.previousDt = 0;
    }
  }
});
