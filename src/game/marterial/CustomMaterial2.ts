/*
* name;
*/

class CustomMaterial2 extends Laya.BaseMaterial{
		/**渲染状态_不透明。*/
		public static RENDERMODE_OPAQUE:number = 1;
		/**渲染状态_不透明_双面。*/
		public static RENDERMODE_OPAQUEDOUBLEFACE:number = 2;
		/**渲染状态_透明测试。*/
		public static RENDERMODE_CUTOUT:number = 3;
		/**渲染状态_透明测试_双面。*/
		public static RENDERMODE_CUTOUTDOUBLEFACE:number = 4;
		/**渲染状态_透明混合。*/
		public static RENDERMODE_TRANSPARENT:number = 13;
		/**渲染状态_透明混合_双面。*/
		public static RENDERMODE_TRANSPARENTDOUBLEFACE:number = 14;
		/**渲染状态_加色法混合。*/
		public static RENDERMODE_ADDTIVE:number = 15;
		/**渲染状态_加色法混合_双面。*/
		public static RENDERMODE_ADDTIVEDOUBLEFACE:number = 16;
		/**渲染状态_只读深度_透明混合。*/
		public static RENDERMODE_DEPTHREAD_TRANSPARENT:number = 5;
		/**渲染状态_只读深度_透明混合_双面。*/
		public static RENDERMODE_DEPTHREAD_TRANSPARENTDOUBLEFACE:number = 6;
		/**渲染状态_只读深度_加色法混合。*/
		public static RENDERMODE_DEPTHREAD_ADDTIVE:number = 7;
		/**渲染状态_只读深度_加色法混合_双面。*/
		public static RENDERMODE_DEPTHREAD_ADDTIVEDOUBLEFACE:number = 8;
		/**渲染状态_无深度_透明混合。*/
		public static RENDERMODE_NONDEPTH_TRANSPARENT:number = 9;
		/**渲染状态_无深度_透明混合_双面。*/
		public static RENDERMODE_NONDEPTH_TRANSPARENTDOUBLEFACE:number = 10;
		/**渲染状态_无深度_加色法混合。*/
		public static RENDERMODE_NONDEPTH_ADDTIVE:number = 11;
		/**渲染状态_无深度_加色法混合_双面。*/
		public static RENDERMODE_NONDEPTH_ADDTIVEDOUBLEFACE:number = 12;
		
		public static SHADERDEFINE_DIFFUSEMAP:number;
		public static SHADERDEFINE_NORMALMAP:number;
		public static SHADERDEFINE_SPECULARMAP:number;
		public static SHADERDEFINE_EMISSIVEMAP:number;
		public static SHADERDEFINE_AMBIENTMAP:number;
		public static SHADERDEFINE_REFLECTMAP:number;
		public static SHADERDEFINE_UVTRANSFORM:number;
		public static SHADERDEFINE_TILINGOFFSET:number;
		public static SHADERDEFINE_ADDTIVEFOG:number;
		
		public static DIFFUSETEXTURE:number = 1;
		public static NORMALTEXTURE:number = 2;
		public static SPECULARTEXTURE:number = 3;
		public static EMISSIVETEXTURE:number = 4;
		public static AMBIENTTEXTURE:number = 5;
		public static REFLECTTEXTURE:number = 6;
		public static ALBEDO:number = 7;
		public static UVANIAGE:number = 8;
		public static MATERIALAMBIENT:number = 9;
		public static MATERIALDIFFUSE:number = 10;
		public static MATERIALSPECULAR:number = 11;
		public static MATERIALREFLECT:number = 12;
		public static UVMATRIX:number = 13;
		public static UVAGE:number = 14;
		public static TILINGOFFSET:number = 15;
		
		/**@private */
		public static shaderDefines:Laya.ShaderDefines = new Laya.ShaderDefines(Laya.BaseMaterial.shaderDefines);
		
