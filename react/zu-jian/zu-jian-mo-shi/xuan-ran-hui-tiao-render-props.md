# 渲染回调（render Props）

与高阶组件类似，渲染回调或渲染 props 被用于共享或重用组件逻辑。虽然许多开发人员倾向于使用 高阶组件 的可重用逻辑，但是使用渲染回调仍然有一些非常好的理由和优势——这是在 Michael Jackson 的[“永不写另一个高阶组件”](https://link.segmentfault.com/?enc=lkjqHbonx2IsvMmv749qFA%3D%3D.F1iUqcDzO2WEx5SoQWgisywe3WW0BOb77QzA7uUiqBjKQ%2FS3qshr%2FbiCMl21j3JS)中得到了最好的解释。简而言之，渲染回调减少了命名空间冲突，并更好的说明了逻辑来源。
