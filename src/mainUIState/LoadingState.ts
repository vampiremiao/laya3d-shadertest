class LoadingState implements IGameState {
	public constructor() {
	}
	private _stateTo: GameStateType = 0;
	gameState(): GameStateType {
		return GameStateType.PreLoading;
	}

	setStateTo(gsType: GameStateType): void {
		this._stateTo = gsType;
	}

	update(): GameStateType {
		return this._stateTo;
	}

	updateTime() {

	}

	exit(): void {
		UIManager.Instance.hide(UIType.Loading);
	}

	enter(): void {
		console.log("进入LoadingState");

		UIManager.Instance.show(UIType.Loading);

		Laya.loader.load("res/atlas/skin/home.atlas", Laya.Handler.create(null, function(){
			// UIController.createLoginUI();
			GameStateManager.Instance.changeGameState(GameStateType.Home);
		}));
	}

	
}