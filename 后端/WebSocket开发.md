## WebSocket介绍

WebSocket 是一种全双工、持久的网络连接协议，适用于需要双向通信的场景。它在后端服务间的使用较少，但对于实时通讯和流式数据传输，它提供了一种有效的方式。

**优点**：

- 实时：适用于需要实时双向通信的场景。
- 保持持久连接，减少请求和响应的开销。

**缺点**：

- 持久连接会消耗资源，不适合高并发场景。
- 需要额外的管理和调度。

**使用场景**：

- 实时消息推送、实时数据更新（例如：实时交易、游戏、即时通讯系统）。
- 后端服务间实时通信（例如：微服务之间的实时数据同步）。

## SpringBoot创建WebSocket服务器

### 1. 添加依赖

在pom.xml文件中引入WebSocket依赖

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-websocket</artifactId>
    </dependency>
</dependencies>
```

### 2. 配置WebSocket

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    /**
     * 注册 WebSocket 处理器
     * @param registry
     */
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        // 注册 WebSocket 处理器，路径为 /ws
        // MyWebSocketHandler为自定义的消息处理器
        registry.addHandler(new MyWebSocketHandler(), "/ws").setAllowedOrigins("*");
    }
}

```



### 3. 创建WebSocket消息处理器

```java

```

