/*
* name;
*/
class CustomMaterial extends Laya.BaseMaterial{
    public static ALBEDOTEXTURE:number = 1;
		public static NORMALTEXTURE:number = 2;
		public static SPECULARTEXTURE:number = 3;
		public static EMISSIVETEXTURE:number = 4;
		public static REFLECTTEXTURE:number = 5;
		public static ALBEDOCOLOR:number = 6;
		public static MATERIALSPECULAR:number = 8;
		public static SHININESS:number = 9;
		public static MATERIALREFLECT:number = 10;
		public static TILINGOFFSET:number = 11;
    constructor(){
        super();
        this.setShaderName("CustomShader");
        // this._setBuffer(CustomMaterial.FlashFactor,new Float32Array([0, 1, 0.5, 0.5]));
        this._setBuffer(CustomMaterial.FlashFactor,new Float32Array([0.5, 1, 0.5, 0.5]));
        // this._setColor(CustomMaterial.ALBEDOCOLOR, new Laya.Vector4(1.0, 1.0, 1.0, 1.0));
        // this._setColor(CustomMaterial.MATERIALSPECULAR, new Laya.Vector3(1.0, 1.0, 1.0));
        // this._setNumber(CustomMaterial.SHININESS, 0.078125);
        // this._setColor(CustomMaterial.MATERIALREFLECT, new Laya.Vector3(1.0, 1.0, 1.0));
        // this._setNumber(CustomMaterial.ALPHATESTVALUE, 0.5);
        // this._setColor(CustomMaterial.TILINGOFFSET, new Laya.Vector4(1.0, 1.0, 0.0, 0.0));
        // this._removeDisablePublicShaderDefine(Laya.ShaderCompile3D.SHADERDEFINE_POINTLIGHT | Laya.ShaderCompile3D.SHADERDEFINE_SPOTLIGHT | Laya.ShaderCompile3D.SHADERDEFINE_DIRECTIONLIGHT);
    }

    public set diffuseTexture(value){
        // if (value)
		// 		this._addShaderDefine(CustomMaterial.DIFFUSETEXTURE);
		// 	else
		// 		this._removeShaderDefine(CustomMaterial.DIFFUSETEXTURE);
        this._setTexture(CustomMaterial.DIFFUSETEXTURE,value);
    }

    public get diffuseTexture():laya.d3.resource.BaseTexture{
        return this._getTexture(CustomMaterial.DIFFUSETEXTURE);
    }

    public set flashTexture(value){
        this._setTexture(CustomMaterial.FLASHTEXTURE,value);
    }

    public get flashTexture():laya.d3.resource.BaseTexture{
        return this._getTexture(CustomMaterial.FLASHTEXTURE);
    }

    public set curTime(value:number){
        this._setNumber(CustomMaterial.CURTIME,value);
    }

    public get curTime():number{
        return this._getNumber(CustomMaterial.CURTIME);
    }

    public set marginalColor(value){
        this._setColor(CustomMaterial.MARGINALCOLOR,value);
    }
    public static DIFFUSETEXTURE:number = 1;
    public static MARGINALCOLOR:number = 2;
    public static CURTIME:number = 10;
    public static FLASHTEXTURE:number = 11;
    public static FlashFactor:number = 12;
}