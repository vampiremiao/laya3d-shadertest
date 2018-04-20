var view;
(function (view) {
    var UIBase = (function () {
        function UIBase() {
            this._inited = false;
            this._isLoading = false;
            this.useDelayDestroy = false; //是否延迟销毁 
            this.visible = false;
        }
        /**bool是否加载后及时显示*/
        UIBase.prototype.setMySkinName = function (value, bool) {
            if (bool === void 0) { bool = false; }
            this.mySkinName = value;
            if (bool)
                this.show(this._openData);
        };
        UIBase.prototype.onExmlLoadComplete = function () {
            // if (!clazz) {
            // 	console.error(url + "load error!");
            // }
            // this.setSkin(new clazz);
            this.createBlackRect();
            this._inited = true;
            this.myCreated();
            this.$createCloseButton();
            this.openRefresh();
            this.onResize(Laya.stage.width, Laya.stage.height);
            this.$createAction();
        };
        UIBase.prototype.create = function () {
            this.ui = new this.uiClass();
        };
        UIBase.prototype.isInit = function () {
            return this._inited;
        };
        /**
         * 子类重写 初始化窗口
         */
        UIBase.prototype.myCreated = function () {
        };
        UIBase.prototype.$createAction = function () {
        };
        UIBase.prototype.$createCloseButton = function () {
        };
        //
        UIBase.prototype.createBlackRect = function () {
        };
        UIBase.prototype.closeUI = function () {
            UIManager.Instance.hide(this.uiType);
        };
        UIBase.prototype.show = function ($openData) {
            if ($openData === void 0) { $openData = null; }
            this._openData = $openData;
            this.visible = true;
            if (this.ui)
                Game.Instance.baseLayer.getLayerByUIType(this.uiType).addChild(this.ui);
            if (!this._inited) {
                if (!this._isLoading) {
                    this._isLoading = true;
                    // EXML.load(this.mySkinName, this.onExmlLoadComplete, this, true);
                    this.onExmlLoadComplete();
                }
            }
            else {
                this.openRefresh();
            }
        };
        Object.defineProperty(UIBase.prototype, "openData", {
            get: function () {
                return this._openData;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 子类重写
         */
        UIBase.prototype.openRefresh = function () {
            // if(this.ui)
            // 	this.ui.visible = true;
        };
        /**
         * 子类重写
         */
        UIBase.prototype.closeComplete = function () {
        };
        UIBase.prototype.hide = function () {
            // if(this.ui)
            // 	this.ui.visible = false;
            this.visible = false;
            if (this.ui.parent) {
                this.ui.parent.removeChild(this.ui);
            }
            this.closeComplete();
        };
        /**
         * 子类重写
         */
        UIBase.prototype.update = function (cmd, data) {
        };
        /**
         * 如果子类重写 必须调用 super.dispose
         */
        UIBase.prototype.dispose = function () {
            if (this._inited) {
            }
        };
        /**
         *
         */
        UIBase.prototype.onResize = function (nW, nH) {
        };
        return UIBase;
    }());
    view.UIBase = UIBase;
})(view || (view = {}));
//# sourceMappingURL=UIBase.js.map