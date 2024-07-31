---
title: 编程命令
date: 2024-05-06 01:04:17
tags: [pip, Anaconda, Git, Nodejs, Vue]
categories: 技术分享
---

总结编程中常用到的命令

<!-- more -->

## pip常用命令

### 1. 安装pip

1. 安装pip

> 方式一：官网下载用Linux命令解压安装

- 进入[官网](https://pypi.python.org/pypi/pip)，下载 .tar.gz压缩包
- Linux安装pip

```linux
tar -xzvf pip-1.5.4.tar.gz      解压
cd pip-1.5.4                    进入解压文件
python setup.py install         安装
```

> 方式二：下载并安装Python，会自动安装pip

2. 升级pip的命令

```python
pip install --upgrade pip
```

### 2. 使用pip

1. 使用pip安装包的命令

```python
pip install 包名
```

2. pip查看是否已安装

```python
pip show --files 安装包名
```

显示：

```python
 Name:SomePackage    # 包名
 Version:1.0         # 版本号
 Location:/my/env/lib/pythonx.x/site-packages   # 安装位置
 Files:              # 包含文件等等
  ../somepackage/__init__.py
  [...]
```

3. pip检查哪些包需要更新

```python
pip list --outdated
```

4.  pip升级包

```python
pip install --upgrade 包名
```

5. pip卸载包

```python
pip uninstall 包名
```

### 3. pip参数解释

```python
# pip --help
 
Usage:  
 pip<command>[options]
 
Commands:
 install                    安装包.
 uninstall                  卸载包.
 freeze                     按着一定格式输出已安装包列表
 list                       列出已安装包.
 show                       显示包详细信息.
 search                     搜索包，类似yum里的search.
 wheel                      Buildwheelsfromyourrequirements.
 zip                        不推荐.Zipindividualpackages.
 unzip                      不推荐.Unzipindividualpackages.
 bundle                     不推荐.Createpybundles.
 help                       当前帮助.
 
GeneralOptions:
 -h,--help                 显示帮助.
 -v,--verbose              更多的输出，最多可以使用3次
 -V,--version              现实版本信息然后退出.
 -q,--quiet                最少的输出.
 --log-file<path>          覆盖的方式记录verbose错误日志，默认文件：/root/.pip/pip.log
 --log<path>               不覆盖记录verbose输出的日志.
 --proxy<proxy>            Specifyaproxyintheform[user:passwd@]proxy.server:port.
 --timeout<sec>            连接超时时间(默认15秒).
 --exists-action<action>   Defaultactionwhenapathalreadyexists:(s)witch,(i)gnore,(w)ipe,(b)ackup.
 --cert<path>              证书.
```



## Anaconda常用命令

### 1. 生成配置文件并查看相关配置

```python 
conda config  #生成配置文件.condarc
键盘键入Windows+R，输入%HOMEPATH%，可找到配置文件所在目录
conda config --show  # 查看所有的配置选项
conda config --show channels    #显示配置文件中的下载源
```

### 2. 添加镜像源

```python
# 添加清华镜像
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
# 添加pytorch镜像
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/
# for legacy win-64
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/peterjc123/
# 从 channel 中安装包时显示 channel 的 url, 方便查看包的安装来源
conda config --set show_channel_urls yes
```

### 3. 删除镜像源

```python
conda config --remove channels 源url
```

### 4. 虚拟环境相关操作

```python
# 查看虚拟环境列表
conda env list
# 创建新的虚拟环境
conda create --name envname python=3.10

# 注意1：
修改创建虚拟环境的默认位置（默认是在C盘的某个目录下，可通过conda config --show envs_dirs查看，第一个为默认位置）
首先：
	在配置文件.condarc最后加入：
    envs_dirs:
        - 希望改为的绝对路径（我的是Anaconda的安装目录下的envs目录：D:\FileApp\DevelopApp\Anaconda\envs）
    或者直接在命令行敲命令：conda config --add envs_dirs 希望改为的绝对路径
然后：
	因为在安装Anaconda时有可能是为此电脑多有用户可用，因此Anaconda的安装目录的权限默认设置为只读不可修改，而创建虚拟环境	则是在该Anaconda安装目录下的envs目录下创建，若权限为只读的话则无法创建成功，而是创建到默认的C盘目录下，解决办法是修改Anaconda安装目录下的envs文件夹的权限，取消只读并是user获取所有修改权限，操作：点击envs文件夹->右击属性->常规中取消勾选“只读”->安全->User中将权限全都勾上。
# 注意2：
若在创建虚拟环境时指定Python版本，务必要将新创建的虚拟环境中Python配置文件中的Scripts目录添加到环境变量PATH中

# 激活并进入新环境
conda activate envname
# 关闭虚拟环境
conda deactivate
# 删除虚拟环境
conda remove -n envname --all
```

### 5. 安装pytorch

1. 安装cpu版本的PyTorch

```python
在配置好pytorch的清华源之后可以在conda prompt中切换为指定的虚拟环境（该环境已配置好Python包），在该虚拟环境下执行以下命令：
conda install pytorch torchvision torchaudio cpuonly

安装pytorch2.0（CPU版本）的命令：
pip3 install numpy --pre torch torchvision torchaudio --force-reinstall --index-url https://download.pytorch.org/whl/nightly/cpu
```

2. 安装GPU环境的PyTorch2.0以上版本：

> 前提是电脑已经安装了对应cuda驱动，下面命令会自动根据你的cuda驱动安装对应的Python依赖包

```python
# 先设置清华源（不是conda config，而是pip config）
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
# 再安装指定版本的PyTorch
pip3 install torch==2.0.1 torchvision torchaudio
```

### 6. 在jupyter中利用虚拟环境创建python文件

创建好虚拟环境，如何在jupyter中利用该虚拟环境创建python文件：

```python 
# 首先在命令行激活该虚拟环境，并下载ipykernel包
pip install ipykernel
# 接着将虚拟环境写入Jupyter的kernel中
python -m ipykernel install --name {你的虚拟环境名字，如qq} --display-name {你想显示的名称}
刷新即可大功告成，可以在Jupyter中利用该环境美美编程了
```



## 生成SSH密钥进行免密登录

要设置SSH免密码登录，可以按照以下步骤进行操作：

> 注意：以下命令是在本地电脑的PowerShell中运行的，并不是在命令提示符cmd中运行的

1. 生成公私钥对：首先，在本地计算机上生成公私钥对。可以使用以下命令生成，默认情况下会生成RSA密钥对。

   ```shell
   ssh-keygen -t rsa
   ```

   执行命令后，会提示你选择密钥保存的路径和输入密码（留空代表无密码）。**生成的公私钥文件分别是`id_rsa.pub`（公钥）和`id_rsa`（私钥）**。

2. 将公钥复制到目标服务器：将本地生成的公钥复制到目标服务器上的`~/.ssh/authorized_keys`文件中。

   ```shell
   ssh-copy-id user@server-ip
   ```

   或者手动方式，将本地的公钥内容复制到目标服务器的`~/.ssh/authorized_keys`文件。

   如果在Win10或Win11上配置时出现下面错误：

   > ssh-copy-id : 无法将“ssh-copy-id”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。

   解决方案是在PowerShell中先执行以下内容：

   ```shell
    function ssh-copy-id([string]$userAtMachine, $args){   
       $publicKey = "$ENV:USERPROFILE" + "/.ssh/id_rsa.pub"
       if (!(Test-Path "$publicKey")){
           Write-Error "ERROR: failed to open ID file '$publicKey': No such file"            
       }
       else {
           & cat "$publicKey" | ssh $args $userAtMachine "umask 077; test -d .ssh || mkdir .ssh ; cat >> .ssh/authorized_keys || exit 1"      
       }
   }
   ```

   

3. 验证免密码登录：尝试使用SSH登录目标服务器，应该不再需要输入密码。

   ```shell
   ssh user@server-ip
   ```

   如果一切配置正确，你应该能够直接登录到目标服务器，而无需输入密码。

需要注意的是，以上步骤假设你已经在服务器上设置了SSH服务，并且你拥有对目标服务器的登录凭证。

另外，为了确保SSH连接的安全性，建议采取以下措施：

- 设置私钥文件的权限：为了保护私钥的机密性，将私钥的权限设置为只有当前用户可读写，可以执行以下命令：

  ```shell
  chmod 600 ~/.ssh/id_rsa
  ```

- 禁用密码登录：为了提高安全性，可以在目标服务器上禁用密码登录，只允许公钥登录。在SSH服务器配置文件（通常是`/etc/ssh/sshd_config`）中将`PasswordAuthentication`设置为`no`。然后重新加载SSH服务。

  ```shell
  sudo service sshd reload
  ```

这样，你就设置了SSH免密码登录，方便快捷地使用SSH连接目标服务器。
