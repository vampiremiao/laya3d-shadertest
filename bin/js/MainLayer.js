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
var MainLayer = (function (_super) {
    __extends(MainLayer, _super);
    function MainLayer() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    MainLayer.prototype.initContainer = function ($container) {
        this.container = $container;
        this.container.addChild(this.sceneLayer);
        this.container.addChild(this.mainLayer);
        this.container.addChild(this.commonLayer);
        this.container.addChild(this.popLayer);
        this.container.addChild(this.messageLayer);
        this.container.addChild(this.storyLayer);
        this.container.addChild(this.tipLayer);
        this.container.addChild(this.gmLayer);
        this.container.addChild(this.topLayer);
        this.container.addChild(this.eyiIpLayer);
    };
    MainLayer.prototype.init = function () {
        this.sceneLayer = new CLayerBase();
        this.sceneLayer.mouseEnabled = false;
        this.sceneLayer.mouseThrough = false;
        this.mainLayer = new CLayerBase();
        this.mainLayer.mouseEnabled = false;
        this.mainLayer.mouseThrough = false;
        this.commonLayer = new CLayerBase();
        this.commonLayer.mouseEnabled = false;
        this.commonLayer.mouseThrough = false;
        this.popLayer = new CLayerBase();
        this.popLayer.mouseEnabled = false;
        this.popLayer.mouseThrough = false;
        this.messageLayer = new CLayerBase();
        this.messageLayer.mouseEnabled = false;
        this.messageLayer.mouseThrough = false;
        this.storyLayer = new CLayerBase();
        this.storyLayer.mouseEnabled = false;
        this.storyLayer.mouseThrough = false;
        this.tipLayer = new CLayerBase();
        this.tipLayer.mouseEnabled = false;
        this.tipLayer.mouseThrough = false;
        this.gmLayer = new CLayerBase();
        this.gmLayer.mouseEnabled = false;
        this.gmLayer.mouseThrough = false;
        this.topLayer = new CLayerBase;
        this.topLayer.mouseEnabled = false;
        this.topLayer.mouseThrough = false;
        this.eyiIpLayer = new CLayerBase;
        this.eyiIpLayer.mouseEnabled = false;
        this.eyiIpLayer.mouseThrough = false;
    };
    MainLayer.prototype.getLayerByUIType = function (type) {
        if (type >= 0 && type < 100) {
            return this.sceneLayer;
        }
        else if (type >= 100 && type < 200) {
            return this.mainLayer;
        }
        else if (type >= 200 && type < 500) {
            return this.commonLayer;
        }
        else if (type >= 500 && type < 600) {
            return this.popLayer;
        }
        else if (type >= 600 && type < 700) {
            return this.messageLayer;
        }
        else if (type >= 700 && type < 800) {
            return this.storyLayer;
        }
        else if (type >= 800 && type < 900) {
            return this.tipLayer;
        }
        else if (type >= 900 && type < 1000) {
            return this.gmLayer;
        }
        else if (type >= 1000) {
            return this.topLayer;
        }
    };
    return MainLayer;
}(Laya.Sprite));
//# sourceMappingURL=MainLayer.js.map