		/**
		 * @private
		 */
		public static __init__():void {
			CustomMaterial2.SHADERDEFINE_DIFFUSEMAP = CustomMaterial2.shaderDefines.registerDefine("DIFFUSEMAP");
			CustomMaterial2.SHADERDEFINE_NORMALMAP = CustomMaterial2.shaderDefines.registerDefine("NORMALMAP");
			CustomMaterial2.SHADERDEFINE_SPECULARMAP = CustomMaterial2.shaderDefines.registerDefine("SPECULARMAP");
			CustomMaterial2.SHADERDEFINE_EMISSIVEMAP = CustomMaterial2.shaderDefines.registerDefine("EMISSIVEMAP");
			CustomMaterial2.SHADERDEFINE_AMBIENTMAP = CustomMaterial2.shaderDefines.registerDefine("AMBIENTMAP");
			CustomMaterial2.SHADERDEFINE_REFLECTMAP = CustomMaterial2.shaderDefines.registerDefine("REFLECTMAP");
			CustomMaterial2.SHADERDEFINE_UVTRANSFORM = CustomMaterial2.shaderDefines.registerDefine("UVTRANSFORM");
			CustomMaterial2.SHADERDEFINE_TILINGOFFSET = CustomMaterial2.shaderDefines.registerDefine("TILINGOFFSET");
			CustomMaterial2.SHADERDEFINE_ADDTIVEFOG = CustomMaterial2.shaderDefines.registerDefine("ADDTIVEFOG");
		}

        constructor() {
			super();
			this.setShaderName("SIMPLE");
			this._setColor(CustomMaterial2.MATERIALAMBIENT, new Laya.Vector3(0.6, 0.6, 0.6));
			this._setColor(CustomMaterial2.MATERIALDIFFUSE, new Laya.Vector3(1.0, 1.0, 1.0));
			this._setColor(CustomMaterial2.MATERIALSPECULAR, new Laya.Vector4(1.0, 1.0, 1.0, 8.0));
			this._setColor(CustomMaterial2.MATERIALREFLECT, new Laya.Vector3(1.0, 1.0, 1.0));
			this._setColor(CustomMaterial2.ALBEDO, new Laya.Vector4(1.0, 1.0, 1.0, 1.0));
			this._setNumber(CustomMaterial2.ALPHATESTVALUE, 0.5);
			this._setColor(CustomMaterial2.TILINGOFFSET, new Laya.Vector4(1.0, 1.0, 0.0, 0.0));
			this.renderMode = CustomMaterial2.RENDERMODE_OPAQUE;
		}
	
		/** @private */
		protected _transformUV:Laya.TransformUV = null;
		
		/**
		 * 设置渲染模式。
		 * @return 渲染模式。
		 */
		public set renderMode(value:number):void {
			switch (value) {
			case CustomMaterial2.RENDERMODE_OPAQUE: 
				this.renderQueue = Laya.RenderQueue.OPAQUE;
				this.depthWrite = true;
				this.cull = CustomMaterial2.CULL_BACK;
				this.blend = CustomMaterial2.BLEND_DISABLE;
				this.alphaTest = false;
				this._removeShaderDefine(CustomMaterial2.SHADERDEFINE_ADDTIVEFOG);
				break;
			
			default: 
				throw new Error("Material:renderMode value error.");
			}
			
			this._conchMaterial && this._conchMaterial.setRenderMode(value);//NATIVE
		}
		
		/**
		 * 获取纹理平铺和偏移。
		 * @return 纹理平铺和偏移。
		 */
		public get tilingOffset():Laya.Vector4 {
			return this._getColor(CustomMaterial2.TILINGOFFSET);
		}
		
