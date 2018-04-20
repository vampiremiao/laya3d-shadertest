/**
* name 
*/
module game{
	export class EntityManager{
		role3D:Laya.Sprite3D;
		constructor(){

		}

		private static _instance:EntityManager;
		public static get Instance():EntityManager{
			if(!this._instance){
				this._instance = new EntityManager();
			}
			return this._instance;
		}
	}
}