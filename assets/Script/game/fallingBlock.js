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
  },

  // this code is currently unused as we have nothing to collide with !
  onCollisionEnter: function (other, self) {
    console.log('on collision enter');
    self.node.destroy();

    // Collider Manager will calculate the value in world coordinate system, and put them into the world property
    var world = self.world;

    // Collider Component aabb bounding box
    var aabb = world.aabb;

    // The position of the aabb collision frame before the node collision
    var preAabb = world.preAabb;

    // world transform
    var t = world.transform;

    // Circle Collider Component world properties
    var r = world.radius;
    var p = world.position;

    // Rect and Polygon Collider Component world properties
    var ps = world.points;
  },

});
