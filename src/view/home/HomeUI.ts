/**Created by the LayaAirIDE*/
module view{
	export class HomeUI extends UIBase{
		constructor(){
			super();
		}
		private _skin:ui.home.HomeUI;
		private joy:VirtualJoy;
		
		protected openRefresh():void{
			this._skin = this.ui as ui.home.HomeUI;
			this.joy = new VirtualJoy(this._skin.joyUI);
		}
	}
}