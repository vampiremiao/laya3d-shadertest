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
/*
* name;
*/
var game;
(function (game) {
    var RoleScript = (function (_super) {
        __extends(RoleScript, _super);
        function RoleScript() {
            return _super.call(this) || this;
        }
        RoleScript.prototype._load = function (owner) {
            console.log("role loaded");
        };
        RoleScript.prototype._update = function (state) {
            if (DataManager.Instance.sceneData.autoMoveDir != 9999) {
                var transform = this.owner.transform;
                var sx = -Math.cos(DataManager.Instance.sceneData.autoMoveDir / 180 * Math.PI - Math.PI) + transform.position.x;
                var sy = Math.sin(DataManager.Instance.sceneData.autoMoveDir / 180 * Math.PI - Math.PI) + transform.position.z;
                // (this.owner as Laya.Sprite3D).transform.lookAt(new laya.d3.math.Vector3(sx,0,sy),new laya.d3.math.Vector3(0,1,0));
                var rotation = new laya.d3.math.Quaternion();
                laya.d3.math.Quaternion.lookAt(transform.position, new laya.d3.math.Vector3(sx, 0, sy), new laya.d3.math.Vector3(0, 1, 0), rotation);
                transform.localRotation = rotation;
                // (this.owner as Laya.Sprite3D).transform.rotate(new laya.d3.math.Vector3(0,DataManager.Instance.sceneData.autoMoveDir/180 * Math.PI,0),false);
                // let rotation:laya.d3.math.Quaternion = new laya.d3.math.Quaternion();
                // (this.owner as Laya.Sprite3D).transform.rotation.rotateY(DataManager.Instance.sceneData.autoMoveDir/180,rotation);
                // (this.owner as Laya.Sprite3D).transform.localRotation = rotation;
                this.owner.transform.translate(new laya.d3.math.Vector3(0, 0, 0.05), true);
            }
        };
        return RoleScript;
    }(Laya.Script));
    game.RoleScript = RoleScript;
})(game || (game = {}));
//# sourceMappingURL=RoleScript.js.map