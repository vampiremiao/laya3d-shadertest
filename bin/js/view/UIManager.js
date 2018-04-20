var UIManager = (function () {
    function UIManager() {
        this._views = {};
        this.uiCreateTimeDic = {}; //窗口show的时间
        this.uiDisposeTimeDic = {}; //窗口hide的时间
    }
    UIManager.prototype.init = function () {
        //绑定ui 类型与 class
        UIManager.bindingrelation[11 /* Loading */] = [view.LoadingUI, ui.LoadingUI];
        // UIManager.bindingrelation[UIType.SelectServer] = SelectServerCtrl;
        // UIManager.bindingrelation[UIType.Login] = LoginUICtrl;
        UIManager.bindingrelation[201 /* MainUI */] = [view.HomeUI, ui.home.HomeUI];
        // UIManager.bindingrelation[UIType.CreateRole] = CreateRoleUICtrl;
    };
    /**
     * 打开ui 如果管理器里面没有就创建 有就隐藏变为显示
     * @param type:UIType
     * @param openData:UIOpenData 打开面板参数
     * @param limit:boolean 是否检测打开条件
     */
    UIManager.prototype.show = function (type, openData, limit) {
        if (openData === void 0) { openData = null; }
        if (limit === void 0) { limit = true; }
        this.uiCreateTimeDic[type] = Laya.timer.currTimer;
        var view = null;
        if (this._views[type]) {
            view = this._views[type];
        }
        else {
            view = new UIManager.bindingrelation[type][0];
            view.uiType = type;
            view.uiClass = UIManager.bindingrelation[type][1];
            view.create();
            this._views[type] = view;
        }
        // Game.Instance.baseLayer.getLayerByUIType(type).addChild(view);
        view.show(openData);
        return view;
    };
    /**
     * 关闭ui  remove=true 从内存中移除，反之隐藏ui
     */
    UIManager.prototype.hide = function (type) {
        if (this._views[type]) {
            this._views[type].hide();
            if (!this._views[type].useDelayDestroy) {
                // Game.Instance.baseLayer.getLayerByUIType(type).removeChild(this._views[type]);
                if (this._views[type].isInit()) {
                    this._views[type].dispose();
                }
                delete this._views[type];
            }
            else {
                this.uiDisposeTimeDic[type] = Laya.timer.currTimer;
            }
            // this.updateMapMsg(true);
            // GuideManager.Instance.cancelGuide(constants.E_GUIDE_TYPE.ReturnButtonGuide);	//取消返回键引导
        }
    };
    UIManager.prototype.updateTime = function () {
        //处理窗口延迟销毁
        var curTime = Laya.timer.currTimer;
        for (var szType in this.uiDisposeTimeDic) {
            var type = parseInt(szType);
            if (this.uiCreateTimeDic[type] < this.uiDisposeTimeDic[type] && curTime > this.uiDisposeTimeDic[type] + 30000) {
                // Game.Instance.baseLayer.getLayerByUIType(type).removeChild(this._views[type]);
                if (this._views[type].isInit()) {
                    this._views[type].dispose();
                }
                delete this._views[type];
                delete this.uiCreateTimeDic[type];
                delete this.uiDisposeTimeDic[type];
                // console.log("延迟销毁窗口", type);
            }
        }
    };
    /**
     * 如果管理器里面没有就 创建，有就移除
     */
    UIManager.prototype.showOrHide = function (type, openData) {
        if (this._views[type]) {
            if (this._views[type].visible) {
                this.hide(type);
            }
            else {
                this.show(type, openData);
            }
        }
        else {
            this.show(type, openData);
        }
    };
    UIManager.prototype.getUI = function (type) {
        return this._views[type];
    };
    UIManager.Instance = new UIManager();
    UIManager.bindingrelation = {};
    return UIManager;
}());
/**开面板参数  */
var UIOpenData = (function () {
    function UIOpenData($data) {
        if ($data === void 0) { $data = null; }
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.data = $data;
        this.args = args;
    }
    return UIOpenData;
}());
//# sourceMappingURL=UIManager.js.map