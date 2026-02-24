

## 使用技巧

* 关注VS Code的更新文档
* 关注扩展市场，活用扩展增加工作效率
* 仔细查看官方文档
* 记忆并使用快捷键(Ctrl-K Crtl+S查看快捷键列表)
* VS Code对Git的支持非常好，配合插件开发体验极佳

## 插件

* **美化**
  * Material Theme: 高对比度主题
  * Background: 背景美化
* **通用**

* Auto Rename Tag: 标签自动重命名
* Auto Close Tag: 自动生成闭合标签
* Prettier Formatter: 代码格式化插件。(F1输入form格式化代码。)
* TODO Highlight: TODO高亮插件
* VSCode Icons: 文件目录ico图标　
* Deploy: 项目自动部署，文件同步。
* Dash: 快速打开[Zeal](https://zealdocs.org/)（Linux， Windows）或[Dash](https://itunes.apple.com/us/app/dash/id453187937?mt=8)（MacOs）的语言文档资料。(需要安装Zeal或者Dash。)
* Path Intellisense: 文件路径感知扩展
* Project Manager: 多项目管理
* Bracket Pair Colorizer ：括号呈现不同的颜色
* Settings Sync: 同步多台电脑的设置（[官方教程](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)）
* Polacode: 将代码生成图片
* Emacs Friendly Keymap: Emacs键位模拟器
* Bookmark: 标记、寻找代码块
* Todo Tree: 快速搜索、显示全局TODO

**Writing**
* Latex: Boost LaTeX typesetting efficiency with preview, compile, autocomplete, colorize, and more.
* Markdown PDF: This extension convert Markdown file to pdf, html, png or jpeg file.
* vscode-pdf: 在VSC中显示pdf文件。

**HTML**

* Color Highlight: 颜色预览
* HTML CSS Support: 增加.html中css的代码补全，可以手动增加配置文件来增加外部css中的class补全。详情见插件说明。
* Debugger for Chrome:方便js调试的插件，前端项目在Chrome中运行起来之后，可以直接在VSCode中打断点、查看输出、查看控制台，需要配置launch.json,详情见插件说明。
* Color Picker: 可以直接在编辑器里打开色板，选择各种模式的颜色。

**Git**

* Git History: 输入 git log有惊喜。
* Git Lens: 加强 Vs Code 本身的

**Python**

* Python (by Microsoft): 支持使用pylint分析代码，debug，IntelliSense，代码迁移，代码重构，单元测试，Python Snippets。（需要使用pip安装pylint）
* Python Docstring: 快速生成docstring。
* Better Comments: 生成更易读的注释。也可将注解分为:Alert, Query, TODO, Highlight四类。
* Trailing Spaces: 将尾部的空格高亮显示，并且可以一键删除。

**Javascript**

* Document This: 注释自动生成<br>双击 Ctrl+Alt+D

## 基本操作

1. 入门
2. 自定义
3. 扩展
4. 文件/文件夹管理
5. 编辑技巧
6. 智能感应功能
7. 代码片段
8. Git集成
9. 调试
10. 任务运行

下文提及的快捷键可能与机器最新设置不符，请参考官方快捷键说明。

## 1.入门

**打开命令面板**

轻松找出VS Code所有可用命令。

* Mac：`cmd+shift+p` or `f1`
* Windows / Linux：`ctrl+shift+p` or `f1`

![](https://pic3.zhimg.com/80/v2-3d00093cfb19db3eba758c584ef71c4d_hd.jpg)

**快捷键偏好设置**

所有命令（及其快捷键）均显示在命令面板中。如果忘记了如何操作，可随时查看。

**快速打开**

快速打开文件，或运行命令（见下文）。快速打开的文件必须处在已打开的文件夹或者Workspace中。

Mac: `cmd+p`

Windows / Linux: `ctrl+p`

键入“?”获取帮助。

**将命令复制粘贴到快速打开中**

键入`cmd+p` ，然后粘贴想要运行的命令，浏览扩展（插件）市场时尤为适用。

![](https://pic4.zhimg.com/80/v2-fe3e7d680eb792e71aeb2f70d2500f34_hd.jpg)![](https://pic4.zhimg.com/v2-1c96d879b481e301c1f289cdd90fd9d5_b.gif)

**命令行参数**

* Linux: Follow instructions [here](https://link.zhihu.com/?target=http%3A//code.visualstudio.com/docs/editor/setup%23_linux).
* Windows: Follow instructions [here](https://link.zhihu.com/?target=http%3A//code.visualstudio.com/docs/editor/setup%23_windows).
* Mac: see below.

Linux指南和Windows指南参考：[<span class="invisible">http://</span><span class="visible">code.visualstudio.com/d</span><span class="invisible">ocs/setup/setup-overview</span><span class="ellipsis"></span>](https://link.zhihu.com/?target=http%3A//code.visualstudio.com/docs/setup/setup-overview)。

Mac指南见下文：

打开命令面板（`F1`）→键入“shell command”→回车键执行“Shell Command: Install ‘code’ command in PATH”。
![](https://pic4.zhimg.com/80/v2-4ad6e9ed9df2052ae6c76619d2aaaa9c_hd.jpg)
```shell
# create a new window
code -n

# change the language
code --locale=es

# open diff editor
code --diff <file1> <file2>

# see help options
code --help
```

**.vscode文件夹**

工作区文件夹在 **.vscode** 中，比如任务运行是 **tasks.json**，检查漏洞是 **launch.json**。

**状态栏效果**

* 错误和警告
* Mac: `shift+cmd+m`* Windows / Linux: `ctrl+shift+m`

快速跳转到错误和警告。

按`f8`或`shift+f8`，循环错误检查。
![](https://pic2.zhimg.com/80/v2-c9bdf6401a1dc1f60226c6429f9c06d3_hd.gif)

**更新扩展**

更新扩展提示会出现在左下角状态栏。
![](https://pic1.zhimg.com/80/v2-d6389a208a8ae267da6d69977b6183e0_hd.gif)

**更改语言模式**

* Mac: `cmd+k` `m`
* Windows / Linux: `ctrl+k` `m`
![](https://pic4.zhimg.com/v2-9a9d769b4babd4d960f85ed020addcf5_b.gif）

## 2. 个人设置

这一部分个人发挥的空间很大，完整信息请参考：[<span class="invisible">http://</span><span class="visible">code.visualstudio.com/d</span><span class="invisible">ocs/customization/overview</span><span class="ellipsis"></span>](https://link.zhihu.com/?target=http%3A//code.visualstudio.com/docs/customization/overview)。

**设置编辑器**

打开settings.json。

* Mac: `cmd+,`
* Windows / Linux: File -&gt; Preferences -&gt; User Settings

_**更改字体大小：**”editor.fontSize”: 18_

_**更改标签大小：**”editor.tabSize”: 4_

_**空格/标签：**”editor.insertSpaces”: true_

_忽略文件/文件夹_

清除编辑窗口中的文件/文件夹。
```json
"files.exclude": {
"somefolder/": true,
"somefile": true
}
```

清除搜索结果中的文件/文件夹。
```json
"search.exclude": {
"someFolder/": true,
"somefile": true
}
```
更多内容请参考：[<span class="invisible">http://</span><span class="visible">code.visualstudio.com/d</span><span class="invisible">ocs/customization/userandworkspace</span><span class="ellipsis"></span>](https://link.zhihu.com/?target=http%3A//code.visualstudio.com/docs/customization/userandworkspace)。

 **预览主题**
![](https://pic2.zhimg.com/v2-7b59b41bacb50f1b0cd91adcfc1e5d3d_b.gif)

**JSON验证**
```json
"json.schemas": [
{
"fileMatch": [
"/bower.json"
],
"url": "http://json.schemastore.org/bower"
}
]
```
对于工作区中的模式：
```json
"json.schemas": [
{
"fileMatch": [
"/foo.json"
],
"url": "./myschema.json"
}
]
```
自定义模式：
```json
"json.schemas": [
{
"fileMatch": [
"/.myconfig"
],
"schema": {
"type": "object",
"properties": {
"name" : {
"type": "string",
"description": "The name of the entry"
}
}
}
},
```
更多内容请参考：[<span class="invisible">http://</span><span class="visible">code.visualstudio.com/d</span><span class="invisible">ocs/languages/json</span><span class="ellipsis"></span>](https://link.zhihu.com/?target=http%3A//code.visualstudio.com/docs/languages/json)。

## 3.扩展

**贡献点**

参考：[<span class="invisible">http://</span><span class="visible">code.visualstudio.com/d</span><span class="invisible">ocs/extensionAPI/extension-points</span><span class="ellipsis"></span>](https://link.zhihu.com/?target=http%3A//code.visualstudio.com/docs/extensionAPI/extension-points)

* 配置
* 命令
* 快捷键
* 语言
* 调试器
* 语法
* 主题
* 代码片段
* json验证

**找到扩展**

1.  官方VS Code市场；
2.  搜索产品（见下文）；
3.  浏览扩展推荐（见下文）；
4.  社区扩展产品，如[awesome-vscode](https://link.zhihu.com/?target=https%3A//github.com/viatsko/awesome-vscode)。

**安装扩展**

Mac：`cmd+shift+p`

Windows / Linux：`ctrl+shift+p`

然后键入“ext install”。选择合适的扩展，再按回车键。

![](https://pic4.zhimg.com/v2-fc324d8b9b8b5afe5f5624878255b096_b.gif)

**扩展推荐**

Mac: `cmd+shift+p`

Windows / Linux: `ctrl+shift+p`

键入“ext”→选择“Show Extension Recommendations”
 
![](https://pic1.zhimg.com/v2-dc2dd6c308e7063ae236b2a4d69ae72e_b.gif)

**卸载扩展**

Mac: `cmd+shift+p`

Windows / Linux: `ctrl+shift+p`

键入“ext”→选择“Show Installed Extensions”→点击extension card右下角的“x”
![](https://pic1.zhimg.com/v2-bd723d13d255d8919622dda11a7628bb_b.gif)

## 4.文件和文件夹管理

**OS X布局**

使用任务控制，将终端窗口和VS Code放在同一个屏幕上，就得到一个整合的终端啦！
![](https://pic1.zhimg.com/80/v2-16a59fdc205f5c6f24d3ec46939640ba_hd.jpg)

**自动保存**

用`cmd+`,打开`settings.json`：

```json
files.autoSave": "afterDelay"
```

**开启侧边栏**

* Mac: `cmd+b`
* Windows / Linux: `ctrl+b`![](https://pic2.zhimg.com/v2-483e6b27f1df72d0ccdc7d0e10dd2220_b.gif)

**分割（Side by side）编辑**

* Mac: `cmd+\` or `cmd` then click a file from the file browser.
* Windows / Linux: `ctrl+\`* Linux: `ctrl+2`

![](https://pic3.zhimg.com/v2-0d8606d3ce00f93633eabba4ee667c50_b.gif)

**编辑器切换**

* Mac: `cmd+1`, `cmd+2`, `cmd+3`
* Windows / Linux: `ctrl+1`, `ctrl+2`, `ctrl+3`

![](https://pic3.zhimg.com/v2-c77d80dc10f1016f0e691745112ce51d_b.gif)

**切换到资源管理器窗口（explorer window）**

* Mac: **cmd+shift+e**
* Windows / Linux: **ctrl+shift+e**

**关闭当前文件夹**

* Linux: `ctrl+k` `f`

**历史**

用`ctrl+tab`来浏览历史

**向后浏览：**

* Mac: `ctrl+-`
* Windows / Linux: `alt+left`

**向前浏览：**

* Mac: `ctrl+shift+up`
* Windows / Linux: `alt+right`

![](https://pic4.zhimg.com/v2-50bd0d44e7822e80d100efea07b69f37_b.gif)

**打开文件**

* Mac: `cmd+e` or `cmd+p`
* Windows / Linux: `ctrl+e` or `ctrl+p`

![](https://pic3.zhimg.com/v2-bd7a52d8ca4a2f9603160b115b26a8a3_b.gif)

**文件关联**

为无法精确检测的文件设置语言关联（即配置文件）：
```json
"file.associations": {
".eslintrc": "json"
}
```

## 5.编辑技巧

**括号匹配**

更多内容请参考：[<span class="invisible">http://</span><span class="visible">code.visualstudio.com/d</span><span class="invisible">ocs/editor/editingevolved</span><span class="ellipsis"></span>](https://link.zhihu.com/?target=http%3A//code.visualstudio.com/docs/editor/editingevolved)

* Mac: `cmd+shift+\`
* Windows / Linux: `ctrl+shift+\`
* ![](https://pic4.zhimg.com/v2-530567e1d01d1714b80d2e3f272df214_b.gif)

**多游标选择**

更多内容请参考：[<span class="invisible">http://</span><span class="visible">code.visualstudio.com/d</span><span class="invisible">ocs/editor/editingevolved</span><span class="ellipsis"></span>](https://link.zhihu.com/?target=http%3A//code.visualstudio.com/docs/editor/editingevolved)

* Mac: `opt+cmd+up` or `opt+cmd+down`
* Windows: `ctrl+alt+up` or `ctrl+alt+down`
* Linux: `alt+shift+up` or `alt+shift+down`
  
![](https://pic4.zhimg.com/v2-e99f499257a71c0e8049e05cddaace90_b.gif)

![](https://pic1.zhimg.com/v2-94360a89295bd3afb84a3efd463ea5d7_b.gif)


为当前选择添加游标。
![](https://pic3.zhimg.com/v2-6f6ac0a922c9496358eadadb1a76ced5_b.gif)

**复制一行**

* Mac: `opt+shift+up` or `opt+shift+down`
* Windows / Linux([Issue #5363](https://link.zhihu.com/?target=https%3A//github.com/Microsoft/vscode/issues/5363)): `shift+alt+down` or `shift+alt+up`

![](https://pic4.zhimg.com/v2-e5b137cd1f671df8acc4355c54b69bdc_b.gif)

**缩小/扩大选择**

更多内容请参考：[<span class="invisible">http://</span><span class="visible">code.visualstudio.com/d</span><span class="invisible">ocs/editor/editingevolved</span><span class="ellipsis"></span>](https://link.zhihu.com/?target=http%3A//code.visualstudio.com/docs/editor/editingevolved)

* Mac: `ctrl+shift+cmd+left` or `ctrl+shift+cmd+right`
* Windows / Linux: `shift+alt+left` or `shift+alt+right`

![](https://pic1.zhimg.com/v2-5cf156cafe3a3763112c237dd4ddf8b1_b.gif)n></figure>

**符号查找**

* Mac: `cmd+shift+o`
* Windows / Linux: `ctrl+shift+o`

![](https://pic4.zhimg.com/v2-907479da8bdad0f76d4f43eb126f53db_b.gif)

**定位特定的一行**

* Mac: `ctrl+g` or `cmd+p` `, :`* Windows / Linux: `ctrl+g`

![](https://pic4.zhimg.com/v2-373d834ea1681ec2a2e28587a1b8d81b_b.gif)

**撤销游标位置**

* Mac: `cmd+u`
* Windows / Linux: `ctrl+u`

![](https://pic2.zhimg.com/v2-908aa10d9a78ff849243f83f3ca07a85_b.gif)>

**上下移动一行**

* Mac: `opt+up` or `opt+down`
* Windows / Linux: `alt+up` or `alt+down`

![](https://pic2.zhimg.com/v2-1337cc0d48dd18350daffca514097580_b.gif)

**修整行尾空格**

* Mac: `cmd+shift+x`
* Windows / Linux: `ctrl+shift+x`
  
![](https://pic2.zhimg.com/v2-8775e91ae2d8a77c93cebf85f2bc3860_b.gif)

**代码格式化**

* Mac: `opt+shift+f`
* Windows / Linux: `shift+alt+f`

![](https://pic3.zhimg.com/v2-cd5d341ec012e312618b8f7d049585ba_b.gif)


**代码折叠**

* Mac: `shift+cmd+[` and `shift+cmd+]`
* Windows / Linux: `ctrl+shift+[` and `ctrl+shift+]`![](https://pic2.zhimg.com/v2-a136700606899a79821f0b0d3a2cbf06_b.gif)

**选择当前一行**

* Mac: `cmd+i`
* Windows / Linux: `ctrl+i`![](https://pic4.zhimg.com/v2-ad569606f98e79ce82fa051c95ba2fe9_b.gif)

**回到文件开端/末尾**

* Mac: `cmd+up` and `cmd+down`
* Windows: `ctrl+up` and `ctrl+down`
* Linux: `ctrl+home` and `ctrl+end`![](https://pic3.zhimg.com/v2-6b662d2301b15c57d7dcefe92e4b9c5d_b.gif)

**打开README预览**

在markdown文件中使用：

* Mac: `shift+cmd+v`
* Windows / Linux: `ctrl+shift+v`![](https://pic1.zhimg.com/v2-47f3b5ec91700a82861a44e85cb55b51_b.gif)

**分割（Side by Side）Markdown编辑和预览**

在markdown文件中使用：

* Linux: `ctrl+k v`

## 6.智能感应

试用`ctrl+space`来启动建议栏，这一条可以说是最有用的建议了。
![](https://pic1.zhimg.com/v2-ae3483dc7e4cf16d59dc0d4afb3f9dd5_b.gif)

可浏览可用的方法、参数以及简短文档等等。

## 预览（peek）

选择一个符号，键入`alt+f12`，或者使用快捷菜单。
![](https://pic3.zhimg.com/v2-297fd5795f6dcc17f58cff17ee476e56_b.gif)

**转到定义**

选择一个符号，键入`f12`，或者使用快捷菜单。
![](https://pic4.zhimg.com/v2-7979108cffbdb6bca75e655fe23bf275_b.gif)

**查找所有引用**

选择一个符号，键入`shift+f12`，或者使用快捷菜单。
![](https://pic2.zhimg.com/v2-1cdeea04827b2e8d14eee99499457a23_b.gif)

**符号重命名**

选择一个符号，键入`f2`，或者使用快捷菜单。
![](https://pic4.zhimg.com/v2-d40d88c131a7f1bcac57123b8d7058e6_b.gif)

**jsconfig.json**

在 **javascript** 源文件根上配置 **jsconfig.json**，就可以使用 **ES6 **了。
‵‵`json
{
    "compilerOptions": {
        "target": "ES6",
        "module": "commonjs"
    }, "exclude": [
        "npm_modules"
    ]
}
```

**.eslintrc.json**

安装[eslint extension](https://link.zhihu.com/?target=https%3A//marketplace.visualstudio.com/items%3FitemName%3Ddbaeumer.vscode-eslint)。按照个人喜好配置。具体说明参考：[<span class="invisible">http://</span><span class="visible">eslint.org/docs/user-gu</span><span class="invisible">ide/configuring</span><span class="ellipsis"></span>](https://link.zhihu.com/?target=http%3A//eslint.org/docs/user-guide/configuring)

以下是使用es6的配置。

```json
{
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "classes": true,
            "defaultParams": true
        }
    },
    "rules": {
        "no-const-assign": 1,
        "no-extra-semi": 0,
        "semi": 0,
        "no-fallthrough": 0,
        "no-empty": 0,
        "no-mixed-spaces-and-tabs": 0,
        "no-redeclare": 0,
        "no-this-before-super": 1,
        "no-undef": 1,
        "no-unreachable": 1,
        "no-use-before-define": 0,
        "constructor-super": 1,
        "curly": 0,
        "eqeqeq": 0,
        "func-names": 0,
        "valid-typeof": 1
    }
}
```

**package.json**

参考package.json文件中的智能感应功能。
![](https://pic4.zhimg.com/v2-4000bab7d830722a681bc8fe04199255_b.gif)

**安装typings应用**

安装[typings](https://link.zhihu.com/?target=https%3A//github.com/typings/typings)来引进.d.ts文件来激活javascript智能感应功能。
```shell
npm install typings --global

# Search for definitions.
typings search tape

# Find an available definition (by name).
typings search --name react

# Install typings (DT is "ambient", make sure to enable the flag and persist the selection in `typings.json`).
typings install react --ambient --save
```

install会创建一个typings文件夹。VS Code会引用.d.ts文件来启动智能感应功能。

**Emmet语法**

[Emmet语法支持](https://link.zhihu.com/?target=http%3A//code.visualstudio.com/docs/languages/html)
![](https://pic3.zhimg.com/v2-1d1f5d645a8a2e497453ab00563de75e_b.gif)

## 7.代码片段

**创建自定义代码**

**File -&gt; Preferences -&gt; User Snippets**，选择语言，创建代码片段。

```json
"create component": {
    "prefix": "component",
    "body": [
        "class $1 extends React.Component {",
        "",
        "   render() {",
        "       return ($2);",
        "   }",
        "",
        "}"
    ]
},
```

更多内容请参考：[<span class="invisible">http://</span><span class="visible">code.visualstudio.com/d</span><span class="invisible">ocs/customization/userdefinedsnippets</span><span class="ellipsis"></span>](https://link.zhihu.com/?target=http%3A//code.visualstudio.com/docs/customization/userdefinedsnippets)

## 8.Git集成

Git工作流的流畅集成。

**Diffs**

点击Git图标，选择要diff的文件。
![](https://pic2.zhimg.com/80/v2-24a8c4fe626ea41e2b5075aea0f95fc2_hd.jpg)

**分割（Side by side）**

默认的是分割diff。
![](https://pic4.zhimg.com/80/v2-e3d9448c27716fa6a03d9018a964a2b6_hd.jpg)
**内联视图**

点击下图所示的“more”选项来启动内联视图。
![](https://pic2.zhimg.com/80/v2-c6d9e22be47c3dac3f99ddf054f43848_hd.jpg)

**分支**

通过状态栏可轻松切换分支。
![](https://pic4.zhimg.com/v2-8626cb1f2176c58b609b422ae2aa7bdf_b.jpg)

**Staging**

* Stage所有文件

一次选择多个文件，再点击加号按钮。
![](https://pic1.zhimg.com/v2-30397e5256377e34d14611f8557af047_b.gif)

* Stage选择

Stage文件一部分的方法是：使用箭头选择该文件，然后点击“more”按钮来stage“selected lines”。
![](https://pic1.zhimg.com/v2-0ad5910c526bfdef297d97bea9f4d2a2_b.gif)

**撤销最近一次命令**
![](https://pic3.zhimg.com/v2-93bc8d161ff97fe5d8e72eb9fcc21c6a_b.gif)

**查看Git输出**

有时难免需要了解工具的运行状况。有了VS Code，查看正在运行的命令更简单，这对于Git学习或是解决源代码管理问题尤为有帮助。

Mac: `shift+cmd+u`

Windows / Linux: `ctrl+shift+u`

运行toggleOutput要下拉选择Git。

**边槽指示器**

查看编辑器中的diff设置。更多内容请参考：[<span class="invisible">http://</span><span class="visible">code.visualstudio.com/d</span><span class="invisible">ocs/editor/editingevolved</span><span class="ellipsis"></span>](https://link.zhihu.com/?target=http%3A//code.visualstudio.com/docs/editor/editingevolved)
![](https://pic2.zhimg.com/80/v2-88a887a42bb55271050d29e991d16f55_hd.jpg)

**消除合并冲突**

在合并时点击git图标，在diff view里做更改。

**将VS Code设置为默认合并工具**
<div class="highlight"><pre>`<span></span>git config --global merge.tool code
`</pre></div>

## 9.调试

**配置调试器**

点击F1，选择“Debug: Open Launch.json”，再选择环境，随后产生一个launch.json文件。Node.js等环境可以直接运行，可能需要额外配置其他语言。更多内容请参考：[<span class="invisible">http://</span><span class="visible">code.visualstudio.com/d</span><span class="invisible">ocs/editor/debugging</span><span class="ellipsis"></span>](https://link.zhihu.com/?target=http%3A//code.visualstudio.com/docs/editor/debugging)
![](https://pic3.zhimg.com/v2-cbc7fd4f98e84279bf4ce5a1d68dcd8d_b.gif)

**断点和逐句通过**

断点应在行数旁边。用调试插件向前浏览。
![](https://pic4.zhimg.com/v2-b4370da3c1b3525e11f42d7a16e49830_b.gif)

**数据检查**

检查变量在调试面板和控制台里。
![](https://pic4.zhimg.com/v2-aa0a69b4fc8623bf325a8cd043e6ef88_b.gif)

## 10.任务运行

**自动检测任务**

按下`f1`，键入“Configure Task”，然后选择“Configure Task Runner”，会生成一个**task.json**文件，内容如下。更多内容请参考：[<span class="invisible">http://</span><span class="visible">code.visualstudio.com/d</span><span class="invisible">ocs/editor/tasks</span><span class="ellipsis"></span>](https://link.zhihu.com/?target=http%3A//code.visualstudio.com/docs/editor/tasks)

```javascript
{
// See http://go.microsoft.com/fwlink/?LinkId=733558
// for the documentation about the tasks.json format
    "version": "0.1.0",
    "command": "npm",
    "isShellCommand": true,
    "showOutput": "always",
    "suppressTaskName": true,
    "tasks": [
        {
            "taskName": "install",
            "args": ["install"]
        },
        {
            "taskName": "build",
            "args": ["run", "build"]
        }
    ]
}
```

自动生成有时会出问题。参考上文的网址来了解正确操作方法。

**在命令面板上运行任务**

点击`f1`，运行命令“Run Task”，然后选择要运行的任务。运行“Terminate Running Task”来终止运行该命令。
![](https://pic4.zhimg.com/v2-c94c5191c679fd139ca9a9589be5a159_b.gif)

转自：https://zhuanlan.zhihu.com/p/34989844



## 快捷键列表


<table><thead><tr><th align="left">
按 Press</th>
<th align="left">
功能 Function</th>
</tr></thead><tbody><tr><td align="left">
Ctrl + Shift + P，F1</td>
<td align="left">
显示命令面板 Show Command Palette</td>
</tr><tr><td align="left">
Ctrl + P</td>
<td align="left">
快速打开 Quick Open</td>
</tr><tr><td align="left">
Ctrl + Shift + N</td>
<td align="left">
新窗口/实例 New window/instance</td>
</tr><tr><td align="left">
Ctrl + Shift + W</td>
<td align="left">
关闭窗口/实例 Close window/instance</td>
</tr></tbody></table><h2 id="articleHeader1"><a name="t0"></a><a target="_blank"></a>
基础编辑 Basic editing</h2>
<table><thead><tr><th align="left">
按 Press</th>
<th align="left">
功能 Function</th>
</tr></thead><tbody><tr><td align="left">
Ctrl+X</td>
<td align="left">
剪切行（空选定） Cut line (empty selection)</td>
</tr><tr><td align="left">
Ctrl+C</td>
<td align="left">
复制行（空选定）Copy line (empty selection)</td>
</tr><tr><td align="left">
Alt+ ↑ / ↓</td>
<td align="left">
向上/向下移动行 Move line up/down</td>
</tr><tr><td align="left">
Shift+Alt + ↓ / ↑</td>
<td align="left">
向上/向下复制行 Copy line up/down</td>
</tr><tr><td align="left">
Ctrl+Shift+K</td>
<td align="left">
删除行 Delete line</td>
</tr><tr><td align="left">
Ctrl+Enter</td>
<td align="left">
在下面插入行 Insert line below</td>
</tr><tr><td align="left">
Ctrl+Shift+Enter</td>
<td align="left">
在上面插入行 Insert line above</td>
</tr><tr><td align="left">
Ctrl+Shift+\</td>
<td align="left">
跳到匹配的括号 Jump to matching bracket</td>
</tr><tr><td align="left">
Ctrl+] / [</td>
<td align="left">
缩进/缩进行 Indent/outdent line</td>
</tr><tr><td align="left">
Home</td>
<td align="left">
转到行首 Go to beginning of line</td>
</tr><tr><td align="left">
End</td>
<td align="left">
转到行尾 Go to end of line</td>
</tr><tr><td align="left">
Ctrl+Home</td>
<td align="left">
转到文件开头 Go to beginning of file</td>
</tr><tr><td align="left">
Ctrl+End</td>
<td align="left">
转到文件末尾 Go to end of file</td>
</tr><tr><td align="left">
Ctrl+↑ / ↓</td>
<td align="left">
向上/向下滚动行 Scroll line up/down</td>
</tr><tr><td align="left">
Alt+PgUp / PgDown</td>
<td align="left">
向上/向下滚动页面 Scroll page up/down</td>
</tr><tr><td align="left">
Ctrl+Shift+[</td>
<td align="left">
折叠（折叠）区域 Fold (collapse) region</td>
</tr><tr><td align="left">
Ctrl+Shift+]</td>
<td align="left">
展开（未折叠）区域 Unfold (uncollapse) region</td>
</tr><tr><td align="left">
Ctrl+K Ctrl+[</td>
<td align="left">
折叠（未折叠）所有子区域 Fold (collapse) all subregions</td>
</tr><tr><td align="left">
Ctrl+K Ctrl+]</td>
<td align="left">
展开（未折叠）所有子区域 Unfold (uncollapse) all subregions</td>
</tr><tr><td align="left">
Ctrl+K Ctrl+0</td>
<td align="left">
折叠（折叠）所有区域 Fold (collapse) all regions</td>
</tr><tr><td align="left">
Ctrl+K Ctrl+J</td>
<td align="left">
展开（未折叠）所有区域 Unfold (uncollapse) all regions</td>
</tr><tr><td align="left">
Ctrl+K Ctrl+C</td>
<td align="left">
添加行注释 Add line comment</td>
</tr><tr><td align="left">
Ctrl+K Ctrl+U</td>
<td align="left">
删除行注释 Remove line comment</td>
</tr><tr><td align="left">
Ctrl+/</td>
<td align="left">
切换行注释 Toggle line comment</td>
</tr><tr><td align="left">
Shift+Alt+A</td>
<td align="left">
切换块注释 Toggle block comment</td>
</tr><tr><td align="left">
Alt+Z</td>
<td align="left">
切换换行 Toggle word wrap</td>
</tr></tbody></table><h2 id="articleHeader2"><a name="t1"></a><a target="_blank"></a>
导航 Navigation</h2>
<table><thead><tr><th align="left">
按 Press</th>
<th align="left">
功能 Function</th>
</tr></thead><tbody><tr><td align="left">
Ctrl + T</td>
<td align="left">
显示所有符号 Show all Symbols</td>
</tr><tr><td align="left">
Ctrl + G</td>
<td align="left">
转到行… Go to Line…</td>
</tr><tr><td align="left">
Ctrl + P</td>
<td align="left">
转到文件… Go to File…</td>
</tr><tr><td align="left">
Ctrl + Shift + O</td>
<td align="left">
转到符号… Go to Symbol…</td>
</tr><tr><td align="left">
Ctrl + Shift + M</td>
<td align="left">
显示问题面板 Show Problems panel</td>
</tr><tr><td align="left">
F8</td>
<td align="left">
转到下一个错误或警告 Go to next error or warning</td>
</tr><tr><td align="left">
Shift + F8</td>
<td align="left">
转到上一个错误或警告 Go to previous error or warning</td>
</tr><tr><td align="left">
Ctrl + Shift + Tab</td>
<td align="left">
导航编辑器组历史记录 Navigate editor group history</td>
</tr><tr><td align="left">
Alt + ←/→</td>
<td align="left">
返回/前进 Go back / forward</td>
</tr><tr><td align="left">
Ctrl + M</td>
<td align="left">
切换选项卡移动焦点 Toggle Tab moves focus</td>
</tr></tbody></table><h2 id="articleHeader3"><a name="t2"></a><a target="_blank"></a>
搜索和替换 Search and replace</h2>
<table><thead><tr><th align="left">
按 Press</th>
<th align="left">
功能 Function</th>
</tr></thead><tbody><tr><td align="left">
Ctrl + F</td>
<td align="left">
查找 Find</td>
</tr><tr><td align="left">
Ctrl + H</td>
<td align="left">
替换 Replace</td>
</tr><tr><td align="left">
F3 / Shift + F3</td>
<td align="left">
查找下一个/上一个 Find next/previous</td>
</tr><tr><td align="left">
Alt + Enter</td>
<td align="left">
选择查找匹配的所有出现 Select all occurences of Find match</td>
</tr><tr><td align="left">
Ctrl + D</td>
<td align="left">
将选择添加到下一个查找匹配 Add selection to next Find match</td>
</tr><tr><td align="left">
Ctrl + K Ctrl + D</td>
<td align="left">
将最后一个选择移至下一个查找匹配项 Move last selection to next Find match</td>
</tr><tr><td align="left">
Alt + C / R / W</td>
<td align="left">
切换区分大小写/正则表达式/整个词 Toggle case-sensitive / regex / whole word</td>
</tr></tbody></table><h2 id="articleHeader4"><a name="t3"></a><a target="_blank"></a>
多光标和选择 Multi-cursor and selection</h2>
<table><thead><tr><th align="left">
按 Press</th>
<th align="left">
功能 Function</th>
</tr></thead><tbody><tr><td align="left">
Alt +单击</td>
<td align="left">
插入光标 Insert cursor</td>
</tr><tr><td align="left">
Ctrl + Alt +↑/↓</td>
<td align="left">
在上/下插入光标 Insert cursor above / below</td>
</tr><tr><td align="left">
Ctrl + U</td>
<td align="left">
撤消上一个光标操作 Undo last cursor operation</td>
</tr><tr><td align="left">
Shift + Alt + I</td>
<td align="left">
在选定的每一行的末尾插入光标 Insert cursor at end of each line selected</td>
</tr><tr><td align="left">
Ctrl + I</td>
<td align="left">
选择当前行 Select current line</td>
</tr><tr><td align="left">
Ctrl + Shift + L</td>
<td align="left">
选择当前选择的所有出现 Select all occurrences of current selection</td>
</tr><tr><td align="left">
Ctrl + F2</td>
<td align="left">
选择当前字的所有出现 Select all occurrences of current word</td>
</tr><tr><td align="left">
Shift + Alt + →</td>
<td align="left">
展开选择 Expand selection</td>
</tr><tr><td align="left">
Shift + Alt + ←</td>
<td align="left">
缩小选择 Shrink selection</td>
</tr><tr><td align="left">
Shift + Alt + （拖动鼠标）</td>
<td align="left">
列（框）选择 Column (box) selection</td>
</tr><tr><td align="left">
Ctrl + Shift + Alt +（箭头键）</td>
<td align="left">
列（框）选择 Column (box) selection</td>
</tr><tr><td align="left">
Ctrl + Shift + Alt + PgUp / PgDown</td>
<td align="left">
列（框）选择页上/下 Column (box) selection page up/down</td>
</tr></tbody></table><h2 id="articleHeader5"><a name="t4"></a><a target="_blank"></a>
丰富的语言编辑 Rich languages editing</h2>
<table><thead><tr><th align="left">
按 Press</th>
<th align="left">
功能 Function</th>
</tr></thead><tbody><tr><td align="left">
Ctrl + 空格</td>
<td align="left">
触发建议 Trigger suggestion</td>
</tr><tr><td align="left">
Ctrl + Shift + Space</td>
<td align="left">
触发器参数提示 Trigger parameter hints</td>
</tr><tr><td align="left">
Tab</td>
<td align="left">
Emmet 展开缩写 Emmet expand abbreviation</td>
</tr><tr><td align="left">
Shift + Alt + F</td>
<td align="left">
格式化文档 Format document</td>
</tr><tr><td align="left">
Ctrl + K Ctrl + F</td>
<td align="left">
格式选定区域 Format selection</td>
</tr><tr><td align="left">
F12</td>
<td align="left">
转到定义 Go to Definition</td>
</tr><tr><td align="left">
Alt + F12</td>
<td align="left">
Peek定义 Peek Definition</td>
</tr><tr><td align="left">
Ctrl + K F12</td>
<td align="left">
打开定义到边 Open Definition to the side</td>
</tr><tr><td align="left">
Ctrl + .</td>
<td align="left">
快速解决 Quick Fix</td>
</tr><tr><td align="left">
Shift + F12</td>
<td align="left">
显示引用 Show References</td>
</tr><tr><td align="left">
F2</td>
<td align="left">
重命名符号 Rename Symbol</td>
</tr><tr><td align="left">
Ctrl + Shift + . /，</td>
<td align="left">
替换为下一个/上一个值 Replace with next/previous value</td>
</tr><tr><td align="left">
Ctrl + K Ctrl + X</td>
<td align="left">
修剪尾随空格 Trim trailing whitespace</td>
</tr><tr><td align="left">
Ctrl + K M</td>
<td align="left">
更改文件语言 Change file language</td>
</tr></tbody></table><h2 id="articleHeader6"><a name="t5"></a><a target="_blank"></a>
编辑器管理 Editor management</h2>
<table><thead><tr><th align="left">
按 Press</th>
<th align="left">
功能 Function</th>
</tr></thead><tbody><tr><td align="left">
Ctrl+F4, Ctrl+W</td>
<td align="left">
关闭编辑器 Close editor</td>
</tr><tr><td align="left">
Ctrl+K F</td>
<td align="left">
关闭文件夹 Close folder</td>
</tr><tr><td align="left">
Ctrl+\</td>
<td align="left">
拆分编辑器 Split editor</td>
</tr><tr><td align="left">
Ctrl+ 1 / 2 / 3</td>
<td align="left">
聚焦到第1，第2或第3编辑器组 Focus into 1st, 2nd or 3rd editor group</td>
</tr><tr><td align="left">
Ctrl+K Ctrl+ ←/→</td>
<td align="left">
聚焦到上一个/下一个编辑器组 Focus into previous/next editor group</td>
</tr><tr><td align="left">
Ctrl+Shift+PgUp / PgDown</td>
<td align="left">
向左/向右移动编辑器 Move editor left/right</td>
</tr><tr><td align="left">
Ctrl+K ← / →</td>
<td align="left">
移动活动编辑器组 Move active editor group</td>
</tr></tbody></table><h2 id="articleHeader7"><a name="t6"></a><a target="_blank"></a>
文件管理 File management</h2>
<table><thead><tr><th align="left">
按 Press</th>
<th align="left">
功能 Function</th>
</tr></thead><tbody><tr><td align="left">
Ctrl+N</td>
<td align="left">
新文件 New File</td>
</tr><tr><td align="left">
Ctrl+O</td>
<td align="left">
打开文件… Open File…</td>
</tr><tr><td align="left">
Ctrl+S</td>
<td align="left">
保存 Save</td>
</tr><tr><td align="left">
Ctrl+Shift+S</td>
<td align="left">
另存为… Save As…</td>
</tr><tr><td align="left">
Ctrl+K S</td>
<td align="left">
全部保存 Save All</td>
</tr><tr><td align="left">
Ctrl+F4</td>
<td align="left">
关闭 Close</td>
</tr><tr><td align="left">
Ctrl+K Ctrl+W</td>
<td align="left">
关闭所有 Close All</td>
</tr><tr><td align="left">
Ctrl+Shift+T</td>
<td align="left">
重新打开关闭的编辑器 Reopen closed editor</td>
</tr><tr><td align="left">
Ctrl+K</td>
<td align="left">
输入保持打开 Enter Keep Open</td>
</tr><tr><td align="left">
Ctrl+Tab</td>
<td align="left">
打开下一个 Open next</td>
</tr><tr><td align="left">
Ctrl+Shift+Tab</td>
<td align="left">
打开上一个 Open previous</td>
</tr><tr><td align="left">
Ctrl+K P</td>
<td align="left">
复制活动文件的路径 Copy path of active file</td>
</tr><tr><td align="left">
Ctrl+K R</td>
<td align="left">
显示资源管理器中的活动文件 Reveal active file in Explorer</td>
</tr><tr><td align="left">
Ctrl+K O</td>
<td align="left">
显示新窗口/实例中的活动文件 Show active file in new window/instance</td>
</tr></tbody></table><h2 id="articleHeader8"><a name="t7"></a><a target="_blank"></a>
显示 Display</h2>
<table><thead><tr><th align="left">
按 Press</th>
<th align="left">
功能 Function</th>
</tr></thead><tbody><tr><td align="left">
F11</td>
<td align="left">
切换全屏 Toggle full screen</td>
</tr><tr><td align="left">
Shift+Alt+1</td>
<td align="left">
切换编辑器布局 Toggle editor layout</td>
</tr><tr><td align="left">
Ctrl+ = / -</td>
<td align="left">
放大/缩小 Zoom in/out</td>
</tr><tr><td align="left">
Ctrl+B</td>
<td align="left">
切换侧栏可见性 Toggle Sidebar visibility</td>
</tr><tr><td align="left">
Ctrl+Shift+E</td>
<td align="left">
显示浏览器/切换焦点 Show Explorer / Toggle focus</td>
</tr><tr><td align="left">
Ctrl+Shift+F</td>
<td align="left">
显示搜索 Show Search</td>
</tr><tr><td align="left">
Ctrl+Shift+G</td>
<td align="left">
显示Git Show Git</td>
</tr><tr><td align="left">
Ctrl+Shift+D</td>
<td align="left">
显示调试 Show Debug</td>
</tr><tr><td align="left">
Ctrl+Shift+X</td>
<td align="left">
显示扩展 Show Extensions</td>
</tr><tr><td align="left">
Ctrl+Shift+H</td>
<td align="left">
替换文件 Replace in files</td>
</tr><tr><td align="left">
Ctrl+Shift+J</td>
<td align="left">
切换搜索详细信息 Toggle Search details</td>
</tr><tr><td align="left">
Ctrl+Shift+C</td>
<td align="left">
打开新命令提示符/终端 Open new command prompt/terminal</td>
</tr><tr><td align="left">
Ctrl+Shift+U</td>
<td align="left">
显示输出面板 Show Output panel</td>
</tr><tr><td align="left">
Ctrl+Shift+V</td>
<td align="left">
切换Markdown预览 Toggle Markdown preview</td>
</tr><tr><td align="left">
Ctrl+K V</td>
<td align="left">
从旁边打开Markdown预览 Open Markdown preview to the side</td>
</tr></tbody></table><h2 id="articleHeader9"><a name="t8"></a><a target="_blank"></a>
调试 Debug</h2>
<table><thead><tr><th align="left">
按 Press</th>
<th align="left">
功能 Function</th>
</tr></thead><tbody><tr><td align="left">
F9</td>
<td align="left">
切换断点 Toggle breakpoint</td>
</tr><tr><td align="left">
F5</td>
<td align="left">
开始/继续 Start/Continue</td>
</tr><tr><td align="left">
Shift+F5</td>
<td align="left">
停止 Stop</td>
</tr><tr><td align="left">
F11 / Shift+F11</td>
<td align="left">
下一步/上一步 Step into/out</td>
</tr><tr><td align="left">
F10</td>
<td align="left">
跳过 Step over</td>
</tr><tr><td align="left">
Ctrl+K Ctrl+I</td>
<td align="left">
显示悬停 Show hover</td>
</tr></tbody></table><h2 id="articleHeader10"><a name="t9"></a><a target="_blank"></a>
集成终端 Integrated terminal</h2>
<p>
</p><table><thead><tr><th align="left">
按 Press</th>
<th align="left">
功能 Function</th>
</tr></thead><tbody><tr><td align="left">
Ctrl+`</td>
<td align="left">
显示集成终端 Show integrated terminal</td>
</tr><tr><td align="left">
Ctrl+Shift+`</td>
<td align="left">
创建新终端 Create new terminal</td>
</tr><tr><td align="left">
Ctrl+Shift+C</td>
<td align="left">
复制选定 Copy selection</td>
</tr><tr><td align="left">
Ctrl+Shift+V</td>
<td align="left">
粘贴到活动端子 Paste into active terminal</td>
</tr><tr><td align="left">
Ctrl+↑ / ↓</td>
<td align="left">
向上/向下滚动 Scroll up/down</td>
</tr><tr><td align="left">
Shift+PgUp / PgDown</td>
<td align="left">
向上/向下滚动页面 Scroll page up/down</td>
</tr><tr><td align="left">
Ctrl+Home / End</td>
<td align="left">
滚动到顶部/底部 Scroll to top/bottom</td>
</tr></tbody></table>
