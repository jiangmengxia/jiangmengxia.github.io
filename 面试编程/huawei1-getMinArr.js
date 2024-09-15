/*
 * @Author: jiangmengxia jiangmengxia@qq.com
 * @Date: 2024-09-13 20:22:43
 * @LastEditors: jiangmengxia jiangmengxia@qq.com
 * @LastEditTime: 2024-09-13 21:55:01
 * @FilePath: /jiangmengxia.github.io/面试题/huawei1-getMinArr.js
 * @Description: Description
 */
/**
 * 题目：满足target值的最小数组
    给定一个含有 n 个正整数的数组和一个正整数 target 。

    找出该数组中满足其总和大于等于 target 的长度最小的 
    子数组
    [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。

    示例 1：
    输入：target = 7, nums = [2,3,1,2,4,3]
    输出：2
    解释：子数组 [4,3] 是该条件下的长度最小的子数组。

    示例 2：
    输入：target = 4, nums = [1,4,4]
    输出：1

    示例 3：
    输入：target = 11, nums = [1,1,1,1,1,1,1,1]
    输出：0
 */

function getMinArr(target, nums) {
  if (nums.length === 0) return 0;
  if (target === 0) return 0;
  let index = 0,
    sum,
    sIndex,
    minArrLength = 0,
    localLen;
  while (index < nums.length) {
    sIndex = index;
    sum = 0;
    localLen = 0;
    while (sIndex < nums.length) {
      sum += nums[sIndex];
      localLen++;
      if (sum >= target) {
        break;
      }
      sIndex++;
    }
    if (sum >= target) {
      if (minArrLength === 0 || localLen <= minArrLength) {
        minArrLength = localLen;
      }
    }
    index++;
  }
  return minArrLength;
}
