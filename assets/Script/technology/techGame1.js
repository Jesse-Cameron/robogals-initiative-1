const { changeScene } = require('../util/sceneUtils');
const { MENU_SCENE } = require('../constants');
const MAX_BLOCK_NUMBER = 6;

const generateNumberBlocks = () => {
    return Math.floor(Math.random() * MAX_BLOCK_NUMBER);
};

const setupEventHandlers = (that) => {
  that.homeSprite.on('mousedown', () => {
    changeScene(MENU_SCENE);
  });
};

cc.Class({
    extends: cc.Component,

    properties: {
        speed : 200
    },

    onLoad () {
        this.homeSprite = this.node.getChildByName('home_button');
        this.blockSprite = this.node.getChildByName('block')

        var numberBlocks = generateNumberBlocks();
        var blockPosY = this.blockSprite.getPosition().y;
        var blockWidth = this.blockSprite.getBoundingBox().size.width;   
        
        var distanceTwoBlocks = 30;

        //total widths of all blocks
        var totalWidth = blockWidth * numberBlocks  + distanceTwoBlocks * (numberBlocks - 1)
        var blockPosX = - totalWidth / 2;

        //first block is at the most left position
        this.blockSprite.setPosition(blockPosX, blockPosY);
        this.allBlocks = [this.blockSprite];
        
        for (i = 0; i < numberBlocks - 1; i++){
            //Create new block 
            blockPosX += (distanceTwoBlocks + blockWidth); 
            var node = new cc.Node();
            node.setPosition(blockPosX,blockPosY);
            var newsprite = node.addComponent(cc.Sprite);
            node.parent = this.node;        
            var url = cc.url.raw("Texture/block.png");
            var texture = cc.textureCache.addImage(url);
            newsprite.spriteFrame = new cc.SpriteFrame(texture); 
            
            //Add to all blocks list
            this.allBlocks.push(node);
        }

        setupEventHandlers(this);
    },

    // start () {

    // },

    onCollisionEnter (){
        var numberBlocks = this.allBlocks.length;
        for (i = 0; i < numberBlocks; i++){
            this.allBlocks[i].destroy();
        }
    },

    update (dt) {
        var numberBlocks = this.allBlocks.length;
        for (i = 0; i < numberBlocks; i++){
            this.allBlocks[i].y -= this.speed * dt;
        }
    },
});
