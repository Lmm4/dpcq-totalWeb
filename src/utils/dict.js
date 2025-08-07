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
  fgGameType: [
    { value: "hunter", label: "捕猎" },
    { value: "chess", label: "棋牌" },
    { value: "slot", label: "老虎机" },
    { value: "arcade", label: "水果机" },
  ],
  g9GameType: [
    { value: "1", label: "街机游戏" },
    { value: "2", label: "捕鱼游戏" },
    { value: "3", label: "牌类游戏" },
    { value: "4", label: "电子游戏" },
  ],
  dbPeopleGameType: [
    { value: "2001", label: "经典百家乐" },
    { value: "2002", label: "极速百家乐" },
    { value: "2003", label: "竞咪百家乐" },
    { value: "2004", label: "包桌百家乐" },
    { value: "2005", label: "共咪百家乐" },
    { value: "2006", label: "龙虎" },
    { value: "2007", label: "轮盘" },
    { value: "2008", label: "骰宝" },
    { value: "2009", label: "牛牛" },
    { value: "2010", label: "炸金花" },
    { value: "2011", label: "三公" },
    { value: "2012", label: "(旧)21点" },
    { value: "2013", label: "多台" },
    { value: "2014", label: "高额贵宾百家乐" },
    { value: "2015", label: "斗牛" },
    { value: "2016", label: "保险百家乐" },
    { value: "2019", label: "德州扑克" },
    { value: "2020", label: "番摊" },
    { value: "2021", label: "21点" },
    { value: "2022", label: "色碟" },
    { value: "2023", label: "温州牌九" },
    { value: "2025", label: "安达巴哈" },
    { value: "2026", label: "印度炸金花" },
    { value: "2027", label: "劲舞百家乐" },
    { value: "2028", label: "滚球" },
    { value: "2029", label: "六合彩" },
    { value: "2030", label: "主播百家乐" },
    { value: "2031", label: "3D" },
    { value: "2032", label: "5D" },
    { value: "2034", label: "闪电百家乐" },
    { value: "2036", label: "多利" },
    { value: "2038", label: "电投百家乐" },
  ],
  businessType: [
    { value: "PAYOUT", label: "正常结算" },
    { value: "DISCARD", label: "跳局结算" },
    { value: "CANCEL", label: "取消局" },
    { value: "REPAYOUT", label: "重算局" },
  ],
  typeList: [
    { value: "1", label: "百家乐" },
    { value: "2", label: "龙虎" },
    { value: "3", label: "轮盘" },
    { value: "4", label: "骰宝" },
    { value: "5", label: "牛牛" },
    { value: "12", label: "炸金花" },
    { value: "100002", label: "二人麻将" },
    { value: "100004", label: "百人牛牛" },
    { value: "100009", label: "加倍斗地主" },
    { value: "100033", label: "经典抢庄牛牛" },
    { value: "100037", label: "卡五星麻将" },
  ],
  tableStatus: [
    { value: "normal", label: "正常" },
    { value: "settle", label: "已结算" },
    { value: "cancel", label: "已取消" },
  ],
  wmGameType: [
    { value: "101", label: "百家乐" },
    { value: "102", label: "龙虎" },
    { value: "103", label: "轮盘" },
    { value: "104", label: "骰宝" },
    { value: "105", label: "牛牛" },
    { value: "107", label: "番摊" },
    { value: "108", label: "色碟" },
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
