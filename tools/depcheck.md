# depcheck依赖缺陷检查

## 介绍
depcheck 是一个用于检查 Node.js 项目中未使用的依赖项的工具。它可以分析项目的依赖项，并报告未使用的模块和未使用的文件。这对于优化项目的依赖项和减少不必要的代码量非常有用。

## 安装
```bash
npm install -g depcheck
```

## 使用
```bash
depcheck
```

## 配置
depcheck 可以通过配置文件来指定要检查的文件和目录，以及要排除的文件和目录。配置文件是一个 JSON 文件，可以放在项目的根目录下，也可以通过命令行参数指定。

配置文件示例：
```json
{
  "includes": ["src", "lib"],
  "excludes": ["node_modules", "dist"],
  "ignoreBinPackage": true,
  "ignoreGenerated": true,
  "ignoreBinFiles": true,
  "ignoreNodeModules": true,
  "ignorePatterns": ["*.test.js", "*.spec.js"],
  "minModules": 0,
  "minFiles": 0,
  "packageManager": "npm",
  "summary": true,
  "json": true,
  "markdown": true,
  "reportFile": "depcheck-report.txt"
}
``` 
