var GameStateManager = (function () {
    function GameStateManager() {
        this._gameStates = {};
    }
    GameStateManager.prototype.init = function () {
        // let gState:IGameState = new PreLoadingState();
        // this._gameStates[GameStateType.PreLoading] = gState;
        // gState = new SelectServerState();
        // this._gameStates[GameStateType.SelectServer] = gState;
        var gState = new LoadingState();
        this._gameStates[3 /* Loading */] = gState;
        // gState = new LoginState();
        // this._gameStates[GameStateType.Login] = gState;
        // gState = new CreateRoleState();
        // this._gameStates[GameStateType.CreateRole] = gState;
        gState = new HomeState();
        this._gameStates[6 /* Home */] = gState;
        // gState = new MapLoadingState();
        // this._gameStates[GameStateType.MapLoading] = gState;
        // gState = new MapState();
        // this._gameStates[GameStateType.Map] = gState;
    };
    Object.defineProperty(GameStateManager.prototype, "curState", {
        get: function () {
            return this._currentState;
        },
        enumerable: true,
        configurable: true
    });
    GameStateManager.prototype.changeGameState = function (state) {
        if (this._currentState != null && this._currentState.gameState() != 3 /* Loading */ && this._currentState.gameState() == state) {
            return;
        }
        if (this._gameStates[state] != null) {
            if (this._currentState != null) {
                this._currentState.exit();
            }
            this._currentState = this._gameStates[state];
            this._currentState.enter();
        }
    };
    GameStateManager.prototype.updateTime = function () {
        if (this._currentState != null) {
            this._currentState.updateTime();
        }
        var nextStateType = 0 /* Continue */;
        if (this._currentState != null) {
            nextStateType = this._currentState.update();
        }
        if (nextStateType > 0 /* Continue */) {
            this.changeGameState(nextStateType);
        }
    };
    // public update(gameTime:GameTime):void
    // {
    // 	let nextStateType:GameStateType = GameStateType.Continue;
    // 	if (this._currentState != null)
    // 	{
    // 		nextStateType = this._currentState.Update(fDeltaTime);
    // 	}
    // 	if (nextStateType > GameStateType.Continue)
    // 	{
    // 		this.changeGameState(nextStateType);
    // 	}
    // }
    GameStateManager.prototype.getState = function (type) {
        return this._gameStates[type];
    };
    GameStateManager.Instance = new GameStateManager();
    return GameStateManager;
}());
//# sourceMappingURL=GameStateManager.js.map