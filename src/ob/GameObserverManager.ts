class GameObserverManager {
	public static readonly Instance: GameObserverManager = new GameObserverManager();
	public constructor() {
	}

	public initObservers(): void {
		
		let control:IObserver = new SceneControl();
		DataManager.Instance.sceneData.addObserver(control);
		
	}
}