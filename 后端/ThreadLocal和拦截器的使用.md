## ThreadLocal

作为一个工具类使用，能够保存每次线程中的变量信息，在线程生命周期内重复使用

```java
package com.hmdp.utils;

import com.hmdp.dto.UserDTO;

public class UserHolder {
    // 定义指定类型的ThreadLocal
    private static final ThreadLocal<UserDTO> tl = new ThreadLocal<>();

    // 从ThreadLocal中存信息的方法
    public static void saveUser(UserDTO user){
        tl.set(user);
    }

    // 从ThreadLocal中获取信息的方法
    public static UserDTO getUser(){
        return tl.get();
    }

    // 从ThreadLocal中删除信息的方法
    public static void removeUser(){
        tl.remove();
    }
}

```

## 拦截器

1. 定义拦截器作为一个工具类，根据业务逻辑定义
2. 在配置类中注册添加拦截器和拦截路径
3. 