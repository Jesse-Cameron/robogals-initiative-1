cc.Class({
  extends: cc.Component,

  properties: {
    type: {
      get() {
        return this._type;
      },
      set(value) {
        this._type = value;
      }
    }
  },

  onLoad() {
    this.type = 2;
  }
});
