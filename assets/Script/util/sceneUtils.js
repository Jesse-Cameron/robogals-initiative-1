const { FADE_TIME } = require('../constants');

exports.changeScene = (nextScene) => {
  cc.director.loadScene(nextScene);
};

/**
 * Run a timer which completes on the end of the function.
 *
 * @param {cc.Node} component - `this` object for the scheduler to run against
 * @param {int} length - the length of time for the timer to run
 * @param {int} repeat - the number of times to repeat the scheduler
 * @param {function} timeOutCallback - callback to run on completion
 */
exports.gameTimer = ({ component, length, repeat = 1, timeOutCallback = () => {} }) => {
  component.schedule(timeOutCallback, length, repeat);
};

exports.changeSceneFade = (that, nextScene) => {
  that.node.runAction(cc.sequence(
    cc.fadeOut(FADE_TIME),
    cc.callFunc(() => {
      cc.director.loadScene(nextScene);
    })
  ));
};

/**
 * Check if x1 is within the distance of x2
 *
 * @param {Integer} x1 - the first x coord
 * @param {Integer} x2 - the x coord we are comparing against
 * @param {Integer} distance - the distance you want to compare
 * @returns {Boolean} - true if x1 is within distance of x2, false otherwise
 */
exports.willCollide = (x1, x2, distance) => {
  return Math.abs(x1 - x2) <= distance;
};