		/**
		 * 获取纹理平铺和偏移。
		 * @param value 纹理平铺和偏移。
		 */
		public set tilingOffset(value:Laya.Vector4):void {
			if (value) {
				var valueE:Float32Array = value.elements;
				if (valueE[0] != 1 || valueE[1] != 1 || valueE[2] != 0 || valueE[3] != 0)
					this._addShaderDefine(CustomMaterial2.SHADERDEFINE_TILINGOFFSET);
				else
					this._removeShaderDefine(CustomMaterial2.SHADERDEFINE_TILINGOFFSET);
			} else {
				this._removeShaderDefine(CustomMaterial2.SHADERDEFINE_TILINGOFFSET);
			}
			this._setColor(CustomMaterial2.TILINGOFFSET, value);
		}
		
		public get ambientColor():Laya.Vector3 {
			return this._getColor(CustomMaterial2.MATERIALAMBIENT);
		}
		
		/**
		 * 设置环境光颜色。
		 * @param value 环境光颜色。
		 */
		public set ambientColor(value:Laya.Vector3):void {
			this._setColor(CustomMaterial2.MATERIALAMBIENT, value);
		}
		
		public get diffuseColor():Laya.Vector3 {
			return this._getColor(CustomMaterial2.MATERIALDIFFUSE);
		}
		
		/**
		 * 设置漫反射光颜色。
		 * @param value 漫反射光颜色。
		 */
		public set diffuseColor(value:Laya.Vector3):void {
			this._setColor(CustomMaterial2.MATERIALDIFFUSE, value);
		}
		
		public get specularColor():Laya.Vector4 {
			return this._getColor(CustomMaterial2.MATERIALSPECULAR);
		}
		
		/**
		 * 设置高光颜色。
		 * @param value 高光颜色。
		 */
		public set specularColor(value:Laya.Vector4):void {
			this._setColor(CustomMaterial2.MATERIALSPECULAR, value);
		}
		
		public get reflectColor():Laya.Vector3 {
			return this._getColor(CustomMaterial2.MATERIALREFLECT);
		}
		
		/**
		 * 设置反射颜色。
		 * @param value 反射颜色。
		 */
		public set reflectColor(value:Laya.Vector3):void {
			this._setColor(CustomMaterial2.MATERIALREFLECT, value);
		}
		
		public get albedoColor():Laya.Vector4 {
			return this._getColor(CustomMaterial2.ALBEDO);
		}
		
		/**
		 * 设置反射率。
		 * @param value 反射率。
		 */
		public set albedoColor(value:Laya.Vector4):void {
			this._setColor(CustomMaterial2.ALBEDO, value);
		}
		
		public get albedo():Laya.Vector4 {//兼容
			return this._getColor(CustomMaterial2.ALBEDO);
		}
		
		/**
		 * 设置反射率。
		 * @param value 反射率。
		 */
		public set albedo(value:Laya.Vector4):void {//兼容
			this._setColor(CustomMaterial2.ALBEDO, value);
		}
		
		/**
		 * 获取漫反射贴图。
		 * @return 漫反射贴图。
		 */
		public get diffuseTexture():Laya.BaseTexture {
			return this._getTexture(CustomMaterial2.DIFFUSETEXTURE);
		}
		
		/**
		 * 设置漫反射贴图。
		 * @param value 漫反射贴图。
		 */
		public set diffuseTexture(value:Laya.BaseTexture):void {
			if (value) {
				this._addShaderDefine(CustomMaterial2.SHADERDEFINE_DIFFUSEMAP);
			} else {
				this._removeShaderDefine(CustomMaterial2.SHADERDEFINE_DIFFUSEMAP);
			}
			this._setTexture(CustomMaterial2.DIFFUSETEXTURE, value);
		}
		
		/**
		 * 获取法线贴图。
		 * @return 法线贴图。
		 */
		public get normalTexture():Laya.BaseTexture {
			return this._getTexture(CustomMaterial2.NORMALTEXTURE);
		}
		
