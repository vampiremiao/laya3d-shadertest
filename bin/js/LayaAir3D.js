var GameDefine = (function () {
    function GameDefine() {
    }
    GameDefine.Walk_Animation = "WK_heavy_infantry_04_charge";
    GameDefine.Attack_Animation = "";
    return GameDefine;
}());
// 程序入口
var LayaAir3D = (function () {
    function LayaAir3D() {
        //初始化引擎
        Laya3D.init(0, 0, true);
        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        //开启统计信息
        Laya.Stat.show();
        this.initGameVars();
        this.initGame();
    }
    LayaAir3D.prototype.initGameVars = function () {
    };
    LayaAir3D.prototype.initGame = function () {
        this.game = Game.Instance;
        this.game.init();
        Laya.timer.frameLoop(1, this, this.enterFrame);
    };
    LayaAir3D.prototype.enterFrame = function () {
        this.game.update();
    };
    return LayaAir3D;
}());
new LayaAir3D();
//# sourceMappingURL=LayaAir3D.js.map