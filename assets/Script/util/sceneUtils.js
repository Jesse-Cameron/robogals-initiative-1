exports.changeScene = (nextScene) => {
  cc.director.loadScene(nextScene);
};

exports.gameTimer = (component,timeOutScreen,length) => {
  component.scheduleOnce(function() {
     // Here `this` is referring to the component
     console.log(timeOutScreen);
 }, length);
}