		/**
		 * 设置法线贴图。
		 * @param value 法线贴图。
		 */
		public set normalTexture(value:Laya.BaseTexture):void {
			if (value) {
				this._addShaderDefine(CustomMaterial2.SHADERDEFINE_NORMALMAP);
			} else {
				this._removeShaderDefine(CustomMaterial2.SHADERDEFINE_NORMALMAP);
			}
			this._setTexture(CustomMaterial2.NORMALTEXTURE, value);
		}
		
		/**
		 * 获取高光贴图。
		 * @return 高光贴图。
		 */
		public get specularTexture():Laya.BaseTexture {
			return this._getTexture(CustomMaterial2.SPECULARTEXTURE);
		}
		
		/**
		 * 设置高光贴图。
		 * @param value  高光贴图。
		 */
		public set specularTexture(value:Laya.BaseTexture):void {
			if (value) {
				this._addShaderDefine(CustomMaterial2.SHADERDEFINE_SPECULARMAP);
			} else {
				this._removeShaderDefine(CustomMaterial2.SHADERDEFINE_SPECULARMAP);
			}
			
			this._setTexture(CustomMaterial2.SPECULARTEXTURE, value);
		}
		
		/**
		 * 获取放射贴图。
		 * @return 放射贴图。
		 */
		public get emissiveTexture():Laya.BaseTexture {
			return this._getTexture(CustomMaterial2.EMISSIVETEXTURE);
		}
		
		/**
		 * 设置放射贴图。
		 * @param value 放射贴图。
		 */
		public set emissiveTexture(value:Laya.BaseTexture):void {
			if (value) {
				this._addShaderDefine(CustomMaterial2.SHADERDEFINE_EMISSIVEMAP);
			} else {
				this._removeShaderDefine(CustomMaterial2.SHADERDEFINE_EMISSIVEMAP);
			}
			this._setTexture(CustomMaterial2.EMISSIVETEXTURE, value);
		}
		
		/**
		 * 获取环境贴图。
		 * @return 环境贴图。
		 */
		public get ambientTexture():Laya.BaseTexture {
			return this._getTexture(CustomMaterial2.AMBIENTTEXTURE);
		}
		
		/**
		 * 设置环境贴图。
		 * @param  value 环境贴图。
		 */
		public set ambientTexture(value:Laya.BaseTexture):void {
			if (value) {
				this._addShaderDefine(CustomMaterial2.SHADERDEFINE_AMBIENTMAP);
			} else {
				this._removeShaderDefine(CustomMaterial2.SHADERDEFINE_AMBIENTMAP);
			}
			this._setTexture(CustomMaterial2.AMBIENTTEXTURE, value);
		}
		
		/**
		 * 获取反射贴图。
		 * @return 反射贴图。
		 */
		public get reflectTexture():Laya.BaseTexture {
			return this._getTexture(CustomMaterial2.REFLECTTEXTURE);
		}
		
		/**
		 * 设置反射贴图。
		 * @param value 反射贴图。
		 */
		public set reflectTexture(value:Laya.BaseTexture):void {
			if (value) {
				this._addShaderDefine(CustomMaterial2.SHADERDEFINE_REFLECTMAP);
			} else {
				this._removeShaderDefine(CustomMaterial2.SHADERDEFINE_REFLECTMAP);
			}
			this._setTexture(CustomMaterial2.REFLECTTEXTURE, value);
		}
		
		/**
		 * 获取UV变换。
		 * @return  UV变换。
		 */
		public get transformUV():Laya.TransformUV {
			return this._transformUV;
		}
		
		/**
		 * 设置UV变换。
		 * @param value UV变换。
		 */
		public set transformUV(value:Laya.TransformUV):void {
			this._transformUV = value;
			this._setMatrix4x4(CustomMaterial2.UVMATRIX, value.matrix);
			if (value)
				this._addShaderDefine(CustomMaterial2.SHADERDEFINE_UVTRANSFORM);
			else
				this._removeShaderDefine(CustomMaterial2.SHADERDEFINE_UVTRANSFORM);
			if (this._conchMaterial) {//NATIVE//TODO:可取消
				this._conchMaterial.setShaderValue(CustomMaterial2.UVMATRIX, value.matrix.elements, 0);
			}
		}
		
