/*
* name;
*/
module game{
	export class RoleScript extends Laya.Script{
        constructor(){
            super();
        }

        _load(owner: Laya.ComponentNode): void{
            console.log("role loaded");
        }

        _update(state: Laya.RenderState):void{
            if(DataManager.Instance.sceneData.autoMoveDir != 9999){
                let transform:laya.d3.core.Transform3D = (this.owner as Laya.Sprite3D).transform;
                let sx:number = -Math.cos(DataManager.Instance.sceneData.autoMoveDir/180 * Math.PI - Math.PI) + transform.position.x;
                let sy:number = Math.sin(DataManager.Instance.sceneData.autoMoveDir/180 * Math.PI - Math.PI) +  transform.position.z;
                // (this.owner as Laya.Sprite3D).transform.lookAt(new laya.d3.math.Vector3(sx,0,sy),new laya.d3.math.Vector3(0,1,0));
                let rotation:laya.d3.math.Quaternion = new laya.d3.math.Quaternion();
                laya.d3.math.Quaternion.lookAt(transform.position,new laya.d3.math.Vector3(sx,0,sy),new laya.d3.math.Vector3(0,1,0),rotation);
                transform.localRotation = rotation;
                // (this.owner as Laya.Sprite3D).transform.rotate(new laya.d3.math.Vector3(0,DataManager.Instance.sceneData.autoMoveDir/180 * Math.PI,0),false);
                // let rotation:laya.d3.math.Quaternion = new laya.d3.math.Quaternion();
                // (this.owner as Laya.Sprite3D).transform.rotation.rotateY(DataManager.Instance.sceneData.autoMoveDir/180,rotation);
                // (this.owner as Laya.Sprite3D).transform.localRotation = rotation;
                (this.owner as Laya.Sprite3D).transform.translate(new laya.d3.math.Vector3(0,0,0.05),true);
                
            }
        }
    }
}
