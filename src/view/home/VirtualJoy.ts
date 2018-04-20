/*
* name;
*/
module view{
	export class VirtualJoy{

        private circleRadius:number = 0;
        private ballRadius:number = 0;
        private centerX:number = 0;
        private centerY:number = 0;
        private touchID:number;
        private p1:Laya.Point = new Laya.Point();
        private startMove:boolean = false;
        private _start:boolean = false;
        private _skin:ui.home.VirtualJoyUI;
        
        constructor(skin:ui.home.VirtualJoyUI){
            this._skin = skin;
            this.circleRadius = 60.5;
            this.ballRadius   = 35;
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

        public start(){
            if(this._start)
                return;
            if(this._skin.parent == null){
                let container:CLayerBase = Game.Instance.baseLayer.mainLayer;
                container.addChild(this._skin);
            }
            this._skin.visible = false;

            let root:Laya.Sprite = Laya.stage;
            root.on(Laya.Event.MOUSE_DOWN, this, this.onTouchBegin);	
            this._start = true;

        }
        public stop(){
            this._start = false;
            this.clearMove();
            let root:Laya.Sprite = Laya.stage;
            root.off(Laya.Event.MOUSE_DOWN, this, this.onTouchBegin);
        }


        private onTouchBegin(e:Laya.Event):void{
            // if(!(e.target instanceof egret.Stage)) return;     
            if(!this._skin)
            {
                return;
            }
            this._skin.x = e.stageX;
            this._skin.y = e.stageY;
            
            if(this._skin.parent == null){
                let container:CLayerBase = Game.Instance.baseLayer.mainLayer;
                container.addChild(this._skin);
            }
            this._skin.ball.x = this.centerX;
            this._skin.ball.y = this.centerY;
            this.p1.x = this._skin.x;
            this.p1.y = this._skin.y;
            
            let root:Laya.Sprite = Laya.stage;
            root.off(Laya.Event.MOUSE_DOWN, this, this.onTouchBegin);
            root.on(Laya.Event.MOUSE_UP, this, this.onTouchEnd);
            root.on(Laya.Event.MOUSE_MOVE, this, this.onTouchMove);

            this._skin.visible = false;

        }

        private onTouchEnd(e:Laya.Event):void{
            // if(this.touchID != e.touchPointID){
            // 	return;
            // }
            let root:Laya.Sprite = Laya.stage;

            root.on(Laya.Event.MOUSE_DOWN, this, this.onTouchBegin);
            this._skin.ball.x = this.centerX;
            this._skin.ball.y = this.centerY;
            this.clearMove();
        }
        private onTouchMove(e:Laya.Event):void{
            // if(this.touchID != e.touchPointID){
            // 	return;
            // }
            e.stopPropagation();
            if(!this._skin)
                return;
            let p2:Laya.Point = new Laya.Point(e.stageX,e.stageY);
            let angle:number = Math.atan2( p2.y - this.p1.y, p2.x -this.p1.x);
            let dist = Math.sqrt((this.p1.x - p2.x) * (this.p1.x - p2.x) + (this.p1.y - p2.y) * (this.p1.y - p2.y));
            let bx:number,by:number;
            if(dist <= (this.circleRadius - this.ballRadius)){
                this._skin.ball.x = bx = this.centerX + p2.x - this._skin.x;
                this._skin.ball.y = by = this.centerY + p2.y  - this._skin.y;
            }else{
                this._skin.ball.x = bx = Math.cos(angle)*(this.circleRadius - this.ballRadius) + this.centerX;
                this._skin.ball.y = by = Math.sin(angle)*(this.circleRadius - this.ballRadius) + this.centerY;
                this._skin.visible = true;

            }
            if(this._skin.visible == false)
                return;
            // let cellw:number = GameDefine.MAP_GRID_WIDTH;
            // let cellh:number = GameDefine.MAP_GRID_HEIGHT;

            // let dir = DirectionUtil.getDir( Math.floor(p2.x/cellw)-Math.floor(this.p1.x/cellw),Math.floor(p2.y/cellh)- Math.floor(this.p1.y/cellh));
        //	TestGB.Instance.moveByVirtual(dir);
            let dir = this.orientation(bx,by,this.centerX,this.centerY);
            this.moveByVirtual(dir);
            //console.log(dir+'playRun移动方向');


        }

        public orientation(fx:number,fy:number,ex:number,ey:number) : number
        {
            var dx : number = ex - fx;
            var dy : number = ey - fy;
            var r : number  = Math.atan2(dy, dx) * 180 / Math.PI;
            return r;
        }
        private clearMove():void{
        //	TestGB.Instance.moveByVirtual(-1);
            this.moveByVirtual(9999);
            if(this._skin.parent)
            { 
                this._skin.parent.removeChild(this._skin);
            }
            let root:Laya.Sprite =Laya.stage;

            root.off(Laya.Event.MOUSE_UP, this, this.onTouchEnd);
            root.off(Laya.Event.MOUSE_MOVE, this, this.onTouchMove);
        }

        public moveByVirtual(value:number):void{
        
            if(DataManager.Instance.sceneData.autoMoveDir !=value)
            {
                // DataManager.Instance.sceneData.sendNotification(constants.E_DATA_NOTIFY_UIVIEW.VIRTUAL_MOVE,value);
                DataManager.Instance.sceneData.sendNotification(1,value);
            }
             
        }

    }
}
