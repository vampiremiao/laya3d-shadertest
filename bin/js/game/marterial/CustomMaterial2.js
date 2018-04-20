/*
* name;
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CustomMaterial2 = (function (_super) {
    __extends(CustomMaterial2, _super);
    function CustomMaterial2() {
        var _this = _super.call(this) || this;
        /** @private */
        _this._transformUV = null;
        _this.setShaderName("SIMPLE");
        _this._setColor(CustomMaterial2.MATERIALAMBIENT, new Laya.Vector3(0.6, 0.6, 0.6));
        _this._setColor(CustomMaterial2.MATERIALDIFFUSE, new Laya.Vector3(1.0, 1.0, 1.0));
        _this._setColor(CustomMaterial2.MATERIALSPECULAR, new Laya.Vector4(1.0, 1.0, 1.0, 8.0));
        _this._setColor(CustomMaterial2.MATERIALREFLECT, new Laya.Vector3(1.0, 1.0, 1.0));
        _this._setColor(CustomMaterial2.ALBEDO, new Laya.Vector4(1.0, 1.0, 1.0, 1.0));
        _this._setNumber(CustomMaterial2.ALPHATESTVALUE, 0.5);
        _this._setColor(CustomMaterial2.TILINGOFFSET, new Laya.Vector4(1.0, 1.0, 0.0, 0.0));
        _this.renderMode = CustomMaterial2.RENDERMODE_OPAQUE;
        return _this;
    }
    /**
     * @private
     */
    CustomMaterial2.__init__ = function (shaderCompile) {
        this.shaderDefines = new Laya.ShaderDefines(Laya.BaseMaterial.shaderDefines);
        CustomMaterial2.SHADERDEFINE_DIFFUSEMAP = shaderCompile.registerMaterialDefine("DIFFUSEMAP");
        CustomMaterial2.SHADERDEFINE_NORMALMAP = shaderCompile.registerMaterialDefine("NORMALMAP");
        CustomMaterial2.SHADERDEFINE_SPECULARMAP = shaderCompile.registerMaterialDefine("SPECULARMAP");
        CustomMaterial2.SHADERDEFINE_EMISSIVEMAP = shaderCompile.registerMaterialDefine("EMISSIVEMAP");
        CustomMaterial2.SHADERDEFINE_AMBIENTMAP = shaderCompile.registerMaterialDefine("AMBIENTMAP");
        CustomMaterial2.SHADERDEFINE_REFLECTMAP = shaderCompile.registerMaterialDefine("REFLECTMAP");
        CustomMaterial2.SHADERDEFINE_UVTRANSFORM = shaderCompile.registerMaterialDefine("UVTRANSFORM");
        CustomMaterial2.SHADERDEFINE_TILINGOFFSET = shaderCompile.registerMaterialDefine("TILINGOFFSET");
        CustomMaterial2.SHADERDEFINE_ADDTIVEFOG = shaderCompile.registerMaterialDefine("ADDTIVEFOG");
    };
    Object.defineProperty(CustomMaterial2.prototype, "renderMode", {
        /**
         * 设置渲染模式。
         * @return 渲染模式。
         */
        set: function (value) {
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
            this._conchMaterial && this._conchMaterial.setRenderMode(value); //NATIVE
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomMaterial2.prototype, "tilingOffset", {
        /**
         * 获取纹理平铺和偏移。
         * @return 纹理平铺和偏移。
         */
        get: function () {
            return this._getColor(CustomMaterial2.TILINGOFFSET);
        },
        /**
         * 获取纹理平铺和偏移。
         * @param value 纹理平铺和偏移。
         */
        set: function (value) {
            if (value) {
                var valueE = value.elements;
                if (valueE[0] != 1 || valueE[1] != 1 || valueE[2] != 0 || valueE[3] != 0)
                    this._addShaderDefine(CustomMaterial2.SHADERDEFINE_TILINGOFFSET);
                else
                    this._removeShaderDefine(CustomMaterial2.SHADERDEFINE_TILINGOFFSET);
            }
            else {
                this._removeShaderDefine(CustomMaterial2.SHADERDEFINE_TILINGOFFSET);
            }
            this._setColor(CustomMaterial2.TILINGOFFSET, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomMaterial2.prototype, "ambientColor", {
        get: function () {
            return this._getColor(CustomMaterial2.MATERIALAMBIENT);
        },
        /**
         * 设置环境光颜色。
         * @param value 环境光颜色。
         */
        set: function (value) {
            this._setColor(CustomMaterial2.MATERIALAMBIENT, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomMaterial2.prototype, "diffuseColor", {
        get: function () {
            return this._getColor(CustomMaterial2.MATERIALDIFFUSE);
        },
        /**
         * 设置漫反射光颜色。
         * @param value 漫反射光颜色。
         */
        set: function (value) {
            this._setColor(CustomMaterial2.MATERIALDIFFUSE, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomMaterial2.prototype, "specularColor", {
        get: function () {
            return this._getColor(CustomMaterial2.MATERIALSPECULAR);
        },
        /**
         * 设置高光颜色。
         * @param value 高光颜色。
         */
        set: function (value) {
            this._setColor(CustomMaterial2.MATERIALSPECULAR, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomMaterial2.prototype, "reflectColor", {
        get: function () {
            return this._getColor(CustomMaterial2.MATERIALREFLECT);
        },
        /**
         * 设置反射颜色。
         * @param value 反射颜色。
         */
        set: function (value) {
            this._setColor(CustomMaterial2.MATERIALREFLECT, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomMaterial2.prototype, "albedoColor", {
        get: function () {
            return this._getColor(CustomMaterial2.ALBEDO);
        },
        /**
         * 设置反射率。
         * @param value 反射率。
         */
        set: function (value) {
            this._setColor(CustomMaterial2.ALBEDO, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomMaterial2.prototype, "albedo", {
        get: function () {
            return this._getColor(CustomMaterial2.ALBEDO);
        },
        /**
         * 设置反射率。
         * @param value 反射率。
         */
        set: function (value) {
            this._setColor(CustomMaterial2.ALBEDO, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomMaterial2.prototype, "diffuseTexture", {
        /**
         * 获取漫反射贴图。
         * @return 漫反射贴图。
         */
        get: function () {
            return this._getTexture(CustomMaterial2.DIFFUSETEXTURE);
        },
        /**
         * 设置漫反射贴图。
         * @param value 漫反射贴图。
         */
        set: function (value) {
            if (value) {
                this._addShaderDefine(CustomMaterial2.SHADERDEFINE_DIFFUSEMAP);
            }
            else {
                this._removeShaderDefine(CustomMaterial2.SHADERDEFINE_DIFFUSEMAP);
            }
            this._setTexture(CustomMaterial2.DIFFUSETEXTURE, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomMaterial2.prototype, "normalTexture", {
        /**
         * 获取法线贴图。
         * @return 法线贴图。
         */
        get: function () {
            return this._getTexture(CustomMaterial2.NORMALTEXTURE);
        },
        /**
         * 设置法线贴图。
         * @param value 法线贴图。
         */
        set: function (value) {
            if (value) {
                this._addShaderDefine(CustomMaterial2.SHADERDEFINE_NORMALMAP);
            }
            else {
                this._removeShaderDefine(CustomMaterial2.SHADERDEFINE_NORMALMAP);
            }
            this._setTexture(CustomMaterial2.NORMALTEXTURE, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomMaterial2.prototype, "specularTexture", {
        /**
         * 获取高光贴图。
         * @return 高光贴图。
         */
        get: function () {
            return this._getTexture(CustomMaterial2.SPECULARTEXTURE);
        },
        /**
         * 设置高光贴图。
         * @param value  高光贴图。
         */
        set: function (value) {
            if (value) {
                this._addShaderDefine(CustomMaterial2.SHADERDEFINE_SPECULARMAP);
            }
            else {
                this._removeShaderDefine(CustomMaterial2.SHADERDEFINE_SPECULARMAP);
            }
            this._setTexture(CustomMaterial2.SPECULARTEXTURE, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomMaterial2.prototype, "emissiveTexture", {
        /**
         * 获取放射贴图。
         * @return 放射贴图。
         */
        get: function () {
            return this._getTexture(CustomMaterial2.EMISSIVETEXTURE);
        },
        /**
         * 设置放射贴图。
         * @param value 放射贴图。
         */
        set: function (value) {
            if (value) {
                this._addShaderDefine(CustomMaterial2.SHADERDEFINE_EMISSIVEMAP);
            }
            else {
                this._removeShaderDefine(CustomMaterial2.SHADERDEFINE_EMISSIVEMAP);
            }
            this._setTexture(CustomMaterial2.EMISSIVETEXTURE, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomMaterial2.prototype, "ambientTexture", {
        /**
         * 获取环境贴图。
         * @return 环境贴图。
         */
        get: function () {
            return this._getTexture(CustomMaterial2.AMBIENTTEXTURE);
        },
        /**
         * 设置环境贴图。
         * @param  value 环境贴图。
         */
        set: function (value) {
            if (value) {
                this._addShaderDefine(CustomMaterial2.SHADERDEFINE_AMBIENTMAP);
            }
            else {
                this._removeShaderDefine(CustomMaterial2.SHADERDEFINE_AMBIENTMAP);
            }
            this._setTexture(CustomMaterial2.AMBIENTTEXTURE, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomMaterial2.prototype, "reflectTexture", {
        /**
         * 获取反射贴图。
         * @return 反射贴图。
         */
        get: function () {
            return this._getTexture(CustomMaterial2.REFLECTTEXTURE);
        },
        /**
         * 设置反射贴图。
         * @param value 反射贴图。
         */
        set: function (value) {
            if (value) {
                this._addShaderDefine(CustomMaterial2.SHADERDEFINE_REFLECTMAP);
            }
            else {
                this._removeShaderDefine(CustomMaterial2.SHADERDEFINE_REFLECTMAP);
            }
            this._setTexture(CustomMaterial2.REFLECTTEXTURE, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomMaterial2.prototype, "transformUV", {
        /**
         * 获取UV变换。
         * @return  UV变换。
         */
        get: function () {
            return this._transformUV;
        },
        /**
         * 设置UV变换。
         * @param value UV变换。
         */
        set: function (value) {
            this._transformUV = value;
            this._setMatrix4x4(CustomMaterial2.UVMATRIX, value.matrix);
            if (value)
                this._addShaderDefine(CustomMaterial2.SHADERDEFINE_UVTRANSFORM);
            else
                this._removeShaderDefine(CustomMaterial2.SHADERDEFINE_UVTRANSFORM);
            if (this._conchMaterial) {
                this._conchMaterial.setShaderValue(CustomMaterial2.UVMATRIX, value.matrix.elements, 0);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    CustomMaterial2._parseStandardMaterial = function (textureMap, material, json) {
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
        var diffuseTexture = customProps.diffuseTexture.texture2D;
        (diffuseTexture) && (material.diffuseTexture = Laya.Loader.getRes(textureMap[diffuseTexture]));
        var normalTexture = customProps.normalTexture.texture2D;
        (normalTexture) && (material.normalTexture = Laya.Loader.getRes(textureMap[normalTexture]));
        var specularTexture = customProps.specularTexture.texture2D;
        (specularTexture) && (material.specularTexture = Laya.Loader.getRes(textureMap[specularTexture]));
        var emissiveTexture = customProps.emissiveTexture.texture2D;
        (emissiveTexture) && (material.emissiveTexture = Laya.Loader.getRes(textureMap[emissiveTexture]));
        var ambientTexture = customProps.ambientTexture.texture2D;
        (ambientTexture) && (material.ambientTexture = Laya.Loader.getRes(textureMap[ambientTexture]));
        var reflectTexture = customProps.reflectTexture.texture2D;
        (reflectTexture) && (material.reflectTexture = Laya.Loader.getRes(textureMap[reflectTexture]));
    };
    /**
     * 禁用灯光。
     */
    CustomMaterial2.prototype.disableLight = function () {
        this._addDisablePublicShaderDefine(Laya.ShaderCompile3D.SHADERDEFINE_POINTLIGHT | Laya.ShaderCompile3D.SHADERDEFINE_SPOTLIGHT | Laya.ShaderCompile3D.SHADERDEFINE_DIRECTIONLIGHT);
    };
    /**
     * 禁用雾化。
     */
    CustomMaterial2.prototype.disableFog = function () {
        this._addDisablePublicShaderDefine(Laya.ShaderCompile3D.SHADERDEFINE_FOG);
    };
    /**
     * @inheritDoc
     */
    CustomMaterial2.prototype.onAsynLoaded = function (url, data, params) {
        var jsonData = data[0];
        if (jsonData.version) {
            _super.prototype.onAsynLoaded.call(this, url, data, params);
        }
        else {
            var textureMap = data[1];
            var props = jsonData.props;
            for (var prop in props)
                this[prop] = props[prop];
            CustomMaterial2._parseStandardMaterial(textureMap, this, jsonData);
            this._endLoaded();
        }
    };
    /**
     * @inheritDoc
     */
    CustomMaterial2.prototype.cloneTo = function (destObject) {
        _super.prototype.cloneTo.call(this, destObject);
        var dest = destObject;
        (this._transformUV) && (dest["_transformUV"] = this._transformUV.clone());
    };
    /**渲染状态_不透明。*/
    CustomMaterial2.RENDERMODE_OPAQUE = 1;
    /**渲染状态_不透明_双面。*/
    CustomMaterial2.RENDERMODE_OPAQUEDOUBLEFACE = 2;
    /**渲染状态_透明测试。*/
    CustomMaterial2.RENDERMODE_CUTOUT = 3;
    /**渲染状态_透明测试_双面。*/
    CustomMaterial2.RENDERMODE_CUTOUTDOUBLEFACE = 4;
    /**渲染状态_透明混合。*/
    CustomMaterial2.RENDERMODE_TRANSPARENT = 13;
    /**渲染状态_透明混合_双面。*/
    CustomMaterial2.RENDERMODE_TRANSPARENTDOUBLEFACE = 14;
    /**渲染状态_加色法混合。*/
    CustomMaterial2.RENDERMODE_ADDTIVE = 15;
    /**渲染状态_加色法混合_双面。*/
    CustomMaterial2.RENDERMODE_ADDTIVEDOUBLEFACE = 16;
    /**渲染状态_只读深度_透明混合。*/
    CustomMaterial2.RENDERMODE_DEPTHREAD_TRANSPARENT = 5;
    /**渲染状态_只读深度_透明混合_双面。*/
    CustomMaterial2.RENDERMODE_DEPTHREAD_TRANSPARENTDOUBLEFACE = 6;
    /**渲染状态_只读深度_加色法混合。*/
    CustomMaterial2.RENDERMODE_DEPTHREAD_ADDTIVE = 7;
    /**渲染状态_只读深度_加色法混合_双面。*/
    CustomMaterial2.RENDERMODE_DEPTHREAD_ADDTIVEDOUBLEFACE = 8;
    /**渲染状态_无深度_透明混合。*/
    CustomMaterial2.RENDERMODE_NONDEPTH_TRANSPARENT = 9;
    /**渲染状态_无深度_透明混合_双面。*/
    CustomMaterial2.RENDERMODE_NONDEPTH_TRANSPARENTDOUBLEFACE = 10;
    /**渲染状态_无深度_加色法混合。*/
    CustomMaterial2.RENDERMODE_NONDEPTH_ADDTIVE = 11;
    /**渲染状态_无深度_加色法混合_双面。*/
    CustomMaterial2.RENDERMODE_NONDEPTH_ADDTIVEDOUBLEFACE = 12;
    CustomMaterial2.DIFFUSETEXTURE = 1;
    CustomMaterial2.NORMALTEXTURE = 2;
    CustomMaterial2.SPECULARTEXTURE = 3;
    CustomMaterial2.EMISSIVETEXTURE = 4;
    CustomMaterial2.AMBIENTTEXTURE = 5;
    CustomMaterial2.REFLECTTEXTURE = 6;
    CustomMaterial2.ALBEDO = 7;
    CustomMaterial2.UVANIAGE = 8;
    CustomMaterial2.MATERIALAMBIENT = 9;
    CustomMaterial2.MATERIALDIFFUSE = 10;
    CustomMaterial2.MATERIALSPECULAR = 11;
    CustomMaterial2.MATERIALREFLECT = 12;
    CustomMaterial2.UVMATRIX = 13;
    CustomMaterial2.UVAGE = 14;
    CustomMaterial2.TILINGOFFSET = 15;
    return CustomMaterial2;
}(Laya.BaseMaterial));
//# sourceMappingURL=CustomMaterial2.js.map