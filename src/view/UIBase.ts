module view{
	export interface IUIBase {
		show(): void;
		hide(): void;

	}

	export class UIBase implements IUIBase, IObserver {

		/**这里用这个变量 皮肤赋值一定要赋相对路径 */
		private mySkinName: string;
		private _inited: boolean = false;
		private _isLoading: boolean = false;
		/**打开面板参数*/
		protected _openData: UIOpenData;
		public uiType: number;
		public useDelayDestroy = false;	//是否延迟销毁 
		public ui:Laya.View;
		public uiClass:any;
		public visible:boolean = false;
		/**bool是否加载后及时显示*/
		public setMySkinName(value: string, bool: boolean = false): void {
			this.mySkinName = value;
			if (bool) this.show(this._openData);
		}

		private onExmlLoadComplete(): void {
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
		}

		public create():void{
			this.ui = new this.uiClass();
		}

		public isInit(): boolean {
			return this._inited;
		}

		/**
		 * 子类重写 初始化窗口
		 */
		public myCreated(): void {

		}

		public $createAction(): void {

		}

		protected $createCloseButton(): void {

		}

		//
		public createBlackRect() {

		}

		public closeUI(): void {
			UIManager.Instance.hide(this.uiType);
		}

		public show($openData: UIOpenData = null): void {
			this._openData = $openData;
			this.visible = true;
			if(this.ui)
				Game.Instance.baseLayer.getLayerByUIType(this.uiType).addChild(this.ui);
			if (!this._inited) {
				if (!this._isLoading) {
					this._isLoading = true;
					// EXML.load(this.mySkinName, this.onExmlLoadComplete, this, true);
					this.onExmlLoadComplete();
				}
			} else {
				this.openRefresh();
			}
		}

		public get openData(): UIOpenData {
			return this._openData;
		}

		/**
		 * 子类重写
		 */
		protected openRefresh(): void {
			// if(this.ui)
			// 	this.ui.visible = true;
		}

		/**
		 * 子类重写
		 */
		protected closeComplete(): void {

		}

		public hide(): void {
			// if(this.ui)
			// 	this.ui.visible = false;
			this.visible = false;
			if(this.ui.parent){
				this.ui.parent.removeChild(this.ui);
			}
			this.closeComplete();
		}

		/**
		 * 子类重写
		 */
		update(cmd: number, data: any): void {

		}

		/**
		 * 如果子类重写 必须调用 super.dispose 
		 */
		public dispose(): void {
			if (this._inited) {
				
			}
		}

		/**
		 * 
		 */
		public onResize(nW: number, nH: number): void {

		}
	}
}

