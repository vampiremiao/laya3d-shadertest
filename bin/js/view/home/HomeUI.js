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
/**Created by the LayaAirIDE*/
var view;
(function (view) {
    var HomeUI = (function (_super) {
        __extends(HomeUI, _super);
        function HomeUI() {
            return _super.call(this) || this;
        }
        HomeUI.prototype.openRefresh = function () {
            this._skin = this.ui;
            this.joy = new view.VirtualJoy(this._skin.joyUI);
        };
        return HomeUI;
    }(view.UIBase));
    view.HomeUI = HomeUI;
})(view || (view = {}));
//# sourceMappingURL=HomeUI.js.map