## 常用命令

### 系统命令

```bash
# 启动docker服务并设置开机自启
# 如果是root用户不需要前面的sudo命令
sudo systemctl start docker
sudo systemctl enable docker
```

### 操作命令

```shell
搜索仓库镜像：docker search 镜像名

拉取镜像：docker pull 镜像名

查看正在运行的容器：docker ps

查看所有容器：docker ps -a

删除容器：docker rm container_id

查看镜像：docker images

删除镜像：docker rmi image_id

启动（停止的）容器：docker start 容器ID

停止容器：docker stop  容器ID

重启容器：docker restart 容器ID

启动（新）容器：docker run -it ubuntu /bin/bash

进入容器：docker attach 容器ID或docker exec -it 容器ID /bin/bash，推荐使用后者。
```

## docker拉取镜像命令

### 拉取MySQL镜像

```shell
# 拉取镜像
sudo docker pull mysql

# 创建并运行MySQL容器
docker run -d \
  --name mysql \
  -p 3306:3306 \
  -e TZ=Asia/Shanghai \
  -e MYSQL_ROOT_PASSWORD=yourpassword \
  mysql
  
docker run -d \
  --name mysql8.0 \
  -p 3306:3306 \
  -e TZ=Asia/Shanghai \
  -e MYSQL_ROOT_PASSWORD=chk4515 \
  mysql:8.0
```

