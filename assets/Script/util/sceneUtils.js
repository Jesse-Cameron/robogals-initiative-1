const { FADE_TIME } = require('../constants');

exports.changeScene = (nextScene) => {
  cc.director.loadScene(nextScene);
};

exports.changeSceneFade = (that, nextScene) => {
  that.node.runAction(cc.sequence(
    cc.fadeOut(FADE_TIME),
    cc.callFunc(() => {
      cc.director.loadScene(nextScene);
    })
  ));
};

