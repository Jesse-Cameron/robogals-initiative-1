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
    console.log("setup Event Handlers");
    that.block1.on('mousedown', () => {
        console.log("Block Clicked");
    });
  };


cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        this.block1 = cc.find("Main Camera/block1", this.node);
        setupEventHandlers(this);
        console.log("Loaded");
    },

    start () {
        console.log("Game Started");
    },

    // update (dt) {},
});
