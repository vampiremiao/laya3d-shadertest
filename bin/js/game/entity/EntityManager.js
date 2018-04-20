/**
* name
*/
var game;
(function (game) {
    var EntityManager = (function () {
        function EntityManager() {
        }
        Object.defineProperty(EntityManager, "Instance", {
            get: function () {
                if (!this._instance) {
                    this._instance = new EntityManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        return EntityManager;
    }());
    game.EntityManager = EntityManager;
})(game || (game = {}));
//# sourceMappingURL=EntityManager.js.map