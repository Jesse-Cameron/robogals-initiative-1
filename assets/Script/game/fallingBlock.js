cc.Class({
  extends: cc.Component,

  properties: {
    speed: 200,
    fadeOutTime: 0.4,
    blockType: "blue"
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
  },

  // this code is currently unused as we have nothing to collide with !
  onCollisionEnter: function (other, self) {
    console.log(other.node);
    if(other.node.name == "catcher2" ){
      other.node.zIndex = 1;                          // +1 catcher zindex - block goes behind catcher
      const fadeOut = cc.fadeOut(this.fadeOutTime);
      self.node.runAction(fadeOut);
    }
  },

});
