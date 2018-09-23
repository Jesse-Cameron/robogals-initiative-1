const { FADE_TIME } = require('../constants');

exports.changeScene = (nextScene) => {
  cc.director.loadScene(nextScene);
};


exports.gameTimer = (component,timeOutScreen,length) => {
  component.scheduleOnce(function() {
     // Here `this` is referring to the component
     timeOutScreen.getComponent(cc.Label).string='Timed Out';
 }, length);
}

exports.changeSceneFade = (that, nextScene) => {
  that.node.runAction(cc.sequence(
    cc.fadeOut(FADE_TIME),
    cc.callFunc(() => {
      cc.director.loadScene(nextScene);
    })
  ));
};
