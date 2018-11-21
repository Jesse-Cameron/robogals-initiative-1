const { gameTimer } = require('../util/sceneUtils');
const { FADE_TIME, TIMEOUT, GAME_SCORE_EVENT } = require('../constants');

const MAX_BLOCK_NUMBER = 3;
const GAME_COMPLETE_SCORE = 10;

const generateNumberBlocks = () => {
  return Math.floor(Math.random() * MAX_BLOCK_NUMBER);
};

const handleScoreEvent = ({ type, currentScore, score }) => {
  switch (type) {
    case 'ADD':
      return currentScore + score;
    case 'MINUS':
      return currentScore - score;
    default:
      cc.log('failed score event');
      break;
  }
};

function setupEventHandlers(that) {
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

  that.node.on(GAME_SCORE_EVENT, (event) => {
    const updatedEvent = Object.assign({}, { currentScore: that.currentScore }, event);
    that.currentScore = handleScoreEvent(updatedEvent);
  });
}

const createFallingBlock = (that) => {
  const newBlock = cc.instantiate(that.blockPrefab);
  that.node.addChild(newBlock);
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
    blockFallRate: 3,
    currentScore: 0
  },

  onLoad() {
    this.node.opacity = 0;
    this.node.color = new cc.Color(0, 0, 0);
    this.node.runAction(
      cc.fadeIn(FADE_TIME)
    );
    setupEventHandlers(this);
    const manager = cc.director.getCollisionManager();
    manager.enabled = true;
    this.node.emit(GAME_SCORE_EVENT, {
      type: 'ADD',
      score: 1
    });
  },

  update(dt) {
    if (this.currentScore === GAME_COMPLETE_SCORE) {
      this.endGame();
    }

    this.previousDt += dt;
    // generate new blocks by fall rate
    if (this.previousDt > this.blockFallRate) {
      const numberOfBlocks = generateNumberBlocks();
      for (let i = 0; i <= numberOfBlocks; i++) {
        createFallingBlock(this);
      }
      this.previousDt = 0;
      // TODO: refactor to fire the event on block match.
      this.node.emit(GAME_SCORE_EVENT, {
        type: 'ADD',
        score: 1
      });
    }
  },

  endGame() {
    const endingLblNode = new cc.Node('endingLbl');
    endingLblNode.color = new cc.Color(121, 0, 0);
    const label = endingLblNode.addComponent(cc.Label);
    label.string = 'You won the game';
    endingLblNode.parent = this.node;
  }
});
