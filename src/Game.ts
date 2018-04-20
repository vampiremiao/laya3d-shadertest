/*
* name;
*/
class Game{
    private static _instance: Game;

    public baseLayer: MainLayer = new MainLayer;

    constructor(){

    }
    public static get Instance(): Game {
		if (this._instance == null || this._instance == undefined) {
			this._instance = new Game();
		}
		return this._instance;
	}

    public init():void{
        this.baseLayer.initContainer(Laya.stage);
        UIManager.Instance.init();
        GameStateManager.Instance.init();
        DataManager.Instance;
        GameObserverManager.Instance.initObservers();
        GameStateManager.Instance.changeGameState(GameStateType.Loading);
    }

    public update():void{
        GameStateManager.Instance.updateTime();
        game.SceneManager.Instance.updateTime();
    }
}