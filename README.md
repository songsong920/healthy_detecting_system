# 健康状态监测系统
## 准备工作
- node.js环境（npm包管理器）
- vue-cli 脚手架构建工具
- npm  npm的淘宝镜像
- yarn 不需要镜像,使用npm install -g yarn 进行安装

## 开发运行
```bash
    # 安装依赖
    npm install 
    npm install --registry=https://registry.npm.taobao.org

   //or 不需要依赖,比npm速度快
   yarn install ||  yarn  可以用yarn代替npm 速度较快
    # 本地开发 开启服务
    npm run dev
```

## 发布
```bash
    # 发布测试环境 带webpack ananalyzer
    npm run build:sit-preview

    # 构建生成环境
    npm run build:prod
```
### 部署nginx配置参考
```
  location / {
        # 指向我们打包后上传的前端文件
        root /opt/nginx/dist;
        index index.html;
    }
    location /jwt/ {
        # 转发请求到后端服务网关
        proxy_pass http://127.0.0.1:8765/jwt/;
    }
    location /api/ {
        proxy_pass http://127.0.0.1:8765/api/;
     }
```

## 目录结构
```shell
├── build                      // 构建相关  
├── config                     // 配置相关
├── dist                       // 打包文件
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── directive              // 全局指令
│   ├── filters                // 全局filter
│   ├── mock                   // mock数据
│   ├── router                 // 路由
│   ├── store                  // 全局store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── view                   // view
│   ├── App.vue                // 入口页面
│   └── main.js                // 入口 加载组件 初始化等
├── static                     // 第三方不打包资源
│   ├── 
│   └── Tinymce                // 富文本
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json

```

## 状态管理
后台只有user和app配置相关状态使用vuex存在全局，其它数据都由每个业务页面自己管理。

## License
Apache License Version 1.0


## 已完成接口联调

#### 登录注册

- 已完成管理员登录、患者登录 ，医生登录
- 已完成患者注册

#### 管理员角色

- 个人信息 已完成信息展示、修改个人信息
- 数据统计 已完成列表查看、一键提醒
- 患者管理 已完成新增/编辑/删除/列表查看 
- 医生管理 已完成新增/编辑/删除/列表查看、通过名称查询医生信息
- 医生排班 已完成新增/编辑/删除排班/表格查看

#### 医生角色

- 个人信息 已完成信息展示、修改个人信息
- 患者信息 已完成患者信息列表展示、开处方
- 告警信息 告警信息列表展示
- 药物系统 已完成药物系统列表查看、通过名称查询列表信息

#### 患者角色

- 个人信息 已完成信息展示、修改个人信息
- 我的医生 已完成医生展示、自主选择医生、删除我的医生
- 处方管理 已完成处方管理列表展示、删除处方
- 每日上报 已完成数据上报列表展示、数据上报 

