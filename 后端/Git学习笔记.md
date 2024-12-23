# Git操作命令

## 安装Git后的初始操作

```python
给电脑中的Git绑定名字和邮箱：
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"

可通过以下命令查看是否安装成功：
git config user.name
git config user.email

查看Git全局配置信息的命令：
git config --global -l
```

安装完Git之后，你需要进行一些配置以连接到远程仓库。主要的配置包括：

1. **设置用户名和邮箱：** 在Git中，每次提交代码都会记录作者信息，因此需要配置用户名和邮箱。可以通过以下命令设置：

   ```
   git config --global user.name "Your Name"
   git config --global user.email "your_email@example.com"
   ```

2. **生成SSH密钥（可选）：** 如果你使用SSH协议连接到远程仓库（比如GitHub、GitLab等），建议生成SSH密钥。这样可以免去每次输入密码的麻烦。生成SSH密钥的命令是：

   ```
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
   ```

   这个命令会在默认的SSH密钥目录下生成一对公钥和私钥。生成过程中可以选择设置密码保护私钥，也可以留空直接回车。

3. **将SSH公钥添加到远程仓库：** 如果你生成了SSH密钥，需要将生成的公钥添加到你的远程仓库账户中。这样远程仓库才能识别你的身份并允许你访问。具体步骤请参考你使用的远程仓库服务商的文档。

4. **配置远程仓库地址：** 在本地仓库中，你需要配置远程仓库的地址。可以使用以下命令添加远程仓库：

   ```
   git remote add origin <remote_repository_URL>
   ```

   其中，`<remote_repository_URL>` 是你远程仓库的URL地址。

5. **验证配置是否成功：** 可以使用以下命令验证是否成功连接到远程仓库：

   ```
   git remote -v
   ```

完成以上配置后，你就可以通过Git和远程仓库进行交互了，比如拉取代码、推送代码等操作。



## Git相关操作

git操作命令行参考：https://backlog.com/git-tutorial/cn/reference/

### 1）最基本的三步操作

```python
# 1. 仓库初始化
将目前目录初始化为Git能够管理的仓库，在当前目录下右键选择Git Bash Here，在跳出来的命令框输入：
git init
即可将当前目录初始化为仓库

# 2. 往仓库添加文件必要的两个步骤，按顺序输入命令
1）首先将文件添加到仓库的暂存区，该命令可以执行多次，切每次命令可添加多个文件
命令：
git add 文件名1 文件名2
2）把暂存区的所有内容提交到当前的分支，并告诉仓库你做了什么（通过附加信息说明）
命令：
git commit -m "解释你提交文件的信息"
参数-m是-- message的缩写

# 3. 向远程仓库提交项目
如果是初始创建的本地仓库，需要先建立本地仓库和远程仓库的连接（远程仓库已经创建的前提下），连接远程仓库的命令：
git remote add <repositoryname一般写origin> <创建的远程仓库链接>
建立连接之后将本地仓库push到远程仓库的命令：
git push <repositoryname> <branchname>
如果远端仓库是初次建立的话，远端仓库是没有分支的，因此初次push的时候需要加入--set-upstream参数来为远程仓库建立同名分支，即为以下命令：
git push --set-upstream <repositoryname> <branchname> 	
```

### 2）查看status、diff、log、checkout等

1. status

```
可通过下面命令查看仓库的当前状态，方便进行决策：
git status
```

2. diff

```
假设通过上面的状态命令得知readme.md文件修改了，则可以通过下面命令查看具体修改情况：
git diff readme.md
```

3. log

> 在Git中，用HEAD指向当前版本(查看日志信息可发现)，上一个版本就是`HEAD^`，上上一个版本就是`HEAD^^`，当然往上100个版本写100个`^`比较容易数不过来，所以写成`HEAD~100`。

```
查看以前的提交日志：
git log
显示标签资料的历史记录（比较详细）：
git log --decorate
显示精简的日志信息（比较简略，只有commit id和对应注解）：
git log --pretty=oneline
```

4. checkout

```
加入你修改了readme.md文件的内容，保存退出后想撤销刚才的修改，可以通过下面命令实现：
git checkout -- <filename>
注意：一定要加上--，并且--和需要撤销修改的文件名之间有空格，别忘了，如果不加--，那就是切换分支的操作了，在第5)条会说明；
checkout操作就是一键还原操作，即使你刚才把readme.md文件删除，然后通过git checkout readme.md命令，也可以把误删的文件恢复
```

### 3) 与远端仓库的交互

