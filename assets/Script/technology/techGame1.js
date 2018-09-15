// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

const setupEventHandlers = (that) => {
    that.block1.on('touchstart', (startEvent) => {
        that.block1.on('touchmove', () => {
            var touchDeltaX = startEvent.touch.getDelta().x; 
            var newPosition = cc.v2(touchDeltaX, 0); 
            var blockAction = cc.moveBy(0, newPosition); 
            that.block1.runAction(blockAction);
        });
    });

  };

cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        this.block1 = this.node.getChildByName('block1');
        setupEventHandlers(this);
    },

    start () {
    },

    // update (dt) {},
});
