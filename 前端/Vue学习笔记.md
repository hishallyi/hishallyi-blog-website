## Vue相关命令

### 1. vue版本冲突的解决办法

当本地安装的npm版本较高，造成无法解析Vue项目中的依赖树，进而导致项目依赖下载失败时，可尝试使用如下命令解决此问题：

```
npm install --legacy-peer-deps
```



## Vue 工具分类

- @Vue/cli：Vue 项目创建脚手架，用来初始化工程开发的 Vue 项目
- create-vue：新的 Vue 官方项目脚手架工具，运行`npm create vue@latest`命令即可安装 create-vue 包，并进行项目创建列表
- Vite：代替 Webpack 的前端项目构建工具，用于开发时的实时更新和生产环境下的优化打包，可支持多种前端框架的项目构建
- Vuex：Vue 官方的状态管理库，专门用来集中管理 Vue 应用中的状态（数据）
- Vue Router：官方路由管理器，用于管理单页应用的页面导航
- Pinia：Vue 的新一代状态管理库，用于替代 Vuex，API 更简洁，使用起来更直观，适用于 Vue3
- Element Plus：饿了么开发的组件库



## Vue 工程开发脚手架构建

1. 安装 Nodejs
2. 在外网电脑**全局安装**开发需要的包

1. 1. vue 项目构建工具 vue cli `npm install -g @vue/cli`
   2. 使用命令对包进行保存`npm pack @vue/cli`
   3. 以此类推安装和打包各种包

也就是说，所有内网项目的依赖包都可以在外网全局下载然后打包传入内网，然后在内网项目中安装

好像不行，element-plus 只能在线安装

1. 在外网电脑用脚手架创建初始化项目 `vue create 项目名称`

项目名称必须是小写字母

1. 将创建的项目目录压缩，并和打包的包一起传内网机里

1. 1. 内网机安装打包的包的命令：` npm install -g ./vue-cli-xxx.tgz`



## Axios请求

1. 自定义axios实例

```javascript
axios.create({
  baseURL: http//localhost:5173,
  timeout: 10000
})
```

1. 测试axios实例



## 异步操作

在Vue框架中，`async` 和 `await` 是用来处理异步操作的现代JavaScript语法，它们可以使异步代码看起来像同步代码，从而提高代码的可读性和可维护性。在Vue中，`async` 和 `await` 可以用于组件的生命周期钩子函数、方法以及Vuex中的异步操作。

### 基本语法和概念

1. **async 函数**

- **定义**：async 关键字用于声明一个异步函数，异步函数始终返回一个 Promise 对象。
- **作用**：使函数内部可以使用 await 关键字。

**2. await 关键字**

- **定义**：await 用于等待一个 Promise 对象的结果。它只能在 async 函数内部使用。
- **作用**：暂停函数的执行，直到 Promise 对象的结果被解析（resolve）或被拒绝（reject）。



