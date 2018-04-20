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
        SceneManager.prototype.updateTime = function () {
            if (this.customMaterial1) {
                this.customMaterial1.curTime = Laya.timer.currFrame;
            }
        };
        SceneManager.prototype.sceneLoaded = function () {
            this.terrain = this.scene.getChildAt(0);
            //添加照相机channel
            this.camera = (this.scene.addChild(new Laya.Camera(0, 0.3, 1000)));
            this.camera.transform.translate(new Laya.Vector3(-11.54094, 4.062168, 15.4548));
            // camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
            this.camera.transform.rotation = new Laya.Quaternion(0.08217335, -0.8517019, -0.1405077, -0.4981055);
            //this.camera.clearColor = new Laya.Vector4(0.1921569,0.3019608,0.4745098,0);
            this.camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
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
            var skyBox = new Laya.SkyBox();
            this.camera.sky = skyBox;
            skyBox.textureCube = Laya.TextureCube.load("res/fbx/LayaScene_testLaya/Assets/TinyTerrain/Standard Assets/Skyboxes/Skybox.ltc");
            Laya.loader.create("res/fbx/LayaScene_testLaya/testLaya.lh", Laya.Handler.create(this, this.onModelOk), null, Laya.Sprite3D);
        };
        SceneManager.prototype.stopMove = function () {
            this.ani.play("WK_heavy_infantry_05_combat_idle");
        };
        SceneManager.prototype.move = function () {
            this.ani.play("WK_heavy_infantry_04_charge");
        };
        SceneManager.prototype.onModelOk = function () {
            this.initShader();
            this.initShader2();
            //添加蒙皮动画角色模型
            var role3D = Laya.loader.getRes("res/fbx/LayaScene_testLaya/testLaya.lh").getChildAt(0);
            this.role3d = role3D;
            // role3D.transform.rotate(new laya.d3.math.Vector3(0,90,0),true,false);
            //加载到场景
            this.scene.addChild(role3D);
            this.ani = role3D.getComponentByType(Laya.Animator);
            game.EntityManager.Instance.role3D = role3D;
            // this.ani.play("WK_heavy_infantry_04_charge");
            this.customMaterial1 = new CustomMaterial();
            var customMaterial1 = this.customMaterial1;
            customMaterial1.diffuseTexture = Laya.Texture2D.load("res/fbx/LayaScene_testLaya/Assets/Toon_RTS_demo/models/Materials/DemoTexture.png");
            customMaterial1.flashTexture = Laya.Texture2D.load("res/fbx/LayaScene_testLaya/Assets/Toon_RTS_demo/models/Materials/FlashTexture.png");
            // customMaterial1.marginalColor = new Laya.Vector3(1, 0.7, 1);
            role3D.getChildAt(0).skinnedMeshRender.castShadow = true;
            // var baseMaterials: Array<Laya.BaseMaterial> = new Array<Laya.BaseMaterial>();
            // baseMaterials.push(this.customMaterial1);
            // (role3D.getChildAt(0) as Laya.SkinnedMeshSprite3D).skinnedMeshRender.sharedMaterial = Laya.StandardMaterial.load("res/fbx/LayaScene_testLaya/Assets/Toon_RTS_demo/models/Materials/DemoTexture.lmat");
            // (role3D.getChildAt(0) as Laya.SkinnedMeshSprite3D).skinnedMeshRender.sharedMaterial = Laya.StandardMaterial.defaultMaterial;
            role3D.getChildAt(0).skinnedMeshRender.sharedMaterial = customMaterial1;
            for (var index = 0; index < 100; index++) {
                var role3d2 = Laya.Sprite3D.instantiate(role3D);
                this.scene.addChild(role3d2);
                role3d2.transform.translate(new Laya.Vector3(Math.random() * -25 + 25, 0, Math.random() * -25 + 25));
            }
            role3D.addComponent(game.RoleScript);
            this.camera.addComponent(game.CameraFollowScript);
            this.camera.transform.position = new Laya.Vector3(role3D.transform.position.x, role3D.transform.position.y + 5, role3D.transform.position.z - 10);
            // camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
            this.camera.transform.lookAt(role3D.transform.position, new laya.d3.math.Vector3(0, 1, 0));
        };
        SceneManager.prototype.initShader = function () {
            var attributeMap = {
                'a_BoneIndices': Laya.VertexElementUsage.BLENDINDICES0,
                'a_BoneWeights': Laya.VertexElementUsage.BLENDWEIGHT0,
                'a_Position': Laya.VertexElementUsage.POSITION0,
                'a_Normal': Laya.VertexElementUsage.NORMAL0,
                'a_Texcoord': Laya.VertexElementUsage.TEXTURECOORDINATE0
            };
            var uniformMap = {
                'u_Bones': [Laya.SkinnedMeshSprite3D.BONES, Laya.Shader3D.PERIOD_RENDERELEMENT],
                'u_CameraPos': [Laya.BaseCamera.CAMERAPOS, Laya.Shader3D.PERIOD_CAMERA],
                'u_MvpMatrix': [Laya.Sprite3D.MVPMATRIX, Laya.Shader3D.PERIOD_SPRITE],
                'u_WorldMat': [Laya.Sprite3D.WORLDMATRIX, Laya.Shader3D.PERIOD_SPRITE],
                'u_texture': [CustomMaterial.DIFFUSETEXTURE, Laya.Shader3D.PERIOD_MATERIAL],
                'u_flaTexture': [CustomMaterial.FLASHTEXTURE, Laya.Shader3D.PERIOD_MATERIAL],
                'u_marginalColor': [CustomMaterial.MARGINALCOLOR, Laya.Shader3D.PERIOD_MATERIAL],
                'u_DirectionLight.Direction': [Laya.Scene.LIGHTDIRECTION, Laya.Shader3D.PERIOD_SCENE],
                'u_DirectionLight.Diffuse': [Laya.Scene.LIGHTDIRCOLOR, Laya.Shader3D.PERIOD_SCENE],
                'u_CurTime': [CustomMaterial.CURTIME, Laya.Shader3D.PERIOD_MATERIAL],
                'u_FlashFactor': [CustomMaterial.FlashFactor, Laya.Shader3D.PERIOD_MATERIAL]
            };
            var customShader = Laya.Shader3D.nameKey.add("CustomShader");
            var vs = "attribute vec4 a_Position;\n" +
                "attribute vec2 a_Texcoord;\n" +
                "attribute vec3 a_Normal;\n" +
                "uniform mat4 u_MvpMatrix;\n" +
                "uniform mat4 u_WorldMat;\n" +
                "varying vec2 v_Texcoord;\n" +
                "varying vec3 v_Normal;\n" +
                "#ifdef BONE\n" +
                "attribute vec4 a_BoneIndices;\n" +
                "attribute vec4 a_BoneWeights;\n" +
                "const int c_MaxBoneCount = 24;\n" +
                "uniform mat4 u_Bones[c_MaxBoneCount];\n" +
                "#endif\n" +
                "#if defined(DIRECTIONLIGHT)\n" +
                "varying vec3 v_PositionWorld;\n" +
                "#endif\n" +
                "void main(){\n" +
                "#ifdef BONE\n" +
                "mat4 skinTransform=mat4(0.0);\n" +
                "skinTransform += u_Bones[int(a_BoneIndices.x)] * a_BoneWeights.x;\n" +
                "skinTransform += u_Bones[int(a_BoneIndices.y)] * a_BoneWeights.y;\n" +
                "skinTransform += u_Bones[int(a_BoneIndices.z)] * a_BoneWeights.z;\n" +
                "skinTransform += u_Bones[int(a_BoneIndices.w)] * a_BoneWeights.w;\n" +
                "vec4 position = skinTransform * a_Position;\n" +
                "gl_Position=u_MvpMatrix * position;\n" +
                "mat3 worldMat=mat3(u_WorldMat * skinTransform);\n" +
                "#else\n" +
                "gl_Position=u_MvpMatrix * a_Position;\n" +
                "mat3 worldMat=mat3(u_WorldMat);\n" +
                "#endif\n" +
                "v_Texcoord=a_Texcoord;\n" +
                "v_Normal=worldMat*a_Normal;\n" +
                "#if defined(DIRECTIONLIGHT)\n" +
                "#ifdef BONE\n" +
                "v_PositionWorld=(u_WorldMat*position).xyz;\n" +
                "#else\n" +
                "v_PositionWorld=(u_WorldMat*a_Position).xyz;\n" +
                "#endif\n" +
                "#endif\n" +
                "}";
            var ps = "#ifdef FSHIGHPRECISION\n" +
                "precision highp float;\n" +
                "#else\n" +
                "precision mediump float;\n" +
                "#endif\n" +
                "#include 'LightHelper.glsl';\n" +
                "varying vec2 v_Texcoord;\n" +
                "uniform sampler2D u_texture;\n" +
                "uniform sampler2D u_flaTexture;\n" +
                "uniform float u_CurTime;\n" +
                "uniform vec4 u_FlashFactor;\n" +
                "uniform vec3 u_marginalColor;\n" +
                "varying vec3 v_Normal;\n" +
                "#if defined(DIRECTIONLIGHT)\n" +
                "uniform vec3 u_CameraPos;\n" +
                "varying vec3 v_PositionWorld;\n" +
                "uniform DirectionLight u_DirectionLight;\n" +
                "#endif\n" +
                "void main(){\n" +
                "vec2 flashuv = v_Texcoord.xy * u_FlashFactor.zw + u_FlashFactor.xy * u_CurTime * 0.002;\n" +
                // "flashuv.x = 0.5;\n" +
                "vec4 flash=texture2D(u_flaTexture,flashuv);\n" +
                "flash.rgb=flash.rgb * flash.a;\n" +
                "gl_FragColor=texture2D(u_texture,v_Texcoord) + flash;\n" +
                // "vec3 normal=normalize(v_Normal);\n" +
                // "vec3 toEyeDir = normalize(u_CameraPos-v_PositionWorld);\n" +
                // "float Rim = 1.0 - max(0.0,dot(toEyeDir, normal));\n" +
                // "vec3 Emissive = 2.0 * u_DirectionLight.Diffuse * u_marginalColor * pow(Rim,3.0);\n" +
                // "gl_FragColor = texture2D(u_texture, v_Texcoord) + vec4(Emissive,1.0);\n" +
                "}";
            Laya.ShaderCompile3D.add(customShader, vs, ps, attributeMap, uniformMap);
        };
        SceneManager.prototype.initShader2 = function () {
            var attributeMap = {
                'a_Position': /*laya.d3.graphics.VertexElementUsage.POSITION0*/ 0,
                'a_Color': /*laya.d3.graphics.VertexElementUsage.COLOR0*/ 1,
                'a_Normal': /*laya.d3.graphics.VertexElementUsage.NORMAL0*/ 3,
                'a_Texcoord0': /*laya.d3.graphics.VertexElementUsage.TEXTURECOORDINATE0*/ 2,
                'a_Texcoord1': /*laya.d3.graphics.VertexElementUsage.TEXTURECOORDINATE1*/ 15,
                'a_BoneWeights': /*laya.d3.graphics.VertexElementUsage.BLENDWEIGHT0*/ 7,
                'a_BoneIndices': /*laya.d3.graphics.VertexElementUsage.BLENDINDICES0*/ 6,
                'a_Tangent0': /*laya.d3.graphics.VertexElementUsage.TANGENT0*/ 5
            };
            var uniformMap = {
                'u_Bones': [/*laya.d3.core.SkinnedMeshSprite3D.BONES*/ 0, /*laya.d3.shader.Shader3D.PERIOD_RENDERELEMENT*/ 0],
                'u_DiffuseTexture': [/*laya.d3.core.material.BlinnPhongMaterial.ALBEDOTEXTURE*/ 1, /*laya.d3.shader.Shader3D.PERIOD_MATERIAL*/ 1],
                'u_SpecularTexture': [/*laya.d3.core.material.BlinnPhongMaterial.SPECULARTEXTURE*/ 3, /*laya.d3.shader.Shader3D.PERIOD_MATERIAL*/ 1],
                'u_NormalTexture': [/*laya.d3.core.material.BlinnPhongMaterial.NORMALTEXTURE*/ 2, /*laya.d3.shader.Shader3D.PERIOD_MATERIAL*/ 1],
                'u_ReflectTexture': [/*laya.d3.core.material.BlinnPhongMaterial.REFLECTTEXTURE*/ 5, /*laya.d3.shader.Shader3D.PERIOD_MATERIAL*/ 1],
                'u_AlphaTestValue': [/*laya.d3.core.material.BaseMaterial.ALPHATESTVALUE*/ 0, /*laya.d3.shader.Shader3D.PERIOD_MATERIAL*/ 1],
                'u_DiffuseColor': [/*laya.d3.core.material.BlinnPhongMaterial.ALBEDOCOLOR*/ 6, /*laya.d3.shader.Shader3D.PERIOD_MATERIAL*/ 1],
                'u_MaterialSpecular': [/*laya.d3.core.material.BlinnPhongMaterial.MATERIALSPECULAR*/ 8, /*laya.d3.shader.Shader3D.PERIOD_MATERIAL*/ 1],
                'u_Shininess': [/*laya.d3.core.material.BlinnPhongMaterial.SHININESS*/ 9, /*laya.d3.shader.Shader3D.PERIOD_MATERIAL*/ 1],
                'u_MaterialReflect': [/*laya.d3.core.material.BlinnPhongMaterial.MATERIALREFLECT*/ 10, /*laya.d3.shader.Shader3D.PERIOD_MATERIAL*/ 1],
                'u_TilingOffset': [/*laya.d3.core.material.BlinnPhongMaterial.TILINGOFFSET*/ 11, /*laya.d3.shader.Shader3D.PERIOD_MATERIAL*/ 1],
                'u_WorldMat': [/*laya.d3.core.Sprite3D.WORLDMATRIX*/ 0, /*laya.d3.shader.Shader3D.PERIOD_SPRITE*/ 2],
                'u_MvpMatrix': [/*laya.d3.core.Sprite3D.MVPMATRIX*/ 1, /*laya.d3.shader.Shader3D.PERIOD_SPRITE*/ 2],
                'u_LightmapScaleOffset': [/*laya.d3.core.RenderableSprite3D.LIGHTMAPSCALEOFFSET*/ 2, /*laya.d3.shader.Shader3D.PERIOD_SPRITE*/ 2],
                'u_LightMap': [/*laya.d3.core.RenderableSprite3D.LIGHTMAP*/ 3, /*laya.d3.shader.Shader3D.PERIOD_SPRITE*/ 2],
                'u_CameraPos': [/*laya.d3.core.BaseCamera.CAMERAPOS*/ 0, /*laya.d3.shader.Shader3D.PERIOD_CAMERA*/ 3],
                'u_FogStart': [/*laya.d3.core.scene.Scene.FOGSTART*/ 1, /*laya.d3.shader.Shader3D.PERIOD_SCENE*/ 4],
                'u_FogRange': [/*laya.d3.core.scene.Scene.FOGRANGE*/ 2, /*laya.d3.shader.Shader3D.PERIOD_SCENE*/ 4],
                'u_FogColor': [/*laya.d3.core.scene.Scene.FOGCOLOR*/ 0, /*laya.d3.shader.Shader3D.PERIOD_SCENE*/ 4],
                'u_DirectionLight.Color': [/*laya.d3.core.scene.Scene.LIGHTDIRCOLOR*/ 4, /*laya.d3.shader.Shader3D.PERIOD_SCENE*/ 4],
                'u_DirectionLight.Direction': [/*laya.d3.core.scene.Scene.LIGHTDIRECTION*/ 3, /*laya.d3.shader.Shader3D.PERIOD_SCENE*/ 4],
                'u_PointLight.Position': [/*laya.d3.core.scene.Scene.POINTLIGHTPOS*/ 5, /*laya.d3.shader.Shader3D.PERIOD_SCENE*/ 4],
                'u_PointLight.Range': [/*laya.d3.core.scene.Scene.POINTLIGHTRANGE*/ 6, /*laya.d3.shader.Shader3D.PERIOD_SCENE*/ 4],
                'u_PointLight.Color': [/*laya.d3.core.scene.Scene.POINTLIGHTCOLOR*/ 8, /*laya.d3.shader.Shader3D.PERIOD_SCENE*/ 4],
                'u_SpotLight.Position': [/*laya.d3.core.scene.Scene.SPOTLIGHTPOS*/ 9, /*laya.d3.shader.Shader3D.PERIOD_SCENE*/ 4],
                'u_SpotLight.Direction': [/*laya.d3.core.scene.Scene.SPOTLIGHTDIRECTION*/ 10, /*laya.d3.shader.Shader3D.PERIOD_SCENE*/ 4],
                'u_SpotLight.Range': [/*laya.d3.core.scene.Scene.SPOTLIGHTRANGE*/ 12, /*laya.d3.shader.Shader3D.PERIOD_SCENE*/ 4],
                'u_SpotLight.Spot': [/*laya.d3.core.scene.Scene.SPOTLIGHTSPOT*/ 11, /*laya.d3.shader.Shader3D.PERIOD_SCENE*/ 4],
                'u_SpotLight.Color': [/*laya.d3.core.scene.Scene.SPOTLIGHTCOLOR*/ 14, /*laya.d3.shader.Shader3D.PERIOD_SCENE*/ 4],
                'u_AmbientColor': [/*laya.d3.core.scene.Scene.AMBIENTCOLOR*/ 21, /*laya.d3.shader.Shader3D.PERIOD_SCENE*/ 4],
                'u_shadowMap1': [/*laya.d3.core.scene.Scene.SHADOWMAPTEXTURE1*/ 18, /*laya.d3.shader.Shader3D.PERIOD_SCENE*/ 4],
                'u_shadowMap2': [/*laya.d3.core.scene.Scene.SHADOWMAPTEXTURE2*/ 19, /*laya.d3.shader.Shader3D.PERIOD_SCENE*/ 4],
                'u_shadowMap3': [/*laya.d3.core.scene.Scene.SHADOWMAPTEXTURE3*/ 20, /*laya.d3.shader.Shader3D.PERIOD_SCENE*/ 4],
                'u_shadowPSSMDistance': [/*laya.d3.core.scene.Scene.SHADOWDISTANCE*/ 15, /*laya.d3.shader.Shader3D.PERIOD_SCENE*/ 4],
                'u_lightShadowVP': [/*laya.d3.core.scene.Scene.SHADOWLIGHTVIEWPROJECT*/ 16, /*laya.d3.shader.Shader3D.PERIOD_SCENE*/ 4],
                'u_shadowPCFoffset': [/*laya.d3.core.scene.Scene.SHADOWMAPPCFOFFSET*/ 17, /*laya.d3.shader.Shader3D.PERIOD_SCENE*/ 4]
            };
            var customShader = Laya.Shader3D.nameKey.add("CustomShader2");
            var vs = "attribute vec4 a_Position;\nuniform mat4 u_MvpMatrix;\n\n#if defined(DIFFUSEMAP)||((defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT))&&(defined(SPECULARMAP)||defined(NORMALMAP)))||(defined(LIGHTMAP)&&defined(UV))\n	attribute vec2 a_Texcoord0;\n	varying vec2 v_Texcoord0;\n#endif\n\n#if defined(LIGHTMAP)&&defined(UV1)\n	attribute vec2 a_Texcoord1;\n#endif\n\n#ifdef LIGHTMAP\n	uniform vec4 u_LightmapScaleOffset;\n	varying vec2 v_LightMapUV;\n#endif\n\n#ifdef COLOR\n	attribute vec4 a_Color;\n	varying vec4 v_Color;\n#endif\n\n#ifdef BONE\n	const int c_MaxBoneCount = 24;\n	attribute vec4 a_BoneIndices;\n	attribute vec4 a_BoneWeights;\n	uniform mat4 u_Bones[c_MaxBoneCount];\n#endif\n\n#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP)\n	attribute vec3 a_Normal;\n	varying vec3 v_Normal; \n#endif\n\n#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP)\n	uniform vec3 u_CameraPos;\n	varying vec3 v_ViewDir; \n#endif\n\n#if (defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP))&&defined(NORMALMAP)\n	attribute vec4 a_Tangent0;\n	varying vec3 v_Tangent;\n	varying vec3 v_Binormal;\n#endif\n\n#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP)||defined(RECEIVESHADOW)\n	uniform mat4 u_WorldMat;\n	varying vec3 v_PositionWorld;\n#endif\n\nvarying float v_posViewZ;\n#ifdef RECEIVESHADOW\n  #ifdef SHADOWMAP_PSSM1 \n  varying vec4 v_lightMVPPos;\n  uniform mat4 u_lightShadowVP[4];\n  #endif\n#endif\n\n#ifdef TILINGOFFSET\n	uniform vec4 u_TilingOffset;\n#endif\n\nvoid main_castShadow()\n{\n	#ifdef BONE\n		mat4 skinTransform=mat4(0.0);\n		skinTransform += u_Bones[int(a_BoneIndices.x)] * a_BoneWeights.x;\n		skinTransform += u_Bones[int(a_BoneIndices.y)] * a_BoneWeights.y;\n		skinTransform += u_Bones[int(a_BoneIndices.z)] * a_BoneWeights.z;\n		skinTransform += u_Bones[int(a_BoneIndices.w)] * a_BoneWeights.w;\n		vec4 position=skinTransform*a_Position;\n		gl_Position = u_MvpMatrix * position;\n	#else\n		gl_Position = u_MvpMatrix * a_Position;\n	#endif\n	 \n	//TODO没考虑UV动画呢\n	#if defined(DIFFUSEMAP)&&defined(ALPHATEST)\n		v_Texcoord0=a_Texcoord0;\n	#endif\n		v_posViewZ = gl_Position.z;\n}\n\nvoid main_normal()\n{\n	#ifdef BONE\n		mat4 skinTransform=mat4(0.0);\n		skinTransform += u_Bones[int(a_BoneIndices.x)] * a_BoneWeights.x;\n		skinTransform += u_Bones[int(a_BoneIndices.y)] * a_BoneWeights.y;\n		skinTransform += u_Bones[int(a_BoneIndices.z)] * a_BoneWeights.z;\n		skinTransform += u_Bones[int(a_BoneIndices.w)] * a_BoneWeights.w;\n		vec4 position=skinTransform*a_Position;\n		gl_Position = u_MvpMatrix * position;\n	#else\n		gl_Position = u_MvpMatrix * a_Position;\n	#endif\n\n	#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP)\n		mat3 worldMat;\n		#ifdef BONE\n			worldMat=mat3(u_WorldMat*skinTransform);\n		#else\n			worldMat=mat3(u_WorldMat);\n		#endif  \n		v_Normal=worldMat*a_Normal;//TODO:法线可以用\"魔法\"矩阵\n		#if (defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT))&&defined(NORMALMAP)\n			v_Tangent=worldMat*a_Tangent0.xyz;\n			v_Binormal=cross(v_Normal,v_Tangent)*a_Tangent0.w;\n		#endif\n	#endif\n\n	#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP)||defined(RECEIVESHADOW)\n		#ifdef BONE\n			v_PositionWorld=(u_WorldMat*position).xyz;\n		#else\n			v_PositionWorld=(u_WorldMat*a_Position).xyz;\n		#endif\n	#endif\n	\n	#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP)\n		v_ViewDir=u_CameraPos-v_PositionWorld;\n	#endif\n\n	#if defined(DIFFUSEMAP)||((defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT))&&(defined(SPECULARMAP)||defined(NORMALMAP)))\n		v_Texcoord0=a_Texcoord0;\n		#ifdef TILINGOFFSET\n			v_Texcoord0=(vec2(v_Texcoord0.x,v_Texcoord0.y-1.0)*u_TilingOffset.xy)+u_TilingOffset.zw;\n			v_Texcoord0=vec2(v_Texcoord0.x,1.0+v_Texcoord0.y);\n		#endif\n	#endif\n\n	#ifdef LIGHTMAP\n		#ifdef SCALEOFFSETLIGHTINGMAPUV\n			#ifdef UV1\n				v_LightMapUV=vec2(a_Texcoord1.x*u_LightmapScaleOffset.x+u_LightmapScaleOffset.z,1.0+a_Texcoord1.y*u_LightmapScaleOffset.y+u_LightmapScaleOffset.w);\n			#else\n				v_LightMapUV=vec2(a_Texcoord0.x,a_Texcoord0.y-1.0)*u_LightmapScaleOffset.xy+u_LightmapScaleOffset.zw;\n			#endif \n		#else\n			#ifdef UV1\n				v_LightMapUV=a_Texcoord1;\n			#else\n				v_LightMapUV=a_Texcoord0;\n			#endif \n		#endif \n	#endif\n\n	#ifdef COLOR\n		v_Color=a_Color;\n	#endif\n\n	#ifdef RECEIVESHADOW\n		v_posViewZ = gl_Position.w;\n		#ifdef SHADOWMAP_PSSM1 \n			v_lightMVPPos = u_lightShadowVP[0] * vec4(v_PositionWorld,1.0);\n		#endif\n	#endif\n}\n\nvoid main()\n{\n	#ifdef CASTSHADOW\n		main_castShadow();\n	#else\n		main_normal();\n	#endif\n}";
            var ps = "#ifdef HIGHPRECISION\n	precision highp float;\n#else\n	precision mediump float;\n#endif\n\n#include \"Lighting.glsl\";\n\nuniform vec4 u_DiffuseColor;\n\n#ifdef COLOR\n	varying vec4 v_Color;\n#endif\n\n#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP)\n	varying vec3 v_ViewDir; \n#endif\n\n#ifdef ALPHATEST\n	uniform float u_AlphaTestValue;\n#endif\n\n#ifdef DIFFUSEMAP\n	uniform sampler2D u_DiffuseTexture;\n#endif\n\n#ifdef REFLECTMAP\n	uniform samplerCube u_ReflectTexture;\n	uniform vec3 u_MaterialReflect;\n#endif\n\n#if defined(DIFFUSEMAP)||((defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT))&&(defined(SPECULARMAP)||defined(NORMALMAP)))\n	varying vec2 v_Texcoord0;\n#endif\n\n#ifdef LIGHTMAP\n	varying vec2 v_LightMapUV;\n	uniform sampler2D u_LightMap;\n#endif\n\n#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)\n	uniform vec3 u_MaterialSpecular;\n	uniform float u_Shininess;\n	#ifdef SPECULARMAP \n		uniform sampler2D u_SpecularTexture;\n	#endif\n#endif\n\n#ifdef FOG\n	uniform float u_FogStart;\n	uniform float u_FogRange;\n	#ifdef ADDTIVEFOG\n	#else\n		uniform vec3 u_FogColor;\n	#endif\n#endif\n\n\n#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP)\n	varying vec3 v_Normal;\n#endif\n\n#if (defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT))&&defined(NORMALMAP)\n	uniform sampler2D u_NormalTexture;\n	varying vec3 v_Tangent;\n	varying vec3 v_Binormal;\n#endif\n\n#ifdef DIRECTIONLIGHT\n	uniform DirectionLight u_DirectionLight;\n#endif\n\n#ifdef POINTLIGHT\n	uniform PointLight u_PointLight;\n#endif\n\n#ifdef SPOTLIGHT\n	uniform SpotLight u_SpotLight;\n#endif\n\nuniform vec3 u_AmbientColor;\n\n\n#if defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP)||defined(RECEIVESHADOW)\n	varying vec3 v_PositionWorld;\n#endif\n\n#include \"ShadowHelper.glsl\"\nvarying float v_posViewZ;\n#ifdef RECEIVESHADOW\n	#if defined(SHADOWMAP_PSSM2)||defined(SHADOWMAP_PSSM3)\n		uniform mat4 u_lightShadowVP[4];\n	#endif\n	#ifdef SHADOWMAP_PSSM1 \n		varying vec4 v_lightMVPPos;\n	#endif\n#endif\n\nvoid main_castShadow()\n{\n	//gl_FragColor=vec4(v_posViewZ,0.0,0.0,1.0);\n	gl_FragColor=packDepth(v_posViewZ);\n	#if defined(DIFFUSEMAP)&&defined(ALPHATEST)\n		float alpha = texture2D(u_DiffuseTexture,v_Texcoord0).w;\n		if( alpha < u_AlphaTestValue )\n		{\n			discard;\n		}\n	#endif\n}\nvoid main_normal()\n{\n	vec4 mainColor=u_DiffuseColor;\n	#ifdef DIFFUSEMAP\n		vec4 difTexColor=texture2D(u_DiffuseTexture, v_Texcoord0);\n		mainColor=mainColor*difTexColor;\n	#endif \n	#ifdef COLOR\n		mainColor=mainColor*v_Color;\n	#endif \n    \n	#ifdef ALPHATEST\n		if(mainColor.a<u_AlphaTestValue)\n			discard;\n	#endif\n  \n	#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||defined(REFLECTMAP)\n		vec3 normal;\n		#if (defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT))&&defined(NORMALMAP)\n			vec3 normalMapSample = texture2D(u_NormalTexture, v_Texcoord0).rgb;\n			normal = normalize(NormalSampleToWorldSpace(normalMapSample, v_Normal, v_Tangent,v_Binormal));\n		#else\n			normal = normalize(v_Normal);\n		#endif\n	#endif\n	\n	#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)\n		vec3 viewDir= normalize(v_ViewDir);\n		vec3 diffuse = vec3(0.0);\n		vec3 specular= vec3(0.0);\n		vec3 dif,spe;\n		#ifdef SPECULARMAP\n			vec3 gloss=texture2D(u_SpecularTexture, v_Texcoord0).rgb;\n		#else\n			#ifdef DIFFUSEMAP\n				vec3 gloss=vec3(difTexColor.a);\n			#else\n				vec3 gloss=vec3(1.0);\n			#endif\n		#endif\n	#endif\n\n	\n	#ifdef DIRECTIONLIGHT\n		LayaAirBlinnPhongDiectionLight(u_MaterialSpecular,u_Shininess,normal,gloss,viewDir,u_DirectionLight,dif,spe);\n		diffuse+=dif;\n		specular+=spe;\n	#endif\n \n	#ifdef POINTLIGHT\n		LayaAirBlinnPhongPointLight(v_PositionWorld,u_MaterialSpecular,u_Shininess,normal,gloss,viewDir,u_PointLight,dif,spe);\n		diffuse+=dif;\n		specular+=spe;\n	#endif\n\n	#ifdef SPOTLIGHT\n		LayaAirBlinnPhongSpotLight(v_PositionWorld,u_MaterialSpecular,u_Shininess,normal,gloss,viewDir,u_SpotLight,dif,spe);\n		diffuse+=dif;\n		specular+=spe;\n	#endif\n\n	\n	vec3 finalDiffuse;\n	#ifdef LIGHTMAP\n		finalDiffuse=texture2D(u_LightMap, v_LightMapUV).rgb*2.0;\n		//float exponent = texture2D(u_LightMap, v_LightMapUV).a;\n		//finalDiffuse = texture2D(u_LightMap, v_LightMapUV).rgb;\n		//float ratio = pow(2.0, exponent * 255.0 - (128.0 + 8.0));\n		//finalDiffuse = finalDiffuse * 255.0 * ratio;	\n		//finalDiffuse = sqrt(finalDiffuse);\n	#else\n		finalDiffuse=vec3(0.0);\n	#endif\n\n	#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)\n		finalDiffuse+=diffuse;\n	#endif\n\n	#ifdef RECEIVESHADOW\n		float shadowValue = 1.0;\n		#ifdef SHADOWMAP_PSSM3\n			shadowValue = getShadowPSSM3( u_shadowMap1,u_shadowMap2,u_shadowMap3,u_lightShadowVP,u_shadowPSSMDistance,u_shadowPCFoffset,v_PositionWorld,v_posViewZ,0.001);\n		#endif\n		#ifdef SHADOWMAP_PSSM2\n			shadowValue = getShadowPSSM2( u_shadowMap1,u_shadowMap2,u_lightShadowVP,u_shadowPSSMDistance,u_shadowPCFoffset,v_PositionWorld,v_posViewZ,0.001);\n		#endif \n		#ifdef SHADOWMAP_PSSM1\n			shadowValue = getShadowPSSM1( u_shadowMap1,v_lightMVPPos,u_shadowPSSMDistance,u_shadowPCFoffset,v_posViewZ,0.001);\n		#endif\n		gl_FragColor =vec4(mainColor.rgb*(u_AmbientColor + finalDiffuse)*shadowValue,mainColor.a);\n	#else\n		gl_FragColor =vec4(mainColor.rgb*(u_AmbientColor + finalDiffuse),mainColor.a);\n	#endif\n	\n\n	#if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)\n		#ifdef RECEIVESHADOW\n			gl_FragColor.rgb+=specular*shadowValue;\n		#else\n			gl_FragColor.rgb+=specular;\n		#endif\n	#endif\n\n\n	#ifdef REFLECTMAP\n		vec3 incident = -viewDir;\n		vec3 reflectionVector = reflect(incident,normal);\n		vec3 reflectionColor  = textureCube(u_ReflectTexture,reflectionVector).rgb;\n		gl_FragColor.rgb += u_MaterialReflect*reflectionColor;\n	#endif\n	  \n	#ifdef FOG\n		float lerpFact=clamp((1.0/gl_FragCoord.w-u_FogStart)/u_FogRange,0.0,1.0);\n		#ifdef ADDTIVEFOG\n			gl_FragColor.rgb=mix(gl_FragColor.rgb,vec3(0.0,0.0,0.0),lerpFact);\n		#else\n			gl_FragColor.rgb=mix(gl_FragColor.rgb,u_FogColor,lerpFact);\n		#endif\n	#endif\n}\n\nvoid main()\n{\n	#ifdef CASTSHADOW		\n		main_castShadow();\n	#else\n	  main_normal();\n	#endif  \n}\n\n";
            Laya.ShaderCompile3D.add(customShader, vs, ps, attributeMap, uniformMap);
        };
        SceneManager.Instance = new SceneManager();
        return SceneManager;
    }());
    game.SceneManager = SceneManager;
})(game || (game = {}));
//# sourceMappingURL=SceneManager.js.map