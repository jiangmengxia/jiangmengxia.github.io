# js设置css变量的方法

## 1. 使用`document.documentElement.style.setProperty`方法

```javascript
document.documentElement.style.setProperty('--my-var', 'red');
```

## 2. 使用`window.getComputedStyle`方法

```javascript
const root = document.documentElement;
const currentColor = window.getComputedStyle(root).getPropertyValue('--my-var');
```