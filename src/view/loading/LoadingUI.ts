/*
* name;
*/
module view{
	export class LoadingUI extends UIBase{
		constructor(){
			super();
		}

		protected openRefresh(): void {
			// Laya.timer.once(1000,this,this.loadComplete)
		}

		// private loadComplete():void{
		// 	GameStateManager.Instance.changeGameState(GameStateType.Home);
		// }
	}
}