class HomeState implements IGameState {
	public constructor() {
	}
	private _stateTo:GameStateType = 0;
	gameState():GameStateType{
		return GameStateType.Home;
	}

	setStateTo(gsType:GameStateType):void{
		this._stateTo = gsType;
	}

	enter():void{
		console.log("进入Home界面");
		
		UIManager.Instance.show(UIType.MainUI,null,false);
	//	DataManager.Instance.mapData.prepareToEnterMap(1001);
		// this._stateTo = GameStateType.Map;
		game.SceneManager.Instance.enter();
	}

	update():GameStateType{
		return this._stateTo;
	}

	updateTime(){
		
	}

	exit():void{
		//UIManager.Instance.hide(UIType.MainUI);
		//UIManager.Instance.hideAll();
	}
}