1. pull：执行pull，远程仓库的内容就会合并到本地。但是，有时只是想确认本地数据库的内容而不想合并。这种情况下，就需要使用fetch。

2. fetch：执行fetch可以取得远程数据库的最新历史记录。取得的提交会导入到没有名字的分支，这个分支可以从名为FETCH_HEAD的退出。例如，在本地数据库和远程数据库的origin，如果在从B进行提交的状态下执行fetch，就会形成如下图所示的历史记录。

3. push：执行push，会将本地仓库的修改推送到远程仓库，并与远程仓库进行合并
4. 相关命令

```
初始创建的本地仓库需要先建立本地仓库和远程仓库的连接（远程仓库已经创建的前提下），连接远程仓库的命令：
git remote add <repositoryname一般写origin> <创建的远程仓库链接>

查看本地仓库已绑定的远端仓库列表用下面命令（参数-v可选，用来显示远端仓库的详细信息）：
git remote -v

删除本地仓库已绑定的某个远端仓库：
git remote rm <repositoryname>

将本地仓库push到远程仓库的命令(已建立连接的情况下)：
git push <repositoryname> <branchname>

拉取远端仓库与本地仓库合并的命令(已建立连接的情况下)：
git pull 
```

### 4） 标签操作

1. 什么是标签？

标签是为了更方便地参考**提交（commit）**而给它标上易懂的名称，也即对每次的提交(commit)设置一种易懂的名称。tag就是一个让人容易记住的有意义的名字，它跟某个commit绑在一起。

2. 标签相关命令

创建标签：

> 默认创建的标签是和最新commit绑定在一块

```
创建标签（轻标签）：
git tag <tagname>
创建注解标签：
git tag -a <tagname> -m "注解内容"
如果想要对以往的某次commit打上标签，则需要找到那次commit对应的commit id，用下面命令打标签：
git tag <tagname> <commit id>
```

删除标签

```
删除标签：
git tag -d <tagname>
```

查看标签列表：

```
查看标签列表的命令(注意：标签不是按时间顺序列出，而是按字母排序的)：
git tag
查看标签列表并同时显示注解信息（添加参数-n）：
git tag -n
根据标签名查看该标签的详细信息：
git show <tagname>
```

### 5）操作分支的命令

```
创建分支：
git branch <branchname>
删除分支（在branch后面指定-d参数就是删除分支）：
git branch -d <branchname>
查看分支有哪些(带星号的表示当前所在branch)：
git branch
```

```
切换分支（假设切换到分支issue1）：
git checkout issue1
创建并切换分支(通过添加参数-b来执行)：
git checkout -b <branch>
```

```
合并分支的操作（一般是将其他分支合并到主分支master中），例如在分支issue1中进行了修改，现在需要将issue1分支合并到主分支master中，合并操作如下：
首先要切换到master分支上：
git checkout master
然后再把issue1分支导入到master分支上:
git merge issue1
```

### 6) 版本回退reset

假设当前版本（也就是HEAD指向的版本）为version1，上一个版本为version2（HEAD^），上上版本为version3（HEAD^^）,则:

```
进行版本回退的命令：
git reset --hard HEAD^
这样你的版本就回退到version2了

如果你还想再回到version1，那需要再找到version1那次提交对应的commit id（随便设为290ab4），则还是用reset命令进行回退：
git reset --hard 290ab4

如果你找不到version1对应commit的那次id怎么办，不慌，可以通过以下命令进行查看：
git reflog
这个命令会记录以往的每次命令并显示出来
```



## 查看Git配置范围

要确定你当前是为哪个 Git 仓库进行配置，可以通过查看 Git 的配置文件来获取信息。Git 使用三个不同的级别来存储配置信息：全局（global）、仓库范围内（local）、系统范围内（system）。你可以根据配置的范围来确定当前配置是针对哪个 Git 仓库的。

### 使用命令查看当前配置的范围

你也可以使用 `git config --list --show-origin` 命令来查看当前配置的范围和来源。该命令会列出所有的 Git 配置项及其来源（是全局、本地还是系统级别），这样你就可以确定当前配置是属于哪个级别的。

### 使用命令查看当前所在的 Git 仓库路径

你可以使用 `git rev-parse --show-toplevel` 命令来查看当前所在的 Git 仓库的根目录路径。通过这个路径，你可以知道你正在为哪个 Git 仓库进行配置。

使用这些方法中的任何一个，你都可以确定当前为哪个 Git 仓库进行配置。



## git rebase 和 git merge

### 区别

`rebase` 和 `merge` 都用于将不同分支的更改合并到当前分支，但它们的工作原理和结果不同：

