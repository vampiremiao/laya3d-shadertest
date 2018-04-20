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
/*
* name;
*/
var CustomMaterial = (function (_super) {
    __extends(CustomMaterial, _super);
    function CustomMaterial() {
        var _this = _super.call(this) || this;
        _this.setShaderName("CustomShader");
        // this._setBuffer(CustomMaterial.FlashFactor,new Float32Array([0, 1, 0.5, 0.5]));
        _this._setBuffer(CustomMaterial.FlashFactor, new Float32Array([0.5, 1, 0.5, 0.5]));
        return _this;
        // this._setColor(CustomMaterial.ALBEDOCOLOR, new Laya.Vector4(1.0, 1.0, 1.0, 1.0));
        // this._setColor(CustomMaterial.MATERIALSPECULAR, new Laya.Vector3(1.0, 1.0, 1.0));
        // this._setNumber(CustomMaterial.SHININESS, 0.078125);
        // this._setColor(CustomMaterial.MATERIALREFLECT, new Laya.Vector3(1.0, 1.0, 1.0));
        // this._setNumber(CustomMaterial.ALPHATESTVALUE, 0.5);
        // this._setColor(CustomMaterial.TILINGOFFSET, new Laya.Vector4(1.0, 1.0, 0.0, 0.0));
        // this._removeDisablePublicShaderDefine(Laya.ShaderCompile3D.SHADERDEFINE_POINTLIGHT | Laya.ShaderCompile3D.SHADERDEFINE_SPOTLIGHT | Laya.ShaderCompile3D.SHADERDEFINE_DIRECTIONLIGHT);
    }
    Object.defineProperty(CustomMaterial.prototype, "diffuseTexture", {
        get: function () {
            return this._getTexture(CustomMaterial.DIFFUSETEXTURE);
        },
        set: function (value) {
            // if (value)
            // 		this._addShaderDefine(CustomMaterial.DIFFUSETEXTURE);
            // 	else
            // 		this._removeShaderDefine(CustomMaterial.DIFFUSETEXTURE);
            this._setTexture(CustomMaterial.DIFFUSETEXTURE, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomMaterial.prototype, "flashTexture", {
        get: function () {
            return this._getTexture(CustomMaterial.FLASHTEXTURE);
        },
        set: function (value) {
            this._setTexture(CustomMaterial.FLASHTEXTURE, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomMaterial.prototype, "curTime", {
        get: function () {
            return this._getNumber(CustomMaterial.CURTIME);
        },
        set: function (value) {
            this._setNumber(CustomMaterial.CURTIME, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomMaterial.prototype, "marginalColor", {
        set: function (value) {
            this._setColor(CustomMaterial.MARGINALCOLOR, value);
        },
        enumerable: true,
        configurable: true
    });
    CustomMaterial.ALBEDOTEXTURE = 1;
    CustomMaterial.NORMALTEXTURE = 2;
    CustomMaterial.SPECULARTEXTURE = 3;
    CustomMaterial.EMISSIVETEXTURE = 4;
    CustomMaterial.REFLECTTEXTURE = 5;
    CustomMaterial.ALBEDOCOLOR = 6;
    CustomMaterial.MATERIALSPECULAR = 8;
    CustomMaterial.SHININESS = 9;
    CustomMaterial.MATERIALREFLECT = 10;
    CustomMaterial.TILINGOFFSET = 11;
    CustomMaterial.DIFFUSETEXTURE = 1;
    CustomMaterial.MARGINALCOLOR = 2;
    CustomMaterial.CURTIME = 10;
    CustomMaterial.FLASHTEXTURE = 11;
    CustomMaterial.FlashFactor = 12;
    return CustomMaterial;
}(Laya.BaseMaterial));
//# sourceMappingURL=CustomMaterial.js.map