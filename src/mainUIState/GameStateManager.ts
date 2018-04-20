class GameStateManager {

	public static readonly Instance: GameStateManager = new GameStateManager();
	private _gameStates:{[stateType:number]:IGameState} = {};
	private _currentState:IGameState;
	public constructor() {

	}
	
	public init():void{
		// let gState:IGameState = new PreLoadingState();
		// this._gameStates[GameStateType.PreLoading] = gState;

		// gState = new SelectServerState();
		// this._gameStates[GameStateType.SelectServer] = gState;

		let gState:IGameState = new LoadingState();
		this._gameStates[GameStateType.Loading] = gState;
		
		// gState = new LoginState();
		// this._gameStates[GameStateType.Login] = gState;


		// gState = new CreateRoleState();
		// this._gameStates[GameStateType.CreateRole] = gState;

		gState = new HomeState();
		this._gameStates[GameStateType.Home] = gState;

		// gState = new MapLoadingState();
		// this._gameStates[GameStateType.MapLoading] = gState;

		// gState = new MapState();
		// this._gameStates[GameStateType.Map] = gState;
	}

	public get curState():IGameState{
		return this._currentState;
	}

	public changeGameState(state:GameStateType):void{
		if(this._currentState != null && this._currentState.gameState() != GameStateType.Loading && this._currentState.gameState() == state)
		{
			return;
		}
		if(this._gameStates[state] != null){
			if(this._currentState != null){
				this._currentState.exit();
			}
			this._currentState = this._gameStates[state];
			this._currentState.enter();
		}
	}

	public  updateTime()
	{
		if (this._currentState != null)
		{
			this._currentState.updateTime();
		}
		let nextStateType:GameStateType = GameStateType.Continue;
		if (this._currentState != null)
		{
			nextStateType = this._currentState.update();
		}

		if (nextStateType > GameStateType.Continue)
		{
			this.changeGameState(nextStateType);
		}
	}

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

	public getState(type:GameStateType):IGameState
	{
		return this._gameStates[type];
	}
}

interface IGameState{
	gameState():GameStateType;
	setStateTo(gsType:GameStateType):void;
	enter():void;
	update():GameStateType;
	updateTime();
	exit():void;
}

const enum GameStateType{
	Continue = 0,
	PreLoading,
	SelectServer,
	Loading,
	Login,
	CreateRole,
	Home,
	MapLoading,
	Map
}