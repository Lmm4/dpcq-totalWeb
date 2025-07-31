const data = {
  countryList: [
    {
      value: "CHN",
      label: "手动 - 中国",
    },
    {
      value: "HKG",
      label: "手动 - 中国香港",
    },
    {
      value: "OMA",
      label: "手动 - 中国澳门",
    },
    {
      value: "THA",
      label: "手动 - 泰国",
    },
    {
      value: "KOR",
      label: "手动 - 韩国",
    },
    {
      value: "VIE",
      label: "手动 - 越南",
    },
    {
      value: "JPN",
      label: "手动 - 日本",
    },
    {
      value: "CAM",
      label: "手动 - 柬埔寨",
    },
    {
      value: "MYA",
      label: "手动 - 缅甸",
    },
    {
      value: "OTEHR",
      label: "手动 - 通用",
    },
    {
      value: "auto",
      label: "自动",
    },
  ],
  currencyOptions: [
    {
      value: "DPCQ",
      label: "传奇币",
    },
    {
      value: "SCORE",
      label: "积分",
    },
  ],
  // 计算方式
  calcMethod: [
    {
      value: "POT",
      label: "全局池",
    },
    {
      value: "PROFIT",
      label: "比例",
    },
  ],
  // 玩法类型
  gameType: [
    {
      value: "classic_texas",
      label: "经典德州",
    },
    {
      value: "classic_short_texas",
      label: "经典短牌",
    },
    {
      value: "aof_texas",
      label: "AOF德州",
    },
    {
      value: "aof_short_texas",
      label: "AOF短牌",
    },
  ],
  // 是否开启视频
  openOrClose: [
    {
      value: "true",
      label: "开启",
    },
    {
      value: "false",
      label: "关闭",
    },
    {
      value: 0,
      label: "关闭",
    },
    {
      value: 1,
      label: "开启",
    },
  ],
  // 俱乐部类型
  clubTypeOptions: [
    {
      value: "1",
      label: "官方俱乐部",
    },
    {
      value: "2",
      label: "私人俱乐部",
    },
  ],
  // 牌桌状态
  cardOptions: [
    {
      value: "1",
      label: "待开始",
    },
    {
      value: "2",
      label: "对战中",
    },
    {
      value: "3",
      label: "已结束",
    },
  ],
  // 货币类型
  currencyOptions: [
    {
      value: "DPCQ",
      label: "传奇币",
    },
    {
      value: "SCORE",
      label: "积分",
    },
  ],
  // 结算状态
  settlementStatus: [
    {
      value: "true",
      label: "已结算",
    },
    {
      value: "false",
      label: "待结算",
    },
  ],
  // 每手服务费
  perLotServer: [
    {
      value: "NONE",
      label: "不收取",
    },
    {
      value: "RATE_CHARGE",
      label: "按比例抽成",
    },
    {
      value: "FIXED_CHARGE",
      label: "按固定金额收取",
    },
  ],
  // 上下分
  upAndDown: [
    {
      value: 1,
      label: "上分",
    },
    {
      value: 0,
      label: "下分",
    },
  ],
  orderStatus: [
    {
      value: "uncheck",
      label: "未审核",
    },
    {
      value: "checking",
      label: "审核中",
    },
    {
      value: "checked",
      label: "审核完成",
    },
    {
      value: "finish",
      label: "审核成功",
    },
    {
      value: "reject",
      label: "审核拒绝",
    },
  ],
  // 视讯游戏类型
  gameVideoType: [
    {
      value: 1,
      label: "BJL",
    },
    {
      value: 2,
      label: "LH",
    },
    {
      value: 4,
      label: "SB",
    },
    {
      value: 5,
      label: "NN",
    },
    {
      value: 12,
      label: "ZJH",
    },
  ],
  // 视讯结算状态
  gameVideoStatus: [
    {
      value: 1,
      label: "正常",
    },
    {
      value: 2,
      label: "已结算",
    },
    {
      value: 3,
      label: "已取消",
    },
  ],
  imageKey: [
    {
      value: 61,
      label: "女式包",
    },
    {
      value: 51,
      label: "鸟类",
    },
    {
      value: 41,
      label: "房屋",
    },
    {
      value: 31,
      label: "自行车",
    },
    {
      value: 21,
      label: "汽车",
    },
    {
      value: 11,
      label: "多肉",
    },
  ],
};

export const getDict = (name) => {
  return data[name] || [];
};
export const getDictLabel = (name, value) => {
  const val = value + "";
  const dict = data[name];
  const obj = dict.find((item) => item.value == val);
  return obj?.label || val;
};
