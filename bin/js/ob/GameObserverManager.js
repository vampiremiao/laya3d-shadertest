var GameObserverManager = (function () {
    function GameObserverManager() {
    }
    GameObserverManager.prototype.initObservers = function () {
        var control = new SceneControl();
        DataManager.Instance.sceneData.addObserver(control);
    };
    GameObserverManager.Instance = new GameObserverManager();
    return GameObserverManager;
}());
//# sourceMappingURL=GameObserverManager.js.map