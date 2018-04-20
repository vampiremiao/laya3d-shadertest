/*
* name;
*/
var DataManager = (function () {
    function DataManager() {
        this.sceneData = new SceneData();
    }
    Object.defineProperty(DataManager, "Instance", {
        // public static readonly Instance: DataManager = new DataManager();
        get: function () {
            if (this._instance == null || this._instance == undefined) {
                this._instance = new DataManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    return DataManager;
}());
//# sourceMappingURL=DataManager.js.map