- **`merge`**：将两个分支的更改合并到一起，通常会产生一个新的合并提交（`merge commit`）。**这种方式保留了分支的历史和结构。**
- **`rebase`**：将一个分支的提交从当前分支中“摘下来”，然后将其重新应用到目标分支的顶部。**这样会修改提交历史，避免了合并提交，保持线性历史。**

> 理解：
>
> rebase就是为了让提交历史更加整洁，可以将其他分支的修改直接合并到指定分支的顶部，保持指定分支的线性历史，但是会修改提交历史；而merge则会保留两个分支的合并历史，并产生新的合并提交，保留了提交历史
>
> merge更安全，因为会保存提交历史，而rebase会移动当前分支的提交到目标分支的顶部，会改变分支历史，因此会修改提交的顺序和内容，相对而言需要谨慎使用。
>
> rebase主要用于私有分支，或者只在一个人使用的功能分支上

### rebase的使用场景

**保持提交历史整洁**：

- 当你在一个特性分支上开发，期间主分支（如 `main` 或 `master`）也有了新的提交。如果你不想在历史中看到合并提交，而希望将 `feature` 分支的提交线性地“添加”到 `main` 分支之后，就可以使用 `rebase` 操作。
- 使用 `git rebase main` 会把 `feature` 分支的提交应用到 `main` 分支的最新提交之上，使得提交历史更加简洁和线性。

案例：假设你在 `feature` 分支上工作，而 `main` 分支上有新提交，你想将 `feature` 分支的提交应用到 `main` 分支的顶部：

```shell
# 切换到 feature 分支
git checkout feature

# 从 main 分支获取最新的更改
git fetch origin

# 使用 rebase 命令将 feature 分支的更改应用到 main 分支的最新提交之上
git rebase origin/main
```

**避免不必要的合并提交**：

- 如果在多个开发者之间协作，可能会频繁地使用 `merge`。但是，如果你只关心代码的变动，而不关心每一次合并的历史，可以使用 `rebase` 来避免生成冗余的合并提交，保持一个更干净的提交历史。

**修改本地提交历史**：

- 如果你的本地分支提交了多个有问题的提交（例如，提交信息错误，提交内容不够清晰等），你可以使用 `rebase` 操作来对历史提交进行修改。`git rebase -i`（交互式 `rebase`）可以让你修改提交顺序、编辑提交信息、合并提交等。

**在将分支推送到远程之前**：

- 在将本地开发的分支推送到远程仓库之前，使用 `rebase` 确保你的提交历史是干净的。特别是在团队协作中，推送之前进行 `rebase` 操作是避免合并提交的好方法。

**解决冲突时使用 `rebase`**：

- 当你在 `rebase` 的过程中遇到冲突时，Git 会停下来让你解决冲突。解决冲突后，使用 `git rebase --continue` 继续应用剩余的提交。

### rebase操作注意事项

**修改历史：** `rebase` 会修改提交历史，因此当你进行 `rebase` 后，如果该分支已经推送到远程仓库，其他开发者也在使用这个分支，那么可能会导致他们的提交无法合并，造成冲突。因此，**在公共分支上使用 `rebase` 需要非常小心**，通常建议只在本地分支上使用 `rebase`，推送到远程之前确保没有其他开发者依赖该分支。

**避免多次 `rebase`：** 频繁地 `rebase` 提交会导致历史修改复杂，难以追踪。

**冲突处理：** 在 `rebase` 时，Git 可能会要求你解决冲突。解决冲突后，你需要使用 `git rebase --continue` 来继续进行。

### 总结

**`merge`**：适用于多人协作开发中已经推送到远程仓库的分支，能够保留历史记录，不会修改已有提交历史。适合团队间频繁协作的场景。

**`rebase`**：适用于本地开发或尚未推送的分支，能够保持线性提交历史，避免合并提交。推送之前可以用来整理提交历史，但修改历史时需要小心，特别是在多人协作时。

## 开VPN后git push无法使用的解决方案

原因：VPN本质就是系统代理本地电脑发出的部分网络请求，主要是浏览器发出的网络请求

但本地电脑中并不是所有的软件和工具都会通过系统代理，也就是说有些应用的网络请求会绕过代理，直接进行网络通信，从而导致无法请求成功。

因此可以给Git设置全局代理，让每次的git网络操作都经过代理，这样就OK了

cmd运行下面两条命令：
```shell
git config --global http.proxy http://127.0.0.1:7897
git config --global https.proxy http://127.0.0.1:7897
# 查看电脑clash设置中的代理端口设置，我的是7897
```

