const { gameTimer, willCollide } = require('../util/sceneUtils');
const { FADE_TIME, TIMEOUT } = require('../constants');

const MAX_BLOCK_NUMBER = 3;
const BLOCK_DISTANCE = 200;

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

/**
 * Checks if a value exists in a list
 *
 * @param {Integer} currX - the x value we are comparing
 * @param {Integer[]} knownValues - the list of known x values
 * @returns {Boolean} - true if the value x does not exist in knownValues, false otherwise
 */
const isUniq = (currX, knownValues) => {
  for (const knownX of knownValues) {
    if (willCollide(knownX, currX, BLOCK_DISTANCE)) {
      return false;
    }
  }
  return true;
};

const createFallingBlock = (that, numberOfBlocks) => {
  const spawnPoints = [];

  while (spawnPoints.length <= numberOfBlocks) {
    const x = (Math.random() * (cc.view.getFrameSize().width - 200)) + 400;
    if (isUniq(x, spawnPoints)) {
      spawnPoints.push(x);
    }
  }
  for (const worldX of spawnPoints) {
    const newBlock = cc.instantiate(that.blockPrefab);
    that.node.addChild(newBlock);
    const spawnX = newBlock.convertToNodeSpace(cc.v2(worldX, that.generatedBlockY)).x;
    newBlock.setPosition(cc.v2(spawnX, that.generatedBlockY));
  }
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
    setupEventHandlers(this);
  },

  update(dt) {
    this.previousDt += dt;
    // generate new blocks by fall rate
    if (this.previousDt > this.blockFallRate) {
      const numberOfBlocks = generateNumberBlocks();
      createFallingBlock(this, numberOfBlocks);
      this.previousDt = 0;
    }
  }
});
