/*
 * @Author: jiangmengxia jiangmengxia@qq.com
 * @Date: 2024-09-25 20:58:59
 * @LastEditors: jiangmengxia jiangmengxia@qq.com
 * @LastEditTime: 2024-09-25 21:47:49
 * @FilePath: /jiangmengxia.github.io/面试编程/2.js
 * @Description: Description
 */
// 1.
// 无重复字符的最长子串：给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
// 比如提供abaabcaa，最长不重复子串是3，比如aaa是1，提供awwabw是3
function getNoRepeatStringLength(str) {
  if (str.length === 0) return str.length;
  let sIndex = 0,
    eIndex = 1,
    subStr = "",
    objStr = "",
    wLength = 1,
    length;
  while (sIndex < str.length && eIndex <= str.length) {
    subStr = str.substring(sIndex, eIndex);
    wLength = eIndex - sIndex;
    isMatche = false;
    length = getUnRepeatStrSize(subStr);
    if (length === subStr.length && subStr.length > 0) {
      objStr = subStr;
      eIndex++;
    } else {
      sIndex++;
      eIndex++;
    }
  }
  return objStr.length;
}

function getUnRepeatStrSize(str) {
  const set = new Set();
  for (let i = 0; i < str.length; i++) {
    set.add(str[i]);
  }
  return set.size;
}

console.log(getNoRepeatStringLength("abaabcaa"));
console.log(getNoRepeatStringLength("awwabw"));
console.log(getNoRepeatStringLength(""));
console.log(getNoRepeatStringLength("ababcad"));
