{
	"type":"Scene",
	"props":{
		"name":"testLaya",
		"enableFog":false,
		"fogStart":0,
		"fogRange":300
	},
	"customProps":{
		"skyBox":{},
		"lightmaps":[],
		"ambientColor":[
			0.212,
			0.227,
			0.259
		],
		"fogColor":[
			0.5,
			0.5,
			0.5
		]
	},
	"child":[
		{
			"type":"Camera",
			"props":{
				"isStatic":false,
				"name":"Main Camera",
				"clearFlag":1,
				"orthographic":false,
				"fieldOfView":60,
				"nearPlane":0.3,
				"farPlane":1000
			},
			"customProps":{
				"layer":0,
				"translate":[
					-11.54094,
					4.062168,
					15.4548
				],
				"rotation":[
					0.08217335,
					-0.8517019,
					-0.1405077,
					-0.4981055
				],
				"scale":[
					1,
					1,
					1
				],
				"viewport":[
					0,
					0,
					1,
					1
				],
				"clearColor":[
					0.1921569,
					0.3019608,
					0.4745098,
					0
				]
			},
			"components":{},
			"child":[]
		},
		{
			"type":"Sprite3D",
			"props":{
				"isStatic":false,
				"name":"ToonRTS_demo_Knight"
			},
			"customProps":{
				"layer":0,
				"translate":[
					-20,
					0.15,
					20
				],
				"rotation":[
					0,
					0,
					0,
					-1
				],
				"scale":[
					1,
					1,
					1
				]
			},
			"components":{
				"Rigidbody":{},
				"Animator":{
					"avatar":{
						"path":"Assets/Toon_RTS_demo/models/ToonRTS_demo_Knight-ToonRTS_demo_Knight-ToonRTS_demo_KnightAvatar.lav",
						"linkSprites":{}
					},
					"clipPaths":[
						"Assets/Toon_RTS_demo/animations/WK_heavy_infantry_05_combat_idle-WK_heavy_infantry_05_combat_idle.lani",
						"Assets/Toon_RTS_demo/animations/WK_heavy_infantry_06_combat_walk-WK_heavy_infantry_06_combat_walk.lani",
						"Assets/Toon_RTS_demo/animations/WK_heavy_infantry_08_attack_B-WK_heavy_infantry_08_attack_B.lani",
						"Assets/Toon_RTS_demo/animations/WK_heavy_infantry_04_charge-WK_heavy_infantry_04_charge.lani"
					],
					"playOnWake":true
				}
			},
			"child":[
				{
					"type":"SkinnedMeshSprite3D",
					"props":{
						"isStatic":false,
						"name":"WK_HeavyIntantry"
					},
					"customProps":{
						"layer":0,
						"translate":[
							0,
							0,
							0
						],
						"rotation":[
							0.7071068,
							0,
							0,
							-0.7071067
						],
						"scale":[
							1,
							1,
							1
						],
						"rootBone":"Bip001 Pelvis",
						"boundBox":{
							"min":[
								-0.7331155,
								-0.5347157,
								-0.8738409
							],
							"max":[
								0.8864798,
								0.9400525,
								1.085962
							]
						},
						"boundSphere":{
							"center":[
								0.07668215,
								0.2026684,
								0.1060607
							],
							"radius":1.469597
						},
						"materials":[
							{
								"type":"Laya.StandardMaterial",
								"path":"Assets/Toon_RTS_demo/models/Materials/DemoTexture.lmat"
							}
						],
						"meshPath":"Assets/Toon_RTS_demo/models/ToonRTS_demo_Knight-WK_HeavyIntantry.lm"
					},
					"components":{},
					"child":[]
				}
			]
		},
		{
			"type":"DirectionLight",
			"props":{
				"isStatic":false,
				"name":"Directional light",
				"intensity":1,
				"lightmapBakedType":0
			},
			"customProps":{
				"layer":0,
				"translate":[
					-2.165527,
					2.193848,
					-3.087891
				],
				"rotation":[
					0.1093816,
					0.8754261,
					0.4082179,
					-0.2345697
				],
				"scale":[
					1,
					1,
					1
				],
				"color":[
					1,
					1,
					1
				]
			},
			"components":{},
			"child":[]
		},
		{
			"type":"Terrain",
			"props":{
				"isStatic":true,
				"name":"Terrain"
			},
			"customProps":{
				"layer":0,
				"translate":[
					0,
					0,
					0
				],
				"rotation":[
					0,
					0,
					0,
					-1
				],
				"scale":[
					1,
					1,
					1
				],
				"dataPath":"terrain/terrain.lt"
			},
			"components":{},
			"child":[]
		},
		{
			"type":"Sprite3D",
			"props":{
				"isStatic":true,
				"name":"Wall"
			},
			"customProps":{
				"layer":0,
				"translate":[
					-20,
					0,
					20
				],
				"rotation":[
					0,
					0,
					0,
					-1
				],
				"scale":[
					1,
					1,
					1
				]
			},
			"components":{
				"BoxCollider":{
					"isTrigger":true,
					"center":[
						0,
						0,
						0
					],
					"size":[
						1,
						1,
						1
					]
				},
				"Rigidbody":{}
			},
			"child":[
				{
					"type":"MeshSprite3D",
					"props":{
						"isStatic":true,
						"name":"Cube"
					},
					"customProps":{
						"layer":0,
						"translate":[
							17.5,
							1.96,
							58.5
						],
						"rotation":[
							0,
							0,
							0,
							-1
						],
						"scale":[
							0.98,
							4.44,
							210.5991
						],
						"meshPath":"Library/unity default resources-Cube.lm",
						"materials":[
							{
								"type":"Laya.StandardMaterial",
								"path":"Resources/unity_builtin_extra.lmat"
							}
						]
					},
					"components":{
						"BoxCollider":{
							"isTrigger":false,
							"center":[
								0,
								0,
								0
							],
							"size":[
								1,
								1,
								1
							]
						}
					},
					"child":[]
				},
				{
					"type":"MeshSprite3D",
					"props":{
						"isStatic":true,
						"name":"Cube (1)"
					},
					"customProps":{
						"layer":0,
						"translate":[
							-3.200001,
							1.96,
							-16.2
						],
						"rotation":[
							0,
							0.7071068,
							0,
							-0.7071069
						],
						"scale":[
							0.98,
							4.44,
							125.3226
						],
						"meshPath":"Library/unity default resources-Cube.lm",
						"materials":[
							{
								"type":"Laya.StandardMaterial",
								"path":"Resources/unity_builtin_extra.lmat"
							}
						]
					},
					"components":{
						"BoxCollider":{
							"isTrigger":false,
							"center":[
								0,
								0,
								0
							],
							"size":[
								1,
								1,
								1
							]
						}
					},
					"child":[]
				},
				{
					"type":"MeshSprite3D",
					"props":{
						"isStatic":true,
						"name":"Cube (2)"
					},
					"customProps":{
						"layer":0,
						"translate":[
							-42.5,
							1.96,
							58.5
						],
						"rotation":[
							0,
							0,
							0,
							-1
						],
						"scale":[
							0.98,
							4.44,
							210.5991
						],
						"meshPath":"Library/unity default resources-Cube.lm",
						"materials":[
							{
								"type":"Laya.StandardMaterial",
								"path":"Resources/unity_builtin_extra.lmat"
							}
						]
					},
					"components":{
						"BoxCollider":{
							"isTrigger":false,
							"center":[
								0,
								0,
								0
							],
							"size":[
								1,
								1,
								1
							]
						}
					},
					"child":[]
				},
				{
					"type":"MeshSprite3D",
					"props":{
						"isStatic":true,
						"name":"Cube (3)"
					},
					"customProps":{
						"layer":0,
						"translate":[
							-3.2,
							1.96,
							51.8
						],
						"rotation":[
							0,
							0.7071068,
							0,
							-0.7071069
						],
						"scale":[
							0.9800004,
							4.44,
							125.3227
						],
						"meshPath":"Library/unity default resources-Cube.lm",
						"materials":[
							{
								"type":"Laya.StandardMaterial",
								"path":"Resources/unity_builtin_extra.lmat"
							}
						]
					},
					"components":{
						"BoxCollider":{
							"isTrigger":false,
							"center":[
								0,
								0,
								0
							],
							"size":[
								1,
								1,
								1
							]
						}
					},
					"child":[]
				},
				{
					"type":"MeshSprite3D",
					"props":{
						"isStatic":true,
						"name":"Cube (4)"
					},
					"customProps":{
						"layer":0,
						"translate":[
							-3.200001,
							-0.57,
							20.4
						],
						"rotation":[
							-0.4999998,
							0.5000002,
							0.4999998,
							-0.5000002
						],
						"scale":[
							0.9800004,
							74.67518,
							125.3228
						],
						"meshPath":"Library/unity default resources-Cube.lm",
						"materials":[
							{
								"type":"Laya.StandardMaterial",
								"path":"Resources/unity_builtin_extra.lmat"
							}
						]
					},
					"components":{
						"BoxCollider":{
							"isTrigger":false,
							"center":[
								0,
								0,
								0
							],
							"size":[
								1,
								1,
								1
							]
						}
					},
					"child":[]
				},
				{
					"type":"MeshSprite3D",
					"props":{
						"isStatic":true,
						"name":"Cube (5)"
					},
					"customProps":{
						"layer":0,
						"translate":[
							-25.58,
							1.96,
							-3.37
						],
						"rotation":[
							0,
							0.498233,
							0,
							-0.8670431
						],
						"scale":[
							7.785118,
							4.44,
							32.90047
						],
						"meshPath":"Library/unity default resources-Cube.lm",
						"materials":[
							{
								"type":"Laya.StandardMaterial",
								"path":"Resources/unity_builtin_extra.lmat"
							}
						]
					},
					"components":{
						"BoxCollider":{
							"isTrigger":false,
							"center":[
								0,
								0,
								0
							],
							"size":[
								1,
								1,
								1
							]
						}
					},
					"child":[]
				}
			]
		}
	]
}