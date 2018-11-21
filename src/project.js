window.__require=function e(t,n,c){function o(s,r){if(!n[s]){if(!t[s]){var a=s.split("/");if(a=a[a.length-1],!t[a]){var u="function"==typeof __require&&__require;if(!r&&u)return u(a,!0);if(i)return i(a,!0);throw new Error("Cannot find module '"+s+"'")}}var l=n[s]={exports:{}};t[s][0].call(l.exports,function(e){return o(t[s][1][e]||e)},l,l.exports,e,t,n,c)}return n[s].exports}for(var i="function"==typeof __require&&__require,s=0;s<c.length;s++)o(c[s]);return o}({catcherBlock:[function(e,t,n){"use strict";cc._RF.push(t,"bf8f5G+aQlLual1VAkRatrU","catcherBlock"),cc.Class({extends:cc.Component,properties:{type:{get:function(){return this._type},set:function(e){this._type=e}}},onLoad:function(){this.type=2}}),cc._RF.pop()},{}],constants:[function(e,t,n){"use strict";cc._RF.push(t,"c1f82YSZp9AE6mnMxUiUroA","constants"),n.MENU_SCENE="menu-scene",n.SCI_NARRATIVE_1_SCENE="sci-narrative-1",n.TECH_GAME_1_SCENE="tech-game-1",n.TECH_NARRATIVE_1_SCENE="tech-narrative-1",n.TIMEOUT=30,n.FADE_TIME=.8,n.GAME_SCORE_EVENT="game-score-event",cc._RF.pop()},{}],fallingBlock:[function(e,t,n){"use strict";cc._RF.push(t,"dc9b9KZx/NAWbPMNZ3A6D6l","fallingBlock");cc.Class({extends:cc.Component,properties:{speed:50,movingHorizontal:!0,movingVertical:!0},movementEventHandler:function(e){var t=e.moveEvent,n=e.frameWidth,c=e.halfBlockWidth,o=e.bufferSize;if(0===t.getID()){var i=this.node.position.x+function(e){return 100*Math.tanh(.01*e)}(t.getDelta().x),s=cc.v2(i,this.node.position.y),r=this.node.parent.convertToWorldSpaceAR(s).x;if(r>n-c-o)this.node.emit("touchcancel");else if(r<c+o)this.node.emit("touchcancel");else{this.movingVertical=!1;var a=cc.moveTo(0,s);this.movingHorizontal&&this.node.runAction(a)}}},setupEventHandler:function(){var e=this,t=cc.view.getFrameSize().width,n=this.node.width/2;this.node.on("touchmove",function(c){e.movementEventHandler({moveEvent:c,bufferSize:25,frameWidth:t,halfBlockWidth:n})}),this.node.on("touchstart",function(){e.movingHorizontal=!0}),this.node.on("touchcancel",function(){e.movingVertical=!0,e.movingHorizontal=!1,e.node.stopAllActions()}),this.node.on("touchend",function(){e.movingVertical=!0,e.movingHorizontal=!1,e.node.stopAllActions()})},onLoad:function(){var e=this.node.addComponent(cc.Sprite);cc.loader.loadRes("assets/block",cc.SpriteFrame,function(t,n){t&&cc.error(t),e.spriteFrame=n}),this.setupEventHandler(this)},start:function(){},update:function(e){this.movingVertical&&(this.node.y-=this.speed*e)},onCollisionEnter:function(e,t){"catcher1"===e.node.name&&t.node.destroy(),"catcher2"===e.node.name&&t.node.destroy(),"catcher3"===e.node.name&&t.node.destroy()}}),cc._RF.pop()},{}],menuScript:[function(e,t,n){"use strict";cc._RF.push(t,"280c3rsZJJKnZ9RqbALVwtK","menuScript");var c=e("./util/sceneUtils").changeScene,o=e("./constants"),i=o.SCI_NARRATIVE_1_SCENE,s=o.TECH_NARRATIVE_1_SCENE;cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.sLabel=this.node.getChildByName("spriteS"),this.tLbl=this.node.getChildByName("spriteT"),function(e){e.sLabel.on("mousedown",function(){c(i)}),e.tLbl.on("mousedown",function(){c(s)})}(this)},update:function(){}}),cc._RF.pop()},{"./constants":"constants","./util/sceneUtils":"sceneUtils"}],sceneUtils:[function(e,t,n){"use strict";cc._RF.push(t,"7b9c57cU+JCRKEaZ7T9nEDh","sceneUtils");var c=e("../constants").FADE_TIME;n.changeScene=function(e){cc.director.loadScene(e)},n.gameTimer=function(e){var t=e.component,n=e.length,c=e.repeat,o=void 0===c?1:c,i=e.timeOutCallback,s=void 0===i?function(){}:i;t.schedule(s,n,o)},n.changeSceneFade=function(e,t){e.node.runAction(cc.sequence(cc.fadeOut(c),cc.callFunc(function(){cc.director.loadScene(t)})))},cc._RF.pop()},{"../constants":"constants"}],sciNarrative1:[function(e,t,n){"use strict";cc._RF.push(t,"90f61tfEbpJwbUF2KwakbP8","sciNarrative1");var c=e("../util/sceneUtils").changeScene,o=e("../constants").MENU_SCENE;cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.homeSprite=this.node.getChildByName("home_button"),function(e){e.homeSprite.on("mousedown",function(){c(o)})}(this)}}),cc._RF.pop()},{"../constants":"constants","../util/sceneUtils":"sceneUtils"}],techGame1:[function(e,t,n){"use strict";cc._RF.push(t,"b7567wC365HFI0mgASF3rLh","techGame1");var c=e("../util/sceneUtils").gameTimer,o=e("../constants"),i=o.FADE_TIME,s=o.TIMEOUT,r=o.GAME_SCORE_EVENT,a=function(e){var t=e.type,n=e.currentScore,c=e.score;switch(t){case"ADD":return n+c;case"MINUS":return n-c;default:cc.log("failed score event")}};var u=function(e){var t=cc.instantiate(e.blockPrefab);e.node.addChild(t);var n=Math.random()*(cc.view.getFrameSize().width-200)+400,c=t.convertToNodeSpace(cc.v2(n,e.generatedBlockY)).x;t.setPosition(cc.v2(c,e.generatedBlockY))};cc.Class({extends:cc.Component,properties:{blockPrefab:cc.Prefab,generatedBlockY:400,previousDt:0,blockFallRate:3,currentScore:0},onLoad:function(){this.node.opacity=0,this.node.color=new cc.Color(0,0,0),this.node.runAction(cc.fadeIn(i)),function(e){e.count=0,e.gameTimerCb=function(){var t=e.node.getChildByName("timer_lbl");switch(e.count){case 0:t.color=new cc.Color(184,95,0);break;case 1:t.color=new cc.Color(121,0,0),t.getComponent(cc.Label).string="TIMES UP";break;default:e.unschedule(e.gameTimerCb)}e.count+=1},c({component:e,length:s,repeat:2,timeOutCallback:e.gameTimerCb}),e.node.on(r,function(t){var n=Object.assign({},{currentScore:e.currentScore},t);e.currentScore=a(n)})}(this),cc.director.getCollisionManager().enabled=!0,this.node.emit(r,{type:"ADD",score:1})},update:function(e){if(10===this.currentScore&&this.endGame(),this.previousDt+=e,this.previousDt>this.blockFallRate){for(var t=Math.floor(3*Math.random()),n=0;n<=t;n++)u(this);this.previousDt=0,this.node.emit(r,{type:"ADD",score:1})}},endGame:function(){var e=new cc.Node("endingLbl");e.color=new cc.Color(121,0,0),e.addComponent(cc.Label).string="You won the game",e.parent=this.node}}),cc._RF.pop()},{"../constants":"constants","../util/sceneUtils":"sceneUtils"}],techNarrative1:[function(e,t,n){"use strict";cc._RF.push(t,"554e1JRR05MNbKTbin5+rGh","techNarrative1");var c=e("../util/sceneUtils"),o=c.changeScene,i=c.changeSceneFade,s=e("../constants"),r=s.MENU_SCENE,a=s.TECH_GAME_1_SCENE;cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.homeSprite=this.node.getChildByName("home_btn"),this.nextSprite=this.node.getChildByName("next_btn"),function(e){e.homeSprite.on("mousedown",function(){o(r)}),e.nextSprite.on("mousedown",function(){i(e,a)})}(this)}}),cc._RF.pop()},{"../constants":"constants","../util/sceneUtils":"sceneUtils"}]},{},["constants","catcherBlock","fallingBlock","menuScript","sciNarrative1","techGame1","techNarrative1","sceneUtils"]);