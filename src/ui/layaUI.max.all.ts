
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.home {
    export class HomeUI extends View {
		public txtRoleName:Laya.Label;
		public joyUI:ui.home.VirtualJoyUI;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Label","props":{"y":13,"x":256,"var":"txtRoleName","text":"主界面"}},{"type":"VirtualJoy","props":{"y":235,"x":68,"var":"joyUI","runtime":"ui.home.VirtualJoyUI"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.home.VirtualJoyUI",ui.home.VirtualJoyUI);

            super.createChildren();
            this.createView(ui.home.HomeUI.uiView);

        }

    }
}

module ui.home {
    export class VirtualJoyUI extends View {
		public virtual:Laya.Image;
		public ball:Laya.Image;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"virtual","skin":"skin/home/circle.png"}},{"type":"Image","props":{"y":25,"x":25,"var":"ball","skin":"skin/home/ball.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.home.VirtualJoyUI.uiView);

        }

    }
}

module ui {
    export class LoadingUI extends View {
		public txtLoading:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Label","props":{"y":217,"x":236,"width":158,"var":"txtLoading","text":"loading...","height":47,"fontSize":20,"color":"#ffffff"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.LoadingUI.uiView);

        }

    }
}
