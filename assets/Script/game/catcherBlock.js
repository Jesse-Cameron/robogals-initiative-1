cc.Class({
    extends: cc.Component,
  
    properties: {
        type: {
            get: function () {
                return this._type;
            },
            set: function (value) {
                this._type = value;
            }
        }
    },

    onLoad() {
        this.type = 2;
      }
});