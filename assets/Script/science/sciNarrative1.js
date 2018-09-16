const { changeScene
      , gameTimer} = require('../util/sceneUtils');
const { MENU_SCENE } = require('../constants');

const setupEventHandlers = (that) => {
  that.homeSprite.on('mousedown', () => {
    changeScene(MENU_SCENE);
  });
};

cc.Class({
  extends: cc.Component,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:
  onLoad() {
    this.homeSprite = this.node.getChildByName('home_button');
    setupEventHandlers(this);
    gameTimer('next');
  }

  // start() {

  // },

  // update (dt) {},
});
