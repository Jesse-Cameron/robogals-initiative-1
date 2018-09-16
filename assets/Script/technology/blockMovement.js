cc.Class({
    extends: cc.Component,

    properties: {
        speed: 200
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    start () {
    
    },

    onCollisionEnter (){
        this.node.destroy();
    },

    update (dt) {
        this.node.y -= this.speed * dt;
    },
});
