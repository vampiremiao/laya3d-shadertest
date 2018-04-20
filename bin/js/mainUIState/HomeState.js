var HomeState = (function () {
    function HomeState() {
        this._stateTo = 0;
    }
    HomeState.prototype.gameState = function () {
        return 6 /* Home */;
    };
    HomeState.prototype.setStateTo = function (gsType) {
        this._stateTo = gsType;
    };
    HomeState.prototype.enter = function () {
        console.log("进入Home界面");
        UIManager.Instance.show(201 /* MainUI */, null, false);
        //	DataManager.Instance.mapData.prepareToEnterMap(1001);
        // this._stateTo = GameStateType.Map;
        game.SceneManager.Instance.enter();
    };
    HomeState.prototype.update = function () {
        return this._stateTo;
    };
    HomeState.prototype.updateTime = function () {
    };
    HomeState.prototype.exit = function () {
        //UIManager.Instance.hide(UIType.MainUI);
        //UIManager.Instance.hideAll();
    };
    return HomeState;
}());
//# sourceMappingURL=HomeState.js.map