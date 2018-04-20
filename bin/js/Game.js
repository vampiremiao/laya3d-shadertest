/*
* name;
*/
var Game = (function () {
    function Game() {
        this.baseLayer = new MainLayer;
    }
    Object.defineProperty(Game, "Instance", {
        get: function () {
            if (this._instance == null || this._instance == undefined) {
                this._instance = new Game();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.init = function () {
        this.baseLayer.initContainer(Laya.stage);
        UIManager.Instance.init();
        GameStateManager.Instance.init();
        DataManager.Instance;
        GameObserverManager.Instance.initObservers();
        GameStateManager.Instance.changeGameState(3 /* Loading */);
    };
    Game.prototype.update = function () {
        GameStateManager.Instance.updateTime();
        game.SceneManager.Instance.updateTime();
    };
    return Game;
}());
//# sourceMappingURL=Game.js.map