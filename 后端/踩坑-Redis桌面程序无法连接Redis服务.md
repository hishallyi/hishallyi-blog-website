

## Problem：

在服务器安装好Redis，版本6.2.6，在配置文件redis.conf中设置了：

- 允许访问的ip：0.0.0.0
- 端口6379
- 自定义了密码
- 守护进程允许后台运行：daemonize yes

但是用桌面程序（我用的AnotherRedisDesktopManager）输入正确的服务器地址、端口和密码还是连不上

在本地电脑cmd中`ping`服务器地址是可以ping通的，但是使用 telnet 测试端口连通性就显示连接失败。

```shell
# telnet 测试端口连通性
telnet [Redis服务器IP地址] 6379

# 显示
正在连接[Redis服务器IP地址]...无法打开到主机的连接。 在端口 6379: 连接失败
```

## Solutions

试了以下几种方法，最后一种解决

根据你的描述，Redis 的端口 `6379` 无法通过 `telnet` 测试连通性，即使 Redis 已经在服务器上运行，说明可能有以下问题导致该端口无法访问。以下是解决步骤：

------

### 1. **检查 Redis 是否正在监听端口 6379**

在服务器上执行以下命令，确认 Redis 是否已经正常运行并监听了 `6379` 端口：

```bash
netstat -anp | grep 6379
```

- 如果看到类似以下输出，说明 Redis 正在监听：

  ```
  tcp        0      0 0.0.0.0:6379          0.0.0.0:*            LISTEN      <pid>/redis-server
  ```

  如果没有输出，则说明 Redis 可能未启动或配置文件中未正确配置监听端口。

- 确认 Redis 是否启动：

  ```bash
  ps aux | grep redis
  ```

  如果 Redis 未启动，尝试启动 Redis：

  ```bash
  redis-server /path/to/redis.conf
  ```

------

### 2. **检查 Redis 配置文件**

打开 Redis 的配置文件 `redis.conf`，重点检查以下设置：

#### **a) 绑定的 IP 地址**

确保配置中有以下行：

```conf
bind 0.0.0.0
```

- 如果 `bind` 指定了特定的 IP 地址（例如 `127.0.0.1`），那么 Redis 只能本地访问，外部连接会被拒绝。

- 修改为 

  ```
  bind 0.0.0.0
  ```

   后，保存文件并重启 Redis：

  ```bash
  systemctl restart redis
  ```

#### **b) 保护模式**

确保 `protected-mode` 设置为 `no`：

```conf
protected-mode no
```

- 启用保护模式时，Redis 只允许本地连接。

------

### 3. **检查防火墙规则**

服务器的防火墙可能阻止了外部访问 Redis 的端口。

#### **a) 检查防火墙状态**

如果使用 `ufw`（Ubuntu/Debian 系统常见）：

```bash
sudo ufw status
```

如果 `6379` 没有在防火墙中开放，执行以下命令开放：

```bash
sudo ufw allow 6379
sudo ufw reload
```

如果使用 `firewalld`（CentOS/RHEL 系统常见）：

```bash
sudo firewall-cmd --list-ports
```

如果 `6379` 未在列出端口中，开放该端口：

```bash
sudo firewall-cmd --permanent --add-port=6379/tcp
sudo firewall-cmd --reload
```

#### **b) 检查 `iptables` 规则**

如果未使用 `ufw` 或 `firewalld`，可能是 `iptables` 规则阻止了连接。检查规则：

```bash
sudo iptables -L -n
```

如果端口被阻止，添加规则允许访问：

```bash
sudo iptables -A INPUT -p tcp --dport 6379 -j ACCEPT
sudo iptables-save
```

------

### 4. **检查云服务器安全组（我就是在阿里云租的服务器，需要额外添加端口设置）**

如果你的服务器也是云服务（如阿里云、AWS、Azure），需要检查云平台的安全组设置，确保开放了 `6379` 端口。以阿里云为例：

1. 登录阿里云管理控制台。
2. 找到对应的 ECS 实例。
3. 进入 “安全组” 配置，添加一条规则：
   - 协议类型：TCP
   - 端口范围：6379
   - 授权对象：0.0.0.0/0（或指定允许访问的 IP）

------

### **重新测试连接**

完成以上步骤后，重新使用 `telnet` 测试：

```cmd
telnet [Redis服务器IP地址]
```

- 如果显示 `Trying [Redis服务器IP地址]...` 并进入 Redis 的交互界面，则表示连通性已恢复。

- 如果仍然连接失败，请返回服务器查看 Redis 日志是否有错误信息：

  ```bash
  tail -f /var/log/redis/redis.log
  ```

