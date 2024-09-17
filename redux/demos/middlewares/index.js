/*
 * @Author: jiangmengxia jiangmengxia@qq.com
 * @Date: 2024-09-17 13:13:32
 * @LastEditors: jiangmengxia jiangmengxia@qq.com
 * @LastEditTime: 2024-09-17 13:17:42
 * @FilePath: /jiangmengxia.github.io/redux/demos/middlewares/index.js
 * @Description: Description
 */
import { createStore, applyMiddleware } from "redux";
import logger from "./logger";
import { reducer } from "./reducers";
import test from "./test";

// applyMiddleware 依次注册中间件，执行顺序与注册顺序一致
export const store = createStore(reducer, applyMiddleware(logger, test));
