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
    that.block1.on('touchmove', (moveEvent) => {
        if(moveEvent.getID() != 0)
            return;

        const halfWidth = that.block1.width/2
        const frameWidth = cc.view.getFrameSize().width;   
        const blockX = that.block1.position.x; // convert block coordinates
        const deltaX = moveEvent.getDelta().x;
        var nextX = blockX + deltaX;

        const limit = frameWidth/2-halfWidth;
        if(nextX < 0){
            nextX = Math.max(nextX, -limit);
        }
        if (nextX > 0){
            nextX = Math.min(nextX, limit);
        }
        const blockAction = cc.moveTo(0, cc.v2(nextX, that.block1.position.y)); 
        that.block1.runAction(blockAction); 
        // }
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
