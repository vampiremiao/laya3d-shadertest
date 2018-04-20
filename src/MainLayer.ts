class MainLayer extends Laya.Sprite
{
    /**地图场景层*/
    public  sceneLayer:CLayerBase;
    /**主界面*/
    public  mainLayer:CLayerBase;
    /**通用显示层*/
    public  commonLayer:CLayerBase;
    /**弹出层*/
    public  popLayer:CLayerBase;
    /**消息层*/ 
    public  messageLayer:CLayerBase;
    /**剧情层*/		
    public  storyLayer:CLayerBase;
    /**tip 弹出层 */
    public  tipLayer:CLayerBase;
    /**GM工具层 */
    public  gmLayer:CLayerBase;
    /**顶级弹出层 */
    public topLayer:CLayerBase;

    /**恶意ip提示container */
    public eyiIpLayer:CLayerBase;

    public container:Laya.Sprite;
    constructor(){
        super();
        this.init();
    }
    
    public initContainer($container:Laya.Sprite):void
    {
        this.container = $container;
        this.container.addChild(this.sceneLayer);
        this.container.addChild(this.mainLayer);
        this.container.addChild(this.commonLayer);
        this.container.addChild(this.popLayer);
        this.container.addChild(this.messageLayer);
        this.container.addChild(this.storyLayer);
        this.container.addChild(this.tipLayer);
        this.container.addChild(this.gmLayer);
        this.container.addChild(this.topLayer);
        this.container.addChild(this.eyiIpLayer);
    }
    
    private init():void
    {
        this.sceneLayer = new CLayerBase();
        this.sceneLayer.mouseEnabled = false;
        this.sceneLayer.mouseThrough = false;
        this.mainLayer = new CLayerBase();
        this.mainLayer.mouseEnabled = false;
        this.mainLayer.mouseThrough = false;
        this.commonLayer = new CLayerBase();
        this.commonLayer.mouseEnabled = false;
        this.commonLayer.mouseThrough = false;
        this.popLayer = new CLayerBase();
        this.popLayer.mouseEnabled = false;
        this.popLayer.mouseThrough = false;
        this.messageLayer = new CLayerBase();
        this.messageLayer.mouseEnabled = false;
        this.messageLayer.mouseThrough = false;
        this.storyLayer = new CLayerBase();
        this.storyLayer.mouseEnabled = false;
        this.storyLayer.mouseThrough = false;
        this.tipLayer = new CLayerBase();
        this.tipLayer.mouseEnabled = false;
        this.tipLayer.mouseThrough = false;
        this.gmLayer = new CLayerBase();
        this.gmLayer.mouseEnabled = false;
        this.gmLayer.mouseThrough = false;
        this.topLayer = new CLayerBase;
        this.topLayer.mouseEnabled = false;
        this.topLayer.mouseThrough = false;
        this.eyiIpLayer = new CLayerBase;
        this.eyiIpLayer.mouseEnabled = false;
        this.eyiIpLayer.mouseThrough = false;
    }

    public  getLayerByUIType(type:UIType):CLayerBase{
		if ( type >=0 && type <100 ){
			return this.sceneLayer;
		}else if ( type >=100 && type <200 ){
			return this.mainLayer;
		}else if ( type >=200 && type <500 ){
			return this.commonLayer;
		}else if ( type >=500 && type <600 ){
			return this.popLayer;
		}else if ( type >=600 && type <700 ){
			return this.messageLayer;
		}else if ( type >=700 && type <800 ){
			return this.storyLayer;
		}else if ( type >=800 && type <900 ){
			return this.tipLayer;
		}else if ( type >=900 && type <1000 ){
			return this.gmLayer;
		}else if ( type >= 1000){
            return this.topLayer;
        }
	}
}

	
	

