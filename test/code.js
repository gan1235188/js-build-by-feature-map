var obj = {
  _a: '',
  set a(x) {
    this._a = x
  },

  get a() {
    return 1
  }
}

obj.a = 2
var result = obj.a