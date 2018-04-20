
class GameDefine{
    static Walk_Animation :string = "WK_heavy_infantry_04_charge";
    static Attack_Animation:string = "";
}
// 程序入口
class LayaAir3D {
    scene:Laya.Scene;
    game:Game;
    constructor() {
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

    private initGameVars():void{

    }

    private initGame():void{
        this.game = Game.Instance;
        this.game.init();
        Laya.timer.frameLoop(1,this,this.enterFrame);
    }

    private enterFrame():void{
        this.game.update();
    }
}
new LayaAir3D();