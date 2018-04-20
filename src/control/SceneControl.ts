/*
* name;
*/
class SceneControl implements IObserver{
    update(cmd:number,data:any):void{
		switch(cmd){
            case 1:
               
                if(DataManager.Instance.sceneData.autoMoveDir == 9999 && data != 9999 || DataManager.Instance.sceneData.autoMoveDir != 9999 && data == 9999){
                    if(data == 9999){
                        game.SceneManager.Instance.stopMove();
                    }else{
                        game.SceneManager.Instance.move();
                    }
                }
                 DataManager.Instance.sceneData.autoMoveDir = data;
                
            break;
        }
    }
}