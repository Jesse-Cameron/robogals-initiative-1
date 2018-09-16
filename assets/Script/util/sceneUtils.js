exports.changeScene = (that, nextScene) => {
  that.canvas.runAction(cc.sequence(
    cc.fadeOut(2.0),
    cc.callFunc(() => {
      cc.director.loadScene(nextScene);
    })
  ));
};
