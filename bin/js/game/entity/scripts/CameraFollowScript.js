var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* name
*/
var game;
(function (game) {
    var CameraFollowScript = (function (_super) {
        __extends(CameraFollowScript, _super);
        function CameraFollowScript() {
            return _super.call(this) || this;
        }
        CameraFollowScript.prototype._update = function (state) {
            var transform = this.owner.transform;
            var role3D = game.EntityManager.Instance.role3D;
            //  transform.translate()
            this.owner.transform.position = new Laya.Vector3(role3D.transform.position.x, role3D.transform.position.y + 5, role3D.transform.position.z - 10);
            // camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
            // (this.owner as Laya.Sprite3D).transform.lookAt(role3D.transform.position,new laya.d3.math.Vector3(0,1,0));
        };
        return CameraFollowScript;
    }(Laya.Script));
    game.CameraFollowScript = CameraFollowScript;
})(game || (game = {}));
//# sourceMappingURL=CameraFollowScript.js.map