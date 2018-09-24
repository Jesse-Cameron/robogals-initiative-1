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
            console.log(startEvent.touch);
            var deltaX = startEvent.touch.getDelta().x;    // get touch movement in x axis
            console.log(deltaX);

            var blockWidth = that.block1.width;
            var blockX = that.block1.position.x;
            var blockY = that.block1.position.y;

            var frameWidth = cc.view.getFrameSize().width;
            var frameLeftX = frameWidth/2 * -1;         // get frame's left x coordinate
            var frameRightX = frameWidth/2;             // get frame's right x coordinate
            
            var nextX = blockX + deltaX;                    // next x coord for block
            var newPosition  = cc.v2(nextX, blockY);        // position vector

            var blockLeft = nextX - blockWidth/2;            // block's left edge Xcoord
            var blockRight = nextX + blockWidth/2;           // block's right edge Xcoord

            if(blockLeft <= frameLeftX){  // if block tries to move past left edge
                newPosition = cc.v2(frameLeftX + blockWidth/2, blockY); // create v2 type
                console.log("HITLEFT " + " newposition: "+ newPosition + " frameLeftX: " + frameLeftX + " blockWidth/2: " + blockWidth/2);

            }
            else if(blockRight >= frameRightX){ // if block tries to move past right edge
                newPosition = cc.v2(frameRightX - blockWidth/2, blockY); // create v2 type
                console.log("HITRight " + " newposition: "+ newPosition + " frameRightX: " + frameRightX + " blockWidth/2: " + blockWidth/2);
            }
            else{
                console.log("Normal " + " newposition: "+ newPosition + " deltaX: " + deltaX + " blockX: " + blockX + " blockWidth/2: " + blockWidth/2);
            }
            var blockAction = cc.moveTo(0, newPosition); 
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
