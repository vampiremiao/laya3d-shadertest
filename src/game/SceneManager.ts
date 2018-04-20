/**
* name 
*/
module game {
	export class SceneManager {
		public stage: Laya.Sprite;
		scene: Laya.Scene;
		terrain: Laya.Terrain;
		role3d: Laya.Sprite3D;
		directionLight: Laya.DirectionLight;
		public static readonly Instance: SceneManager = new SceneManager();
		constructor() {

		}

		public enter(): void {
			//添加3D场景
			// this.scene = Laya.stage.addChild(new Laya.Scene()) as Laya.Scene;
			this.stage = Game.Instance.baseLayer.sceneLayer;
			this.scene = this.stage.addChild(Laya.Scene.load("res/fbx/LayaScene_testLaya/testLaya.ls")) as Laya.Scene;
			this.scene.once(Laya.Event.HIERARCHY_LOADED, this, this.sceneLoaded);
		}

		public updateTime():void{
			if(this.customMaterial1){
				this.customMaterial1.curTime = Laya.timer.currFrame;
			}
		}

		private initDirectionLight():void{
			this.directionLight = this.scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
			this.directionLight.color = new Laya.Vector3(1, 1, 1);
			this.directionLight.transform.translate(new Laya.Vector3(-2.165527, 2.193848, -3.087891));
			this.directionLight.direction = new Laya.Vector3(0.3, -1, 0);
			this.directionLight.shadow = true;
			this.directionLight.shadowDistance = 45;
			this.directionLight.shadowPSSMCount = 1;
			this.directionLight.shadowPCFType = 1;
			this.directionLight.shadowResolution = 2048;
		}

		private initCamera():void{
			//添加照相机channel
			var camera: Laya.Camera = (this.scene.addChild(new Laya.Camera(0, 0.3, 1000))) as Laya.Camera;
			camera.transform.translate(new Laya.Vector3(-11.54094, 4.062168, 15.4548));
			// camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
			camera.transform.rotation = new Laya.Quaternion(0.08217335, -0.8517019, -0.1405077, -0.4981055);
			//this.camera.clearColor = new Laya.Vector4(0.1921569,0.3019608,0.4745098,0);
			camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
			var skyBox = new Laya.SkyBox();
			camera.sky = skyBox;
			skyBox.textureCube = Laya.TextureCube.load("res/fbx/LayaScene_testLaya/Assets/TinyTerrain/Standard Assets/Skyboxes/Skybox.ltc");
			CameraManager.Instance.mainCamera = camera;
		}

		private sceneLoaded(): void {
			this.terrain = this.scene.getChildAt(0) as Laya.Terrain;
			this.initCamera();
			// //添加方向光
			this.initDirectionLight();
			Laya.loader.create("res/fbx/LayaScene_testLaya/testLaya.lh", Laya.Handler.create(this, this.onModelOk), null, Laya.Sprite3D);
		}

		private ani: Laya.Animator;
		public stopMove(): void {
			this.ani.play("WK_heavy_infantry_05_combat_idle");
		}
		public move(): void {
			this.ani.play("WK_heavy_infantry_04_charge");
		}
		private customMaterial1: CustomMaterial;
		private onModelOk(): void {
			//添加蒙皮动画角色模型
			var role3D: Laya.Sprite3D = Laya.loader.getRes("res/fbx/LayaScene_testLaya/testLaya.lh").getChildAt(0);
			this.role3d = role3D;
			// role3D.transform.rotate(new laya.d3.math.Vector3(0,90,0),true,false);
			//加载到场景
			this.scene.addChild(role3D);
			this.ani = role3D.getComponentByType(Laya.Animator) as Laya.Animator;
			EntityManager.Instance.role3D = role3D;
			
			// this.ani.play("WK_heavy_infantry_04_charge");
			
			// CustomMaterial2.__init__();


			this.customMaterial1 = new CustomMaterial();
			var customMaterial1: CustomMaterial = this.customMaterial1;
            customMaterial1.diffuseTexture = Laya.Texture2D.load("res/fbx/LayaScene_testLaya/Assets/Toon_RTS_demo/models/Materials/DemoTexture.png");
			customMaterial1.flashTexture = Laya.Texture2D.load("res/fbx/LayaScene_testLaya/Assets/Toon_RTS_demo/models/Materials/FlashTexture.png");

			let customMaterial2 = new CustomMaterial2();
            customMaterial2.diffuseTexture = Laya.Texture2D.load("res/fbx/LayaScene_testLaya/Assets/Toon_RTS_demo/models/Materials/DemoTexture.png");
			// customMaterial1.flashTexture = Laya.Texture2D.load("res/fbx/LayaScene_testLaya/Assets/Toon_RTS_demo/models/Materials/FlashTexture.png");

            // customMaterial1.marginalColor = new Laya.Vector3(1, 0.7, 1);
			(role3D.getChildAt(0) as Laya.SkinnedMeshSprite3D).skinnedMeshRender.castShadow = true;
			// var baseMaterials: Array<Laya.BaseMaterial> = new Array<Laya.BaseMaterial>();
			// baseMaterials.push(this.customMaterial1);
			// (role3D.getChildAt(0) as Laya.SkinnedMeshSprite3D).skinnedMeshRender.sharedMaterial = Laya.StandardMaterial.load("res/fbx/LayaScene_testLaya/Assets/Toon_RTS_demo/models/Materials/DemoTexture.lmat");
			// (role3D.getChildAt(0) as Laya.SkinnedMeshSprite3D).skinnedMeshRender.sharedMaterial = Laya.StandardMaterial.defaultMaterial;
			(role3D.getChildAt(0) as Laya.SkinnedMeshSprite3D).skinnedMeshRender.sharedMaterial = customMaterial2;
			for (var index = 0; index < 100; index++) {
				let role3d2:Laya.Sprite3D = Laya.Sprite3D.instantiate(role3D);
				this.scene.addChild(role3d2);
				role3d2.transform.translate(new Laya.Vector3(Math.random() * -25 + 25,0,Math.random() * -25 + 25))
			}
			
			role3D.addComponent(RoleScript);
			CameraManager.Instance.mainCamera.addComponent(CameraFollowScript);
			CameraManager.Instance.mainCamera.transform.position = new Laya.Vector3(role3D.transform.position.x, role3D.transform.position.y + 5, role3D.transform.position.z - 10);
			// camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
			CameraManager.Instance.mainCamera.transform.lookAt(role3D.transform.position, new laya.d3.math.Vector3(0, 1, 0));
		}

		

		
	}
}