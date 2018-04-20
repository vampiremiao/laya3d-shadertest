/*
* name;
*/
var view;
(function (view) {
    var VirtualJoy = (function () {
        function VirtualJoy(skin) {
            this.circleRadius = 0;
            this.ballRadius = 0;
            this.centerX = 0;
            this.centerY = 0;
            this.p1 = new Laya.Point();
            this.startMove = false;
            this._start = false;
            this._skin = skin;
            this.circleRadius = 60.5;
            this.ballRadius = 35;
            this.centerX = this.circleRadius;
            this.centerY = this.circleRadius;
            this._skin.pivotX = this.circleRadius;
            this._skin.pivotY = this.circleRadius;
            this._skin.ball.pivotX = this.ballRadius;
            this._skin.ball.pivotY = this.ballRadius;
            this._skin.ball.x = this.centerX;
            this._skin.ball.y = this.centerY;
            this.p1.x = this._skin.x;
            this.p1.y = this._skin.y;
            this._skin.visible = false;
            this._skin.mouseEnabled = false;
            this._skin.mouseThrough = true;
            this.start();
        }
        VirtualJoy.prototype.start = function () {
            if (this._start)
                return;
            if (this._skin.parent == null) {
                var container = Game.Instance.baseLayer.mainLayer;
                container.addChild(this._skin);
            }
            this._skin.visible = false;
            var root = Laya.stage;
            root.on(Laya.Event.MOUSE_DOWN, this, this.onTouchBegin);
            this._start = true;
        };
        VirtualJoy.prototype.stop = function () {
            this._start = false;
            this.clearMove();
            var root = Laya.stage;
            root.off(Laya.Event.MOUSE_DOWN, this, this.onTouchBegin);
        };
        VirtualJoy.prototype.onTouchBegin = function (e) {
            // if(!(e.target instanceof egret.Stage)) return;     
            if (!this._skin) {
                return;
            }
            this._skin.x = e.stageX;
            this._skin.y = e.stageY;
            if (this._skin.parent == null) {
                var container = Game.Instance.baseLayer.mainLayer;
                container.addChild(this._skin);
            }
            this._skin.ball.x = this.centerX;
            this._skin.ball.y = this.centerY;
            this.p1.x = this._skin.x;
            this.p1.y = this._skin.y;
            var root = Laya.stage;
            root.off(Laya.Event.MOUSE_DOWN, this, this.onTouchBegin);
            root.on(Laya.Event.MOUSE_UP, this, this.onTouchEnd);
            root.on(Laya.Event.MOUSE_MOVE, this, this.onTouchMove);
            this._skin.visible = false;
        };
        VirtualJoy.prototype.onTouchEnd = function (e) {
            // if(this.touchID != e.touchPointID){
            // 	return;
            // }
            var root = Laya.stage;
            root.on(Laya.Event.MOUSE_DOWN, this, this.onTouchBegin);
            this._skin.ball.x = this.centerX;
            this._skin.ball.y = this.centerY;
            this.clearMove();
        };
        VirtualJoy.prototype.onTouchMove = function (e) {
            // if(this.touchID != e.touchPointID){
            // 	return;
            // }
            e.stopPropagation();
            if (!this._skin)
                return;
            var p2 = new Laya.Point(e.stageX, e.stageY);
            var angle = Math.atan2(p2.y - this.p1.y, p2.x - this.p1.x);
            var dist = Math.sqrt((this.p1.x - p2.x) * (this.p1.x - p2.x) + (this.p1.y - p2.y) * (this.p1.y - p2.y));
            var bx, by;
            if (dist <= (this.circleRadius - this.ballRadius)) {
                this._skin.ball.x = bx = this.centerX + p2.x - this._skin.x;
                this._skin.ball.y = by = this.centerY + p2.y - this._skin.y;
            }
            else {
                this._skin.ball.x = bx = Math.cos(angle) * (this.circleRadius - this.ballRadius) + this.centerX;
                this._skin.ball.y = by = Math.sin(angle) * (this.circleRadius - this.ballRadius) + this.centerY;
                this._skin.visible = true;
            }
            if (this._skin.visible == false)
                return;
            // let cellw:number = GameDefine.MAP_GRID_WIDTH;
            // let cellh:number = GameDefine.MAP_GRID_HEIGHT;
            // let dir = DirectionUtil.getDir( Math.floor(p2.x/cellw)-Math.floor(this.p1.x/cellw),Math.floor(p2.y/cellh)- Math.floor(this.p1.y/cellh));
            //	TestGB.Instance.moveByVirtual(dir);
            var dir = this.orientation(bx, by, this.centerX, this.centerY);
            this.moveByVirtual(dir);
            //console.log(dir+'playRun移动方向');
        };
        VirtualJoy.prototype.orientation = function (fx, fy, ex, ey) {
            var dx = ex - fx;
            var dy = ey - fy;
            var r = Math.atan2(dy, dx) * 180 / Math.PI;
            return r;
        };
        VirtualJoy.prototype.clearMove = function () {
            //	TestGB.Instance.moveByVirtual(-1);
            this.moveByVirtual(9999);
            if (this._skin.parent) {
                this._skin.parent.removeChild(this._skin);
            }
            var root = Laya.stage;
            root.off(Laya.Event.MOUSE_UP, this, this.onTouchEnd);
            root.off(Laya.Event.MOUSE_MOVE, this, this.onTouchMove);
        };
        VirtualJoy.prototype.moveByVirtual = function (value) {
            if (DataManager.Instance.sceneData.autoMoveDir != value) {
                // DataManager.Instance.sceneData.sendNotification(constants.E_DATA_NOTIFY_UIVIEW.VIRTUAL_MOVE,value);
                DataManager.Instance.sceneData.sendNotification(1, value);
            }
        };
        return VirtualJoy;
    }());
    view.VirtualJoy = VirtualJoy;
})(view || (view = {}));
//# sourceMappingURL=VirtualJoy.js.map