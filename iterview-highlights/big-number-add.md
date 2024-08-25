<!--
 * @Author: jiangmengxia jiangmengxia@qq.com
 * @Date: 2024-08-25 18:39:16
 * @LastEditors: jiangmengxia jiangmengxia@qq.com
 * @LastEditTime: 2024-08-25 18:45:08
 * @FilePath: /jiangmengxia.github.io/iterview-highlights/bigInt.md
 * @Description: Description
-->
# 大整数相加

计算逻辑。跟小学计算一样，从低位到高位相加，考虑进位即可。

```js
    function sum(a,b){
        let res = ''
        const len = Math.max(a.length,b.length)
        a = a.padStart(len,0)
        b = b.padStart(len,0)
        let carry = 0
        for(let i = len-1; i>=0; i--){
            const sum = parseInt(a[i]) + parseInt(b[i]) + carry
            carry = Math.floor(sum/10)
            res = sum%10 + res
        }
        return carry ? carry + res : res
    }
```