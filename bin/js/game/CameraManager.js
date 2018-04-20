/*
* name;
*/
var game;
(function (game) {
    var CameraManager = (function () {
        function CameraManager() {
        }
        CameraManager.Instance = new CameraManager();
        return CameraManager;
    }());
    game.CameraManager = CameraManager;
})(game || (game = {}));
//# sourceMappingURL=CameraManager.js.map