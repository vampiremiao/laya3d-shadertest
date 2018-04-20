/*
* name;
*/
var SceneControl = (function () {
    function SceneControl() {
    }
    SceneControl.prototype.update = function (cmd, data) {
        switch (cmd) {
            case 1:
                if (DataManager.Instance.sceneData.autoMoveDir == 9999 && data != 9999 || DataManager.Instance.sceneData.autoMoveDir != 9999 && data == 9999) {
                    if (data == 9999) {
                        game.SceneManager.Instance.stopMove();
                    }
                    else {
                        game.SceneManager.Instance.move();
                    }
                }
                DataManager.Instance.sceneData.autoMoveDir = data;
                break;
        }
    };
    return SceneControl;
}());
//# sourceMappingURL=SceneControl.js.map