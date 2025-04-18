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

## docker run 参数详解

### **1. 基本参数 ** √
- **`-d` 或 `--detach`**  
  含义：以后台模式运行容器（后台运行）。  
  示例：  
  
  ```bash
  docker run -d nginx
  ```
  
- **`-i` 或 `--interactive`**  
  含义：保持标准输入（stdin）打开，允许与容器交互。  
  示例：  
  
  ```bash
  docker run -i ubuntu bash
  ```
  
- **`-t` 或 `--tty`**  
  含义：分配一个伪终端（pseudo-TTY），通常与 `-i` 一起使用。  
  示例：  
  ```bash
  docker run -it ubuntu bash
  ```

- **`--name`**  
  含义：为容器指定一个自定义名称。如果不指定，Docker 会生成一个随机名称。  
  示例：  
  
  ```bash
  docker run --name my_container nginx
  ```

---

### **2. 环境变量相关参数**
- **`-e` 或 `--env`**  
  含义：设置环境变量。  
  示例：  
  ```bash
  docker run -e "ENV_VAR=value" nginx
  ```

- **`--env-file`**  
  含义：从文件中读取环境变量。  
  示例：  
  ```bash
  docker run --env-file ./env.list nginx
  ```

---

### **3. 网络相关参数** √
- **`--network`**  
  含义：指定容器的网络模式（如 `bridge`、`host`、`none` 或自定义网络）。  
  示例：  
  ```bash
  docker run --network host nginx
  ```

- **`-p` 或 `--publish`**  
  含义：将容器端口映射到主机端口。格式为 `主机端口:容器端口`。  
  示例：  
  ```bash
  docker run -p 8080:80 nginx
  ```

- **`-P` 或 `--publish-all`**  
  含义：自动将容器暴露的所有端口映射到主机上的随机端口。  
  示例：  
  ```bash
  docker run -P nginx
  ```

---

### **4. 存储相关参数** √
- **`-v` 或 `--volume`**  
  含义：挂载主机目录或卷到容器中。格式为 `主机路径:容器路径`。  
  示例：  
  ```bash
  docker run -v /host/path:/container/path nginx
  ```

- **`--mount`**  
  含义：更灵活的挂载方式，支持更多的选项。  
  示例：  
  ```bash
  docker run --mount type=bind,src=/host/path,dst=/container/path nginx
  ```

- **`--tmpfs`**  
  含义：挂载临时文件系统到容器中。  
  示例：  
  ```bash
  docker run --tmpfs /app/tmp nginx
  ```

---

### **5. 资源限制相关参数**
- **`--memory` 或 `-m`**  
  含义：限制容器使用的最大内存。  
  示例：  
  ```bash
  docker run -m 512m nginx
  ```

- **`--cpus`**  
  含义：限制容器使用的 CPU 核心数。  
  示例：  
  ```bash
  docker run --cpus="1.5" nginx
  ```

- **`--cpu-shares`**  
  含义：设置容器的 CPU 权重（相对值）。  
  示例：  
  ```bash
  docker run --cpu-shares=512 nginx
  ```

---

### **6. 容器行为相关参数**
- **`--rm`**  
  含义：容器退出时自动删除容器。  
  示例：  
  ```bash
  docker run --rm nginx
  ```

- **`--restart`**  
  含义：设置容器的重启策略（如 `no`、`on-failure`、`always`、`unless-stopped`）。  
  示例：  
  ```bash
  docker run --restart always nginx
  ```

- **`--entrypoint`**  
  含义：覆盖镜像默认的入口点（ENTRYPOINT）。  
  示例：  
  ```bash
  docker run --entrypoint "/bin/bash" nginx
  ```

---

### **7. 用户权限相关参数**
- **`--user` 或 `-u`**  
  含义：指定容器内运行的用户和组。  
  示例：  
  ```bash
  docker run --user 1000:1000 nginx
  ```

---

### **8. 日志相关参数**
- **`--log-driver`**  
  含义：指定日志驱动程序（如 `json-file`、`syslog`、`journald` 等）。  
  示例：  
  ```bash
  docker run --log-driver syslog nginx
  ```

- **`--log-opt`**  
  含义：设置日志驱动的选项。  
  示例：  
  ```bash
  docker run --log-driver syslog --log-opt syslog-address=udp://1.2.3.4:514 nginx
  ```

---

### **9. 其他常用参数**
- **`--privileged`**  
  含义：赋予容器扩展权限（例如访问设备）。  
  示例：  
  
  ```bash
  docker run --privileged nginx
  ```
  
- **`--cap-add` 和 `--cap-drop`**  
  含义：添加或删除 Linux 能力（capabilities）。  
  示例：  
  ```bash
  docker run --cap-add NET_ADMIN nginx
  ```

- **`--security-opt`**  
  含义：设置安全选项（如 SELinux 或 AppArmor 配置）。  
  示例：  
  ```bash
  docker run --security-opt apparmor=unconfined nginx
  ```

