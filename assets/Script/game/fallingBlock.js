cc.Class({
  extends: cc.Component,

  properties: {
    speed: 200
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    const sp = this.node.addComponent(cc.Sprite);
    cc.loader.loadRes('assets/block', cc.SpriteFrame, (err, spriteFrame) => {
      if (err) {
        cc.error(err);
      }
      sp.spriteFrame = spriteFrame;
    });
  },

  start() {

  },

  update(dt) {
    this.node.y -= this.speed * dt;
  }

  // this code is currently unused as we have nothing to collide with !
  // onCollisionEnter(other, self) {

  // }
});
