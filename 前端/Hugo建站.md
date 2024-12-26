---
title: "First_blog"
date: 2023-03-19T14:28:54+08:00
draft: false
---

## Hugo部署静态网页

### 1. 创建博客的命令

在网站文件的根目录下打开cmd，运行下面命令：

```
hugo new posts/first_post.md
```

其中 posts/博客名.md 表示在posts目录下创建一个.md文件，该文档用markdown语法进行编写，很方便

### 2. 生成静态网页地址源码

```C
hugo --theme=主题名称 --baseUrl="仓库地址"
```

### 3. Git全局设置用户名和邮箱

```
git config --global user.name "Hishallyi"
```

```
git config --global user.email "email@163.com"
```

```
git config --global user.password "123456"
```

​	可以通过以下命令查看全局设置的信息：

```
git config user.name
git config user.email
git config user.password
```

### 4. 连接并提交代码至gitee

在给git进行有全局设置用户名和邮箱之后，就可以连接gitte的remote origin仓库了

1. 在需要上传的文件加下右键单击，点击”Git Bash Here“，打开Git的命令台

2. 首先初始化Git本地仓库（就是将要上传的文件夹 ）：

```
git init
```

3. 连接Gitee仓库地址：

```
git remote add origin 远程仓库链接
```

如果在下面的步骤提示找不到该仓库，说明仓库名配置错误，就需要移除原来的仓库名，并重新 连接

移除remote origin命令：

```
git remote rm origin 
```

然后再重新连接

4. 拉取Gitee仓库到本地，即在Gitee仓库和本地待上传文件之间建立连接

```
git pull origin master
```

等待几秒钟，会弹出一个窗口，需要输入你的Gitee账号和密码，输入之后才能真正建立连接

5. 添加所有需要的文件

```
git add .
```

注意add和 . 之间有一个空格，这行命令是添加所有Git上传代码所需的文件

6. 添加提交信息

```
git commit -m "我的第一次上传"
```

养成良好的备注习惯，基本流程。

7. 将本地代码push到Gitee

```
git push origin master
```

### 5.如何推送博客

在博客根目录打开cmd，输入以下命令即可覆盖更新

```
hugo --theme=主题名字 --baseUrl="仓库网址" --buildDrafts
```

在本地写完博客之后，可以用上面的命令把本地的仓库重新部署，推送到自己GitHub或者Gitee仓库中，即可实现更新
