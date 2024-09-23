# 模块

可以根据应用的需求把代码分成不同的模块 每个模块里可以导出它需要让其它模块使用的东西 在其它模块里面可以导入这些模块导出的东西

## 1 模块

在浏览器中使用模块需要借助 导出

```
export var name = 'zfpx';
export var age = 8;
```

导入

```
//import {name,age} from './school.js';
import * as school from './school.js';
console.log(school.name,school.age);
```

在页面中引用

```
<script src="https://google.github.io/traceur-compiler/bin/traceur.js"></script>
<script src="https://google.github.io/traceur-compiler/bin/BrowserSystem.js"></script>
<script src="https://google.github.io/traceur-compiler/src/bootstrap.js"></script>
<script type="module" src="index.js"></script>
```

## 2 重命名

导出时重命名

```
function say(){
    console.log('say');
}
export {say as say2};
```

导入时重命名

```
import {say2 as say3} from './school.js';
```

## 3 默认导出

每个模块都可以有一个默认要导出的东西 导出

```
export default function say(){
    console.log('say');
}
```

导入

```
import say from './school.js';
```
