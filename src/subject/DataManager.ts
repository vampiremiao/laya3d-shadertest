/*
* name;
*/
class DataManager{
    constructor(){

    }
    private static _instance:DataManager;
    // public static readonly Instance: DataManager = new DataManager();
    public static get Instance(): DataManager {
		if (this._instance == null || this._instance == undefined) {
			this._instance = new DataManager();
		}
		return this._instance;
	}
    public sceneData:SceneData = new SceneData();
}