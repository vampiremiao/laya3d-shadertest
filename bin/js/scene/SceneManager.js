/**
* name
*/
var game;
(function (game) {
    var SceneManager = (function () {
        function SceneManager() {
        }
        SceneManager.prototype.enter = function () {
            //添加3D场景
            // this.scene = Laya.stage.addChild(new Laya.Scene()) as Laya.Scene;
            this.stage = Game.Instance.baseLayer.sceneLayer;
            this.scene = this.stage.addChild(Laya.Scene.load("res/fbx/LayaScene_testLaya/testLaya.ls"));
            this.scene.once(Laya.Event.HIERARCHY_LOADED, this, this.sceneLoaded);
        };
        SceneManager.prototype.sceneLoaded = function () {
            //添加照相机channel
            var camera = (this.scene.addChild(new Laya.Camera(0, 0.3, 1000)));
            camera.transform.translate(new Laya.Vector3(-11.54094, 4.062168, 15.4548));
            // camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
            camera.transform.rotation = new Laya.Quaternion(0.08217335, -0.8517019, -0.1405077, -0.4981055);
            camera.clearColor = new Laya.Vector4(0.1921569, 0.3019608, 0.4745098, 0);
            // //添加方向光
            var directionLight = this.scene.addChild(new Laya.DirectionLight());
            directionLight.color = new Laya.Vector3(1, 1, 1);
            directionLight.transform.translate(new Laya.Vector3(-2.165527, 2.193848, -3.087891));
            directionLight.direction = new Laya.Vector3(0.3, -1, 0);
            directionLight.shadow = true;
            directionLight.shadowDistance = 45;
            directionLight.shadowPSSMCount = 1;
            directionLight.shadowPCFType = 1;
            directionLight.shadowResolution = 2048;
            Laya.loader.create("res/fbx/LayaScene_testLaya/testLaya.lh", Laya.Handler.create(this, this.onModelOk), null, Laya.Sprite3D);
        };
        SceneManager.prototype.onModelOk = function () {
            //添加蒙皮动画角色模型
            var role3D = Laya.loader.getRes("res/fbx/LayaScene_testLaya/testLaya.lh");
            //加载到场景
            this.scene.addChild(role3D);
            this.ani = role3D.getChildAt(0).getComponentByType(Laya.Animator);
            // this.ani.play("WK_heavy_infantry_04_charge");
            role3D.addComponent(game.RoleScript);
        };
        SceneManager.Instance = new SceneManager();
        return SceneManager;
    }());
    game.SceneManager = SceneManager;
})(game || (game = {}));
//# sourceMappingURL=SceneManager.js.map