var Subject = (function () {
    function Subject() {
        this._observers = [];
    }
    Subject.prototype.addObserver = function (observer) {
        if (this._observers.indexOf(observer) == -1) {
            this._observers.push(observer);
        }
    };
    Subject.prototype.removeObserver = function (observer) {
        var index = this._observers.indexOf(observer);
        if (index > -1) {
            this._observers.splice(index, 1);
        }
    };
    Subject.prototype.sendNotification = function (cmd, data) {
        for (var _i = 0, _a = this._observers; _i < _a.length; _i++) {
            var ob = _a[_i];
            ob.update(cmd, data);
        }
    };
    return Subject;
}());
//# sourceMappingURL=Subject.js.map