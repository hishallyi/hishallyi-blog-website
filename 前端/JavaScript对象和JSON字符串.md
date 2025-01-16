前端`JavaScript对象`想要通过Websocket发送给后端，需要将对象转换为`JSON字符串`进行发送。后端接收到JSON字符串后，可以使用ObjectMapper或其他JSON解析工具将其解析为Java对象

### 1. 前端：将对象转换为 JSON 字符串并发送

在前端，使用 `JSON.stringify` 将 JavaScript 对象转换为 JSON 字符串，然后通过 WebSocket 发送。

### 2. 后端：接收并解析 JSON 字符串

在后端，使用 `TextMessage` 接收 JSON 字符串，并通过 `ObjectMapper` 将其解析为 Java 对象。

1. 定义Java类：WebSocketMessage
2. 在 WebSocket 处理器中解析 JSON 字符串

```java
// 1. 定义ObjectMapper对象
private final ObjectMapper objectMapper = new ObjectMapper();
```

```java
// 2. 调用objectMapper的readValue方法，将接收到的jsonMessage构建为WebSocketMessage对象
WebSocketMessage webSocketMessage = objectMapper.readValue(jsonMessage, WebSocketMessage.class);

// 针对WebSocketMessage对象的操作...
```

### 3. 注意事项

1. **JSON 字段名与 Java 类字段名一致**：

   - 前端对象字段的内容需要和Java类的类型保持一致，确保 `ObjectMapper` 能够将JSON字符串映射为类对象。

   > 如果内容和类型不匹配，会报错：
   >
   > ```java
   > java.lang.IllegalArgumentException: Cannot deserialize value of type `java.lang.Integer` from String "1,2,3": not a valid `java.lang.Integer` value
   > ```

   - 前端对象的字段名需要与后端 Java 类的字段名一致，否则 `ObjectMapper` 无法正确映射。

2. **处理复杂对象**：

   - 如果对象中包含嵌套对象或集合，确保 Java 类中也定义了对应的嵌套类或集合类型。

3. **错误处理**：

   - 在解析 JSON 字符串时，捕获可能的异常（如 `JsonParseException` 或 `JsonMappingException`），并处理错误情况。

### 4. JSON.stringify和JSON.parse

JSON.stringify：

- 对于 JavaScript 对象，通过 `JSON.stringify` 将其转换为 JSON 字符串并进行网络传输发送

JSON.parse

- 在前端接受到服务器发送的消息是 JSON 格式，可以使用 `JSON.parse()` 解析消息内容，转换为JavaScript对象。
- JavaScript对象中获取某个字段的值的方式：`objectName.键`