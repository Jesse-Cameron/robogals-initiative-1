const { FADE_TIME } = require('../constants');

exports.changeScene = (nextScene) => {
  cc.director.loadScene(nextScene);
};

/**
 * Run a timer which completes on the end of the function.
 *
 * @param {cc.Node} component - `this` object for the scheduler to run against
 * @param {int} length - the length of time for the timer to run
 * @param {function} timeOutCallback - callback to run on completion
 */
exports.gameTimer = (component, length, timeOutCallback = () => {}) => {
  component.scheduleOnce(timeOutCallback, length);
};

exports.changeSceneFade = (that, nextScene) => {
  that.node.runAction(cc.sequence(
    cc.fadeOut(FADE_TIME),
    cc.callFunc(() => {
      cc.director.loadScene(nextScene);
    })
  ));
};
