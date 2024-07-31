# Linux常用命令

> Linux 常用命令非常多，以下是一些常见的命令，按照用途分类列出：

## 常用但不好记的命令

- `gpustat`：查看显卡状态

- `free -h`：查看当前服务器的内存使用情况

- `lsmem`：显示系统内存的统计信息

- `uname -a`：查看操作系统详细信息

- `whoami`、`id -un`：显示当前用户名

- `su`：切换到超级用户（ Linux超级用户名一般为`root`，超级用户才有执行`sudo`命令的权限）

- `passwd`：修改当前用户的密码

- `ping www.baidu.com`：查看服务器是否联网；`ifconfig`：显示网络接口信息；`ip addr show`：显示 IP 地址信息

- 在基于 Debian/Ubuntu 的系统中（例如 Ubuntu、Debian）使用 `apt` 包管理器，查看是否可用：`apt --version`

- 在基于 Red Hat/CentOS/Fedora 的系统中使用 `yum` 或 `dnf` 包管理器：查看是否可用`yum --version`

- `wget -O newfilename http://example.com/file`：从指定网址下载文件

  > `-o`参数表示指定下载后的文件名为`newfilename`
  >
  > 安装的位置默认安装在当前命令行所在位置

## 文件与目录操作
1. **`ls`** - 列出目录内容
   - `ls -l`：显示详细信息
   - `ls -a`：显示隐藏文件

2. **`cd`** - 切换目录
   - `cd /path/to/directory`：切换到指定目录
   - `cd ..`：返回上一级目录

3. **`pwd`** - 显示当前工作目录的路径

4. **`mkdir`** - 创建目录
   - `mkdir newdir`：创建名为 `newdir` 的目录

5. **`rmdir`** - 删除空目录

6. **`cp`** - 复制文件或目录
   - `cp source.txt destination.txt`：复制文件
   - `cp -r sourcedir/ destdir/`：递归复制目录

7. **`mv`** - 移动或重命名文件或目录
   - `mv oldname.txt newname.txt`：重命名文件

8. **`rm`** - 删除文件或目录
   - `rm file.txt`：删除文件
   - `rm -r dir/`：递归删除目录及其内容

## 文件内容查看
1. **`cat`** - 显示文件内容
   - `cat file.txt`：显示文件内容

2. **`more`** / **`less`** - 分页查看文件内容
   - `less file.txt`：逐页查看文件

3. **`head`** - 显示文件的前几行
   - `head -n 10 file.txt`：显示文件的前 10 行

4. **`tail`** - 显示文件的后几行
   - `tail -n 10 file.txt`：显示文件的后 10 行
   - `tail -f file.txt`：实时查看文件末尾内容（通常用于查看日志）

5. **`grep`** - 在文件中搜索文本
   - `grep "search_term" file.txt`：在文件中搜索特定文本

## 系统信息查看
1. **`uname`** - 显示系统信息
   - `uname -a`：显示所有系统信息

2. **`df`** - 显示文件系统的磁盘空间使用情况
   - `df -h`：以人类可读的格式显示

3. **`du`** - 显示目录的磁盘使用情况
   - `du -h`：以人类可读的格式显示

4. **`top`** - 实时显示系统运行的进程
   - **`htop`**：更友好的进程管理器（需要单独安装）

5. **`ps`** - 显示当前运行的进程
   - `ps aux`：显示所有用户的进程

6. **`free`** - 显示内存使用情况
   - `free -h`：以人类可读的格式显示

## 压缩与解压缩
1. **`tar`** - 打包与解包文件
   - `tar -cvf archive.tar file1 file2`：创建 tar 包
   - `tar -xvf archive.tar`：解压 tar 包
   - `tar -czvf archive.tar.gz file1 file2`：创建 gzip 压缩的 tar 包
   - `tar -xzvf archive.tar.gz`：解压 gzip 压缩的 tar 包

2. **`zip`** / **`unzip`** - 压缩与解压缩 zip 文件
   - `zip archive.zip file1 file2`：创建 zip 包
   - `unzip archive.zip`：解压 zip 包

## 权限管理
1. **`chmod`** - 修改文件或目录的权限
   - `chmod 755 file.sh`：设置文件为可执行

2. **`chown`** - 修改文件或目录的所有者
   - `chown user:group file.txt`：改变文件的所有者和组

## 网络命令
1. **`ping`** - 测试网络连接
   - `ping google.com`：检测到 Google 的网络连接

2. **`ifconfig`** - 显示或配置网络接口（`ip` 命令替代）
   
   - `ifconfig`：显示网络接口信息
   - `ip addr show`：显示 IP 地址信息
   
3. **`wget`** / **`curl`** - 从网络下载文件
   
   - `wget http://example.com/file`：下载文件
   
   - `curl -O filename http://example.com/file`：下载文件
   
     > -o参数表示为下载的文件指定文件名

## 用户管理
1. **`adduser`** / **`useradd`** - 添加新用户

2. **`passwd`** - 更改用户密码

3. **`su`** - 切换用户

   - `su - username`：切换到指定用户

4. **`sudo`** - 以超级用户权限执行命令

5. 在 Linux 服务器上查看用户列表的常用命令如下：

   ### 1. 查看所有用户

   - **`cat /etc/passwd`**：该命令显示系统上所有用户的信息，每个用户一行。`/etc/passwd` 文件包含用户的用户名、用户 ID（UID）、用户组 ID（GID）、用户的全名或描述、主目录路径和默认 shell。

     ```bash
     cat /etc/passwd
     ```

     输出的每一行代表一个用户，格式如下：

     ```
     username:x:UID:GID:User Info:Home Directory:Shell
     ```

   ### 2. 显示系统用户与普通用户
   - **`awk -F':' '{ print $1}' /etc/passwd`**：这个命令仅列出用户名，去掉了其他信息。

     ```bash
     awk -F':' '{ print $1}' /etc/passwd
     ```

   ### 3. 查看当前在线用户
   - **`who`**：列出当前登录到系统的用户。

     ```bash
     who
     ```

   - **`w`**：显示当前登录用户以及他们正在执行的任务。

     ```bash
     w
     ```

   ### 4. 显示当前登录的所有用户
   - **`users`**：列出当前登录到系统的所有用户，用户名以空格分隔。

     ```bash
     users
     ```

   这些命令可以帮助你查看系统中的用户列表及其相关信息。


## 系统管理
1. **`reboot`** - 重启系统

2. **`shutdown`** - 关闭系统
   - `shutdown -h now`：立即关机
   - `shutdown -r now`：立即重启

3. **`systemctl`** - 管理系统服务
   - `systemctl start service`：启动服务
   - `systemctl stop service`：停止服务

