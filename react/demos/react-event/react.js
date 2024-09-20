/*
 * @Author: jiangmengxia jiangmengxia@nnuo.com
 * @Date: 2024-09-19 10:10:40
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-09-19 13:16:09
 * @FilePath: \jiangmengxia.github.io\react\demos\react-event\react.js
 * @Description: Description
 */
function createElement(elementType, props = {}, ...children) {
  let newProps = { ...props };
  if (children.length) {
    newProps.children = children?.length > 1 ? children : children[0];
  }
  return {
    type: elementType,
    props: newProps,
  };
}

React = {
  createElement,
};