		/**
		 * @private
		 */
		public static _parseStandardMaterial(textureMap, material:CustomMaterial2, json):void {//兼容性函数
			var customProps = json.customProps;
			var ambientColorValue = customProps.ambientColor;
			material.ambientColor = new Laya.Vector3(ambientColorValue[0], ambientColorValue[1], ambientColorValue[2]);
			var diffuseColorValue = customProps.diffuseColor;
			material.diffuseColor = new Laya.Vector3(diffuseColorValue[0], diffuseColorValue[1], diffuseColorValue[2]);
			var specularColorValue = customProps.specularColor;
			material.specularColor = new Laya.Vector4(specularColorValue[0], specularColorValue[1], specularColorValue[2], specularColorValue[3]);
			var reflectColorValue = customProps.reflectColor;
			material.reflectColor = new Laya.Vector3(reflectColorValue[0], reflectColorValue[1], reflectColorValue[2]);
			var albedoColorValue = customProps.albedoColor;
			(albedoColorValue) && (material.albedo = new Laya.Vector4(albedoColorValue[0], albedoColorValue[1], albedoColorValue[2], albedoColorValue[3]));
			
			var diffuseTexture:string = customProps.diffuseTexture.texture2D;
			(diffuseTexture) && (material.diffuseTexture = Laya.Loader.getRes(textureMap[diffuseTexture]));
			
			var normalTexture:string = customProps.normalTexture.texture2D;
			(normalTexture) && (material.normalTexture = Laya.Loader.getRes(textureMap[normalTexture]));
			
			var specularTexture:string = customProps.specularTexture.texture2D;
			(specularTexture) && (material.specularTexture = Laya.Loader.getRes(textureMap[specularTexture]));
			
			var emissiveTexture:string = customProps.emissiveTexture.texture2D;
			(emissiveTexture) && (material.emissiveTexture = Laya.Loader.getRes(textureMap[emissiveTexture]));
			
			var ambientTexture:string = customProps.ambientTexture.texture2D;
			(ambientTexture) && (material.ambientTexture = Laya.Loader.getRes(textureMap[ambientTexture]));
			
			var reflectTexture:string = customProps.reflectTexture.texture2D;
			(reflectTexture) && (material.reflectTexture = Laya.Loader.getRes(textureMap[reflectTexture]));
		}
		
		/**
		 * 禁用灯光。
		 */
		public disableLight():void {
			this._addDisablePublicShaderDefine(Laya.ShaderCompile3D.SHADERDEFINE_POINTLIGHT | Laya.ShaderCompile3D.SHADERDEFINE_SPOTLIGHT | Laya.ShaderCompile3D.SHADERDEFINE_DIRECTIONLIGHT);
		}
		
		/**
		 * 禁用雾化。
		 */
		public disableFog():void {
			this._addDisablePublicShaderDefine(Laya.ShaderCompile3D.SHADERDEFINE_FOG);
		}
		
		/**
		 * @inheritDoc
		 */
		public onAsynLoaded(url:string, data, params):void {
			var jsonData = data[0];
			if (jsonData.version) {
				super.onAsynLoaded(url, data, params);
			} else {//兼容性代码
				var textureMap:Object = data[1];
				var props:Object = jsonData.props;
				for (var prop:string in props)
					this[prop] = props[prop];
				CustomMaterial2._parseStandardMaterial(textureMap, this, jsonData);
				
				this._endLoaded();
			}
		}
		
		/**
		 * @inheritDoc
		 */
		public cloneTo(destObject):void {
			super.cloneTo(destObject);
			var dest:CustomMaterial2 = destObject as CustomMaterial2;
			(this._transformUV) && (dest["_transformUV"] = this._transformUV.clone());
		}
	}
}