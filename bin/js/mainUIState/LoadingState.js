var LoadingState = (function () {
    function LoadingState() {
        this._stateTo = 0;
    }
    LoadingState.prototype.gameState = function () {
        return 1 /* PreLoading */;
    };
    LoadingState.prototype.setStateTo = function (gsType) {
        this._stateTo = gsType;
    };
    LoadingState.prototype.update = function () {
        return this._stateTo;
    };
    LoadingState.prototype.updateTime = function () {
    };
    LoadingState.prototype.exit = function () {
        UIManager.Instance.hide(11 /* Loading */);
    };
    LoadingState.prototype.enter = function () {
        console.log("进入LoadingState");
        UIManager.Instance.show(11 /* Loading */);
        Laya.loader.load("res/atlas/skin/home.atlas", Laya.Handler.create(null, function () {
            // UIController.createLoginUI();
            GameStateManager.Instance.changeGameState(6 /* Home */);
        }));
    };
    return LoadingState;
}());
//# sourceMappingURL=LoadingState.js.map