# owl

> 猫头鹰后台管理系统

### 主要功能

#### 活动管理

- 创建活动
- 活动列表

#### 奖品管理

- 创建奖品
- 奖品列表

#### 黑名单管理

- 创建黑名单
- 黑名单列表

### 项目目录

```
|-- build                            // webpack配置文件
|-- config                           // 项目打包路径
|-- src                              // 源码目录
|   |-- assets                       // 图片
|   |-- components                   // 组件
|       |-- loading                  // loading
|       |-- sidebar                  // 侧边栏导航
|   |-- router                       // 路由
|   |-- extend
		|-- module
			|-- api.js				//api接口管理
			| --utils.js			//公共方法
|   |-- store                        // 状态管理
|   |-- views                        // 模块页面
|		|--home						//首页
|		|--createActive				//创建活动
|		|--activeList				//活动列表
|		|--createPrize			    //创建奖品
|		|--prizeList				//奖品列表
|		|--createBlacklist		    //创建黑名单
|		|--blacklisting				//黑名单列表
|   |-- scss						// sass
|   |-- App.vue                      // 页面入口文件
|   |-- main.js                      // 程序入口文件，加载各种公共组件
|-- .babelrc                         // ES6语法编译配置
|-- .editorconfig                    // 代码编写规格
|-- .gitignore                       // 忽略的文件
|-- index.html                       // 入口html文件
|-- package.json                     // 项目及工具的依赖配置文件
|-- README.md                        // 项目文档
```

### GIT代码管理

- git仓库地址：git@gitlab.txl.com:fe/aspire-project/mm/owl.git
- master       主分支 
  - lqh      清华开发分支
  - ls        林桑开发分支
  - xl        星龙开发分支

### 安装

```bash
# 拉取远程代码
git clone git@gitlab.txl.com:fe/aspire-project/mm/owl.git

# 安装依赖
npm install 或 cnpm install 

# 运行项目
npm run dev 

# 打包生成项目
npm run bulid 
```

### 技术栈

- [vue @2.X](https://cn.vuejs.org/v2/api/)
- [element-ui](http://element.eleme.io/#/zh-CN)
- [vue-router @3.0.1](https://router.vuejs.org/zh-cn/)
- [axios @0.18.0](https://github.com/axios/axios)

### 



