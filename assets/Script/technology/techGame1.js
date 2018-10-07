const { changeScene } = require('../util/sceneUtils');

const { MENU_SCENE } = require('../constants');
const { gameTimer } = require('../util/sceneUtils');
const { FADE_TIME, TIMEOUT } = require('../constants');

const MAX_BLOCK_NUMBER = 6;

/**
 * Limits the x value to a certain size. Using tanh as an activation function
 *
 * @param {int} x - the integer you want to limit
 * @returns {int} - new limited x
 */
const limit = (x) => {
  const maxMove = 80;
  return Math.tanh(1 / maxMove * x) * maxMove;
};

const setupEventHandlers = (that) => {
  const bufferSize = 50; // margin between block and edge of screen
  const frameWidth = cc.view.getFrameSize().width;
  const halfBlockWidth = that.block1.width / 2;

  that.block1.on('touchmove', (moveEvent) => {
    if (moveEvent.getID() !== 0) {
      return;
    }

    const blockX = that.block1.position.x;

    const deltaX = moveEvent.getDelta().x;
    const nextX = blockX + limit(deltaX);
    const newPosition = cc.v2(nextX, that.block1.position.y);

    const worldX = that.block1.parent.convertToWorldSpaceAR(newPosition).x; // convert block to world coordinates

    if (worldX > (frameWidth - halfBlockWidth - bufferSize)) {
      that.block1.emit('touchend');
      return;
    }

    if (worldX < (halfBlockWidth + bufferSize)) {
      that.block1.emit('touchend');
      return;
    }

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

  that.homeSprite.on('mousedown', () => {
    changeScene(MENU_SCENE);
  });

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
    speed: 200
  },

  onLoad() {
    this.node.opacity = 0;
    this.node.color = new cc.Color(0, 0, 0);
    this.node.runAction(
      cc.fadeIn(FADE_TIME)
    );

    this.homeSprite = this.node.getChildByName('home_button');
    this.blockSprite = this.node.getChildByName('block');

    const numberBlocks = generateNumberBlocks();
    const blockPosY = this.blockSprite.getPosition().y;
    const blockWidth = this.blockSprite.getBoundingBox().size.width;
    const distanceTwoBlocks = 30;

    // total widths of all blocks
    const totalWidth = (blockWidth * numberBlocks) + (distanceTwoBlocks * (numberBlocks - 1));
    let blockPosX = -totalWidth / 2;

    // first block is at the most left position
    this.blockSprite.setPosition(blockPosX, blockPosY);
    this.allBlocks = [this.blockSprite];

    for (let i = 0; i < (numberBlocks - 1); i++) {
      // Create new block
      blockPosX += (distanceTwoBlocks + blockWidth);
      const node = new cc.Node();
      node.setPosition(blockPosX, blockPosY);
      const newsprite = node.addComponent(cc.Sprite);
      node.parent = this.node;
      const url = cc.url.raw('Texture/block.png');
      const texture = cc.textureCache.addImage(url);
      newsprite.spriteFrame = new cc.SpriteFrame(texture);

      // Add to all blocks list
      this.allBlocks.push(node);
    }

    this.block1 = this.node.getChildByName('block1');
    setupEventHandlers(this);
  },

  onCollisionEnter() {
    const numberBlocks = this.allBlocks.length;
    for (let i = 0; i < numberBlocks; i++) {
      this.allBlocks[i].destroy();
    }
  },

  update(dt) {
    const numberBlocks = this.allBlocks.length;
    for (let i = 0; i < numberBlocks; i++) {
      this.allBlocks[i].y -= this.speed * dt;
    }
  }

});
