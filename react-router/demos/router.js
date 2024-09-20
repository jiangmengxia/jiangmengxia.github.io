/**
 * 路由对象
 */

class RouterManager {
  // <Router/> 组件的 children
  constructor({ children }) {
    // routeMap 路由映射表
    this.children = children;
    this.routes = {};
    this.currentUrl = new URL(window.location.href); // 当前路由
    this.hashHistory = [];
    this.init();
    this.listeners = []; // 监听路由变化的回调函数
  }

  init() {
    this.routes = getPathMap(this.children);
    window.addEventListener("load", this.onLoad.bind(this));
    window.addEventListener("hashchange", this.onHashChanged.bind(this));
  }

  onLoad() {
    if (!this.currentUrl.hash) {
      window.location.hash = "#/"; // 设置默认路由
    } else {
      this.doListeners(this.getValidRoutes()); // 调用监听函数
    }
  }

  onHashChanged(event) {
    console.log("onHashChanged", event);
    const { newURL } = event;
    let newUrlObj = new URL(newURL);
    if (!this.currentUrl.origin === newUrlObj.origin) {
      console.error(`跳转到其他网页去了`);
      return;
    }
    this.currentUrl = newUrlObj;
    console.log("hashchanged", newUrlObj);
    this.hashHistory.push(this.currentUrl.hash);
    this.doListeners(this.getValidRoutes()); // 调用监听函数
  }

  // 获取当前路由匹配的组件（需要展示的组件）
  getValidRoutes() {
    const path = this.currentUrl.hash.replace(/^#/, ""); // 获取当前路由
    const deepChildren = (routeItem, list = []) => {
      const { children, path } = routeItem;
      if (children.length === 0) {
        list.push(path);
        return list;
      }
      list.push(path);
      let list2 = [];
      children.forEach((item) => {
        list2 = list2.concat(deepChildren(item, []));
      });
      return list2.concat(list);
    };
    // 找到当前路由匹配的组件（需要展示的组件）
    const showRoutes = Object.values(this.routes).filter((routeItem) => {
      const treePaths = deepChildren(routeItem);
      console.log(`${routeItem.path}`, treePaths);
      return treePaths.includes(path);
    });
    return showRoutes; // 需要展示的路由
  }

  push(path) {
    history.pushState(null, null, path); // 不刷新页面，改变url
  }

  doListeners(validRoutes) {
    console.log("doListeners", this.listeners.length);
    this.listeners.forEach((listener) => {
      listener({
        currentUrl: this.currentUrl,
        showRoutes: validRoutes, // 需要展示路由
      });
    });
  }

  subscribe(callback) {
    this.listeners.push(callback);
    console.log("subscribe", this.listeners.length, this.routes.length);
    if (this.listeners.length === Object.values(this.routes).length) {
      this.onLoad(); // 调用监听函数
    }
  }
}

const getPathMap = (children) => {
  PATH_MAP = {};
  getRouteTree(children, "", PATH_MAP);
  return PATH_MAP;
};
const getRouteTree = (children, parentPath = "", PATH_MAP = {}) => {
  if (children.type === Route) {
    const path = children.props.path;
    const component = children.props.component;
    let newPath = parentPath ? `${parentPath}/${path}` : `${path}`;
    newPath = newPath.replace("//", "/");
    PATH_MAP[newPath] = {
      component,
      path: newPath,
      children: [],
    };
    if (PATH_MAP[parentPath]) {
      PATH_MAP[parentPath].children.push(PATH_MAP[newPath]);
    }
    if (children.props.children) {
      getRouteTree(children.props.children, newPath, PATH_MAP);
    }
  } else if (Array.isArray(children)) {
    children.forEach((child) => {
      getRouteTree(child, parentPath, PATH_MAP);
    });
  }
};

const getPathMatch = (component, PATH_MAP) => {
  return Object.values(PATH_MAP).find((route) => route.component === component);
};
