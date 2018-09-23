const { changeScene
      , changeSceneFade
      , gameTimer} = require('../util/sceneUtils');
const { MENU_SCENE
        ,TECH_GAME_1_SCENE
        , TIMEOUT} = require('../constants');

const setupEventHandlers = (that) => {
  that.homeSprite.on('mousedown', () => {
    changeScene(MENU_SCENE);
  });

  that.nextSprite.on('mousedown', () => {
    changeSceneFade(that, TECH_GAME_1_SCENE);
  });
};

cc.Class({
  extends: cc.Component,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:
  onLoad() {
    this.homeSprite = this.node.getChildByName('home_btn');
    this.nextSprite = this.node.getChildByName('next_btn');
    setupEventHandlers(this);
    gameTimer(this, this.node.getChildByName('placeholder'), TIMEOUT);
  }

  // start() {

  // },

  // update (dt) {},
});
