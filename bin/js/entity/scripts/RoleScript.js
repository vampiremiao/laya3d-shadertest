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
        return RoleScript;
    }(Laya.Script));
    game.RoleScript = RoleScript;
})(game || (game = {}));
//# sourceMappingURL=RoleScript.js.map