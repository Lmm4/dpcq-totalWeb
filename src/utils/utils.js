// 防抖
export function debounce(fn, delay, immediate = false) {
  let timer = null;
  return function (...args) {
    const callNow = immediate && !timer; // 是否立即执行
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      if (!immediate) fn.apply(this, args);
    }, delay);

    if (callNow) fn.apply(this, args);
  };
}
// 扑克牌处理
export const countPublicCards = (cardArray) => {
  if (!cardArray) return cardArray;
  const numArray = [];
  const strArray = [];
  const result = cardArray.map((card) => {
    if (card.endsWith("c")) {
      numArray.push(card.substring(0, card.length - 1));
      strArray.push("梅花");
    } else if (card.endsWith("d")) {
      numArray.push(card.substring(0, card.length - 1));
      strArray.push("方块");
    } else if (card.endsWith("h")) {
      numArray.push(card.substring(0, card.length - 1));
      strArray.push("红桃");
    } else if (card.endsWith("s")) {
      numArray.push(card.substring(0, card.length - 1));
      strArray.push("黑桃");
    }
  });
  const convertedNumArray = numArray.map(convertNumber);
  const joinedString = convertedNumArray.reduce((result, num, index) => {
    return index === convertedNumArray.length - 1
      ? `${result}${strArray[index]}${num}`
      : `${result}${strArray[index]}${num},`;
  }, "");
  return joinedString;
};

const convertNumber = (num) => {
  switch (num) {
    case "J":
      return 11;
    case "Q":
      return 12;
    case "K":
      return 13;
    default:
      return num;
  }
};

// 数字处理
export const toDecimal = (value) => {
  // 先将数字转换为整数运算
  const intValue = Math.round(value * 1000); // 保留3位小数精度
  return intValue / 100000; // 除以100000得到最终结果
};
