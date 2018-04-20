/*
* name;
*/
module game {
	export class CameraManager{
        public static readonly Instance: CameraManager = new CameraManager();
        constructor(){

        }
        public mainCamera:Laya.Camera;
    }
}