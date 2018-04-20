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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var home;
    (function (home) {
        var HomeUI = (function (_super) {
            __extends(HomeUI, _super);
            function HomeUI() {
                return _super.call(this) || this;
            }
            HomeUI.prototype.createChildren = function () {
                View.regComponent("ui.home.VirtualJoyUI", ui.home.VirtualJoyUI);
                _super.prototype.createChildren.call(this);
                this.createView(ui.home.HomeUI.uiView);
            };
            HomeUI.uiView = { "type": "View", "props": { "width": 600, "height": 400 }, "child": [{ "type": "Label", "props": { "y": 13, "x": 256, "var": "txtRoleName", "text": "主界面" } }, { "type": "VirtualJoy", "props": { "y": 235, "x": 68, "var": "joyUI", "runtime": "ui.home.VirtualJoyUI" } }] };
            return HomeUI;
        }(View));
        home.HomeUI = HomeUI;
    })(home = ui.home || (ui.home = {}));
})(ui || (ui = {}));
(function (ui) {
    var home;
    (function (home) {
        var VirtualJoyUI = (function (_super) {
            __extends(VirtualJoyUI, _super);
            function VirtualJoyUI() {
                return _super.call(this) || this;
            }
            VirtualJoyUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.home.VirtualJoyUI.uiView);
            };
            VirtualJoyUI.uiView = { "type": "View", "props": {}, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "virtual", "skin": "skin/home/circle.png" } }, { "type": "Image", "props": { "y": 25, "x": 25, "var": "ball", "skin": "skin/home/ball.png" } }] };
            return VirtualJoyUI;
        }(View));
        home.VirtualJoyUI = VirtualJoyUI;
    })(home = ui.home || (ui.home = {}));
})(ui || (ui = {}));
(function (ui) {
    var LoadingUI = (function (_super) {
        __extends(LoadingUI, _super);
        function LoadingUI() {
            return _super.call(this) || this;
        }
        LoadingUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.LoadingUI.uiView);
        };
        LoadingUI.uiView = { "type": "View", "props": { "width": 600, "height": 400 }, "child": [{ "type": "Label", "props": { "y": 217, "x": 236, "width": 158, "var": "txtLoading", "text": "loading...", "height": 47, "fontSize": 20, "color": "#ffffff" } }] };
        return LoadingUI;
    }(View));
    ui.LoadingUI = LoadingUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map