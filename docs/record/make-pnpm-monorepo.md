# 搭建 vue3 源码编写环境

## 初始化项目

首先我们使用的包管理器是 pnpm，它天生支持 monorepo 。

运行如下命令，创建一个包含 package.json 的项目：

```bash
# 创建并进入文件夹
$ mkdir my-mini-vue && cd my-mini-vue
# 初始化 package.json
$ pnpm  init
# 用 vscode 打开这个项目
$ code .
```

## 初始化开始环境

1. 新增一个文件 `pnpm-workspace.yaml`，填入如下内容：

   ```yaml
   packages:
   	- 'packages/*'
   ```

2. 创建对应的目录文件如下，packages下的每一个目录代表一个子包，package.json 文件可以通过进入子包目录运行 `pnpm init` 来创建。

   ```bash
   ├── package.json
   ├── packages
   │  ├── reactivity
   │  │  ├── __test__
   │  │  ├── package.json
   │  │  └── src
   │  │     ├── index.ts
   │  └── shared
   │     ├── package.json
   │     └── src
   │        └── index.ts
   ├── pnpm-lock.yaml
   ├── pnpm-workspace.yaml
   ```

3. 修改 reacivity 包的 `package.json` 文件如下：

   ```json
   {
     "name": "@vue/reactivity",
     "version": "1.0.0",
     "module": "dist/reactivity.esm-bundler.js",
     "unpkg": "dist/reactivity.global.js",
     "buildOptions": {
       "name": "VueReactivity",
       "formats": [
         "esm-bundler",
         "esm-browser",
         "cjs",
         "global"
       ]
     }
   }
   ```

4. 修改 shared 包的 `package.json` 如下：

   ```json
   {
     "name": "@vue/shared",
     "version": "1.0.0",
     "main": "index.js",
     "module": "dist/shared.esm-bundler.js",
     "buildOptions": {
       "formats": [
         "esm-bundler",
         "cjs"
       ]
     }
   }
   ```

5. 初始化 `typescript` 环境：

   ```bash
   # -w：表示将这个包安装到工作区，也就是最顶层的 package.json
   $ pnpm install typescript -Dw
   
   # 初始化出 tsconfig.json 文件
   $ pnpm tsc --init
   ```

6. 修改 `tsconfig.json` 文件如下：

   ```json
   {
     "compilerOptions": {
       "outDir": "dist", // 输出的目录
       "sourceMap": true, // 采用sourcemap
       "target": "es2016", // 目标语法
       "module": "esnext", // 模块格式
       "moduleResolution": "node", // 模块解析方式
       "strict": false, // 严格模式
       "resolveJsonModule": true, // 解析json模块
       "esModuleInterop": true, // 允许通过es6语法引入commonjs模块
       "jsx": "preserve", // jsx 不转义
       "lib": ["esnext", "dom"], // 支持的类库 esnext及dom
       "baseUrl": ".",
       "paths": {
         // 让子包之间的引用不报错
         "@vue/*": ["packages/*/src"]
       }
     }
   }
   ```

7. 测试子包间相互引用

   ```bash
   # 表示为子包 reactivity 安装 shared 包作为依赖
   $ pnpm install @vue/shared@workspace --filter @vue/reactivity
   ```

8. 配置 jest 测试环境，记得安装 jest vscode 插件噢~

   ```bash
   # 安装依赖
   $ pnpm install -Dw ts-jest @types/jest jest
   
   # 初始化 jest.config.js 配置文件
   $ pnpm ts-jest config:init
   ```

9. 编写开发环境下的打包脚本，首先安装依赖

   ```bash
   # minimist：用于读取命令行参数
   $ pnpm install esbuild minimist -Dw
   ```

10. 在 `scripts/dev.js` 中添加如下内容：

    ```js
    const { resolve } = require('path');
    const { build } = require('esbuild');
    // 解析命令行参数
    const args = require('minimist')(process.argv.slice(2));
    console.log('args: ', args);
    
    const target = args['_'][0] || 'reactivity';
    const format = args['f'] || 'global';
    // 获取到对应包的 package.json
    const pkg = require(resolve(__dirname, `../packages/${target}/package.json`));
    // 获取打包输出的格式
    const outputFormat = format.startsWith('global')
      ? 'iife'
      : format === 'cjs'
      ? 'cjs'
      : 'esm';
    
    // 打包后文件输出路径
    const outfile = resolve(
      __dirname,
      `../packages/${target}/dist/${target}.${format}.js`
    );
    build({
      entryPoints: [resolve(__dirname, `../packages/${target}/src/index.ts`)],
      outfile,
      bundle: true,
      sourcemap: true,
      format: outputFormat,
      globalName: pkg.buildOptions?.name,
      platform: format === 'cjs' ? 'node' : 'browser',
      watch: {
        // 监控文件变化
        onRebuild(error) {
          if (!error) console.log(`rebuilt~~~~`);
        },
      },
    }).then(() => {
      console.log('watching~~~');
    });
    ```

11. 在顶层 package.json 文件中添加运行脚本：

    ```json
    "scripts": {
      // reactivity 表示要打包的子包目录
      // -f esm 表示输出的包格式
      "dev": "node scripts/dev.js reactivity -f esm",
      "test": "jest"
    },
    ```

至此，vue3 源码编写环境就搭建完成啦。