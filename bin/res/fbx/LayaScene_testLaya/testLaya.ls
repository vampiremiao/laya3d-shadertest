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
		}
	]
}