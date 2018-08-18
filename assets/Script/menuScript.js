cc.Class({
  extends: cc.Component,

  properties: {
  },

  // use this for initialization
  onLoad() {
    console.log(this.node);
    this.S_node = this.node.getChildByName("label_S");
    setupEventHandlers(this);
  },

  // called every frame
  update() {

  },
});

const setupEventHandlers = (that) => {
  that.S_node.on('mousedown', () => {
    console.log('Oi! You just touched me!');
  });
}
