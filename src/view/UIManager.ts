class UIManager {
	public static readonly Instance: UIManager = new UIManager();


	public constructor() {
	}
	private _views: { [uitype: number]: view.UIBase } = {};

	private static readonly bindingrelation: { [uitype: number]: any } = {};

	private uiCreateTimeDic: { [uitype: number]: number } = {};	//窗口show的时间
	private uiDisposeTimeDic: { [uitype: number]: number } = {}; //窗口hide的时间

	public init(): void {
		//绑定ui 类型与 class
		UIManager.bindingrelation[UIType.Loading] = [view.LoadingUI,ui.LoadingUI];
		// UIManager.bindingrelation[UIType.SelectServer] = SelectServerCtrl;
		// UIManager.bindingrelation[UIType.Login] = LoginUICtrl;
		UIManager.bindingrelation[UIType.MainUI] = [view.HomeUI,ui.home.HomeUI];
		// UIManager.bindingrelation[UIType.CreateRole] = CreateRoleUICtrl;
		
	}



	/**
	 * 打开ui 如果管理器里面没有就创建 有就隐藏变为显示
	 * @param type:UIType
	 * @param openData:UIOpenData 打开面板参数
	 * @param limit:boolean 是否检测打开条件
	 */
	public show(type: UIType, openData: UIOpenData = null, limit: boolean = true): view.UIBase {
		this.uiCreateTimeDic[type] = Laya.timer.currTimer;
		let view: view.UIBase = null;
		if (this._views[type]) {
			view = this._views[type];
		} else {
			view = new UIManager.bindingrelation[type][0];
			view.uiType = type;
			view.uiClass = UIManager.bindingrelation[type][1];
			view.create();
			this._views[type] = view;
		}
		// Game.Instance.baseLayer.getLayerByUIType(type).addChild(view);
		view.show(openData);
		
		return view;
	}

	/**
	 * 关闭ui  remove=true 从内存中移除，反之隐藏ui
	 */
	public hide(type: UIType): void {



		if (this._views[type]) {

			this._views[type].hide();
			if (!this._views[type].useDelayDestroy) {	//不使用延迟销毁
				// Game.Instance.baseLayer.getLayerByUIType(type).removeChild(this._views[type]);
				if (this._views[type].isInit()) {
					this._views[type].dispose();
				}
				delete this._views[type];
			} else {
				this.uiDisposeTimeDic[type] = Laya.timer.currTimer;
			}
			// this.updateMapMsg(true);

			// GuideManager.Instance.cancelGuide(constants.E_GUIDE_TYPE.ReturnButtonGuide);	//取消返回键引导
		}
	}

	private updateTime(): void {

		//处理窗口延迟销毁
		let curTime = Laya.timer.currTimer;
		for (let szType in this.uiDisposeTimeDic) {
			let type = parseInt(szType);
			if (this.uiCreateTimeDic[type] < this.uiDisposeTimeDic[type] && curTime > this.uiDisposeTimeDic[type] + 30000) {
				// Game.Instance.baseLayer.getLayerByUIType(type).removeChild(this._views[type]);
				if (this._views[type].isInit()) {
					this._views[type].dispose();
				}
				delete this._views[type];
				delete this.uiCreateTimeDic[type];
				delete this.uiDisposeTimeDic[type];

				// console.log("延迟销毁窗口", type);
			}
		}

	}


	/**
	 * 如果管理器里面没有就 创建，有就移除
	 */
	public showOrHide(type: UIType, openData?: UIOpenData): void {
		if (this._views[type]) {
			if (this._views[type].visible) {
				this.hide(type);
			} else {
				this.show(type, openData);
			}
		} else {
			this.show(type, openData);
		}
	}

	public getUI(type: UIType): view.UIBase {
		return this._views[type];
	}

}

/**开面板参数  */
class UIOpenData {
	public data: any;
	public args: any[];//页签tab
	public constructor($data: any = null, ...args) {
		this.data = $data;
		this.args = args;
	}
}

/**
 * 在mainlayer 里面做了  分层处理 这里定义枚举 
 * 0-100 是 地图场景层 sceneLayer
 * 100-200 是 主界面层 mainLayer
 * 200-500 是 通用显示层 commonLayer
 * 500-600 是 弹出层 popLayer
 * 600-700 是 消息层 messageLayer
 * 700-800 是 alert层 storyLayer
 * 800-900 是 tip 弹出层 tipLayer
 * 900-1000 是 GM工具层
 * 1000-1100 是 断线重连弹窗(普通的弹窗 alertdialog)
 */
