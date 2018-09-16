cc.Class({
  extends: cc.Component,

  properties: {
    canvas: cc.Node
  },

  // LIFE-CYCLE CALLBACKS:
  onLoad() {
    this.canvas.opacity = 0;
    this.canvas.color = new cc.Color(0, 0, 0);
    this.canvas.runAction(
      cc.fadeIn(2.0)
    );
  }

  // start() {

  // },

  // update (dt) {},
});
