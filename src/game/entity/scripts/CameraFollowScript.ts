/**
* name 
*/
module game{
	export class CameraFollowScript extends Laya.Script{
		constructor(){
			super();
		}
		_update(state: Laya.RenderState):void{
			 let transform:laya.d3.core.Transform3D = (this.owner as Laya.Sprite3D).transform;
			 let role3D = EntityManager.Instance.role3D;
			//  transform.translate()
			(this.owner as Laya.Sprite3D).transform.position = new Laya.Vector3(role3D.transform.position.x, role3D.transform.position.y + 5, role3D.transform.position.z - 10);
			// camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
			// (this.owner as Laya.Sprite3D).transform.lookAt(role3D.transform.position,new laya.d3.math.Vector3(0,1,0));
		}
	}
}