const enum UIType {
	Loading = 11,
	SelectServer = 101,
	Login = 102,
	CreateRole = 103,
	HomeTask = 105,//成就追踪
	HeadSelectView = 106,//选中头像
	MainUI = 201,
	MiningCtrl = 202,		//挖矿主界面

	RolePop = 501,//角色
	Treasure = 502,//宝物
	Achievement = 503,//成就
	BagPop = 504,//背包
	HeroPop = 505,//英雄
	UnionPop = 506,//帮会

	XunBao = 508,//寻宝
	BossPop = 509,//个人boss
	RunePop = 510,//符文
	CheckPointBoss = 511,//关卡Boss
	Forge = 513,		//锻造
	// CHECKBOSSRESULT = 514,// 以前的战斗结算
	WingEquipPop = 515,
	// FamePop = 516,		//威名
	MaterialPartPop = 517,	//日常 材料副本 烧猪 竞技场 精英任务
	SpecialRing = 518,	//特戒
	Store = 520,		//商城

	VipPop = 522,		//vip
	WayGetComAlert = 523, //来源(不带购买)
	AchievementRunePop = 524, //成就符文
	WayGetSellAlert = 526, //来源(带购买)
	AntiAddictionPop = 527,	//防沉迷
	TitlePop = 528,		//称号
	RankPop = 529,			//排行榜
	EmailPop = 530,		//邮件
	HeroSoulDialog = 531,//灵魂刻印
	OfflineDialog = 533,
	FuliPop = 534, 	//福利
	QuicklylevelupAlert = 535,//快速升级
	ActivityPop = 536,	//活动
	// StoreNpcPop = 537,	//npc商店(以前的神秘商店)
	StoreSMPop = 537,//神秘商店 
	RechargePop = 538,	//充值
	LadderPop = 539,	//天梯
	MaterialPartDailyEliteResult = 540,//精英任务完成结束
	TimeLimitTaskPop = 542,	//限时任务
	ShobakPop = 544,	//限时任务
	LegacyPop = 545,	//传世
	OtherPlayerEquipPop = 546,	//查看他人装备
	FightResultPop = 547,
	RolePop_gy = 548,		//角色光翼
	HeroPop_gy = 549,		//英雄光翼
	FirstChargeDialog = 550,	//首充
	ExhibitionPop = 551,	//展示
	CreateHeroPop1 = 552,//获得英雄
	ChapterRewardDialog = 553,//关卡奖励
	UnionLRewardDialog = 554,//行会礼包领奖
	FunTrailer = 555,//功能开启
	FaqPop = 556,	 //新手字典	
	CultivatePop = 557,		//培养1神铸
	// KingForbiddenPop=558, //王者禁地
	DailyChargeDialog = 559,	//每日充值
	SuitUpdateDailog = 560,//神装升级
	PlatformAniNoticeDialog = 561,//提示点击弹出平台实名认证
	LingbaoPop = 562,		//灵宝

	FirePigResultDialog = 564,	//烧猪结算
	SuitPop = 565,//神装
	DuoBaoFindPop = 566,//夺宝对手界面


	FirstAndRecharge = 599,//特殊首充和充值，599这个不能改,不能改,不能改
	HomeUiDown = 601,
	ChatMax = 602,				//大的聊天窗口



	RoleAttributeAlert = 701,
	HeroAttributeAlert = 703,

	UnionCreateDialog = 705,//帮会创建
	UnionPositionDialog = 706,
	RoleAcquisitionRepairAlert = 707,
	HeroAcquisitionRepairAlert = 708,
	StoreFastBuyAlert = 709,//商城快捷购买
	VinusAttrAlert = 710,

	UnionBossDialog = 712,//帮会boss
	BossKillRecordDialog = 715,

	// CreateHeroPop = 717,//获得英雄
	ENCOURAGEALERT = 718,
	BossPromptDialog = 719,//boss复活提示
	UnionChallengeRankDialog = 722,//帮会关卡boss挑战排行


	FameListDialog = 725, // 威名预览列表
	SelectRecoveryDialog = 726, //装备回收选择
	AttackPotionDialog = 727,	//攻击药水
	BatchItemUseAlert = 728,	//批量使用

	EmailInfoDialog = 729,//查看邮件信息
	TaskDialog = 731,//任务弹窗
	GameStartDialog = 732,//开始游戏
	FuwenRecoveryPop = 733,//符文回收
	RecoveryPop = 734,//装备回收

	SearchEventBoxDialog = 735,//探索宝箱怪弹窗
	ActivityGradeRankDialog = 736,//活动等级冲榜排行

	// DailyChargeDialog = 738,	//每日充值
	ShobakMBDialog = 739,	//傻逼克膜拜奖励
	ChangeEquipDialog = 740,	//更换装备
	OtherPlayerAttributeAlert = 741,//	查看其他玩家属性
	HeroSoulItemDialog = 742,//	查看灵魂刻印信息
	TitleInfomation = 743,//	查看称号总属性信息
	BossListTipPop = 744,//	boss复活提示设置列表
	GuanQianProfitDialog = 745,	//关卡收益
	SettingDialog = 746,		//设置界面
	BoxSelectItemDialog = 747,	//宝箱选择获得道具

	LangTipsDialog = 749,	//描述弹窗
	TheBestPreview = 750,//极品预览弹框
	ItemActiveDialog = 751,//物品激活弹窗
	LadderPPDialog = 752,//天梯匹配弹窗
	BloodTipsDialog = 753,//血量技能弹窗
	UnionActCRewardDialog = 754,//行会关卡奖励弹窗

	KingForbiddenAdditionAlert = 755,//王者禁地选择加成弹框
	KingForbiddenAlert = 756,//王者禁地属性加成弹框
	SearchRewardDialog = 757,//探索界面弹框
	KingForbiddenFail = 758,//王者禁地调整失败弹框


	WealthLuckyDialog = 759,//幸运儿查看
	ShareDialog = 760,	//分享弹窗
	SuitAttbTipDialog = 761,	//神装套装属性tips
	LingbaoEquipDialog = 762,	//灵宝装备更换弹窗
	MianZhanAlert = 763, //免战弹框
	DuoBaoResultPop = 764,//夺宝夺5次结算面板
	DuoBaoZhanBaoPop = 765,//一键夺宝战报面板
	ShareNoticeDialog = 766,//分享提示弹窗
	skillTips = 802,
	Tips = 803,
	ShenzhuTip = 804,
	GMPop = 901,
	XunBaoResultAlert = 902,
	XunbaoBestDailog = 903,

	//顶级弹出层
	AlertDialog = 1001,
	guidelayer = 1004,
}
