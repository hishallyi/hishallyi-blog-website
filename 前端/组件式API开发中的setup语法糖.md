## script标签中的setup语法糖

`<script setup>` 是 Vue 3 中引入的一种语法糖，用于简化组件的编写方式。**它是 Composition API 的一种更简洁的写法**，特别适合在单文件组件（`.vue` 文件）中使用。`<script setup>` 的主要作用是让组件的逻辑更清晰、代码更简洁。

---

### 1. `<script setup>` 的作用

#### 1.1 自动暴露顶层绑定

在 `<script setup>` 中，所有顶层变量、函数、导入的组件等都会自动暴露给模板，无需手动通过 `setup()` 函数返回。

#### 1.2 更简洁的代码

相比传统的 `setup()` 函数，`<script setup>` 减少了模板代码，避免了显式返回数据和方法的步骤。

#### 1.3 更好的 TypeScript 支持

`<script setup>` 对 TypeScript 的支持更加友好，类型推断更加自然。

---

### 2. `<script setup>` 的基本用法

#### 2.1 定义响应式数据

使用 `ref` 或 `reactive` 定义响应式数据。

```vue
<script setup>
import { ref } from "vue";

const count = ref(0); // 定义响应式数据
const increment = () => {
  count.value++;
};
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>
```

#### 2.2 导入组件

在 `<script setup>` 中导入的组件可以直接在模板中使用，无需手动注册。

```vue
<script setup>
import ChildComponent from "./ChildComponent.vue";
</script>

<template>
  <div>
    <ChildComponent />
  </div>
</template>
```

#### 2.3 使用生命周期钩子

可以直接使用 `onMounted`、`onUpdated` 等生命周期钩子。

```vue
<script setup>
import { onMounted } from "vue";

onMounted(() => {
  console.log("组件已挂载");
});
</script>
```

#### 2.4 使用 `defineProps` 和 `defineEmits`

`defineProps` 和 `defineEmits` 是 `<script setup>` 中用于定义组件 props 和 emits 的宏。

```vue
<script setup>
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["updateMessage"]);

const updateMessage = () => {
  emit("updateMessage", "New Message");
};
</script>

<template>
  <div>
    <p>{{ message }}</p>
    <button @click="updateMessage">更新消息</button>
  </div>
</template>
```

---

### 3. `<script setup>` 的优势

#### 3.1 更少的样板代码

> 从第4节【`<script setup>` 与传统 `setup()` 的对比】能够更加直观的理解

传统的 `setup()` 函数需要显式返回模板中使用的数据和方法，而 `<script setup>` 自动处理这些逻辑。

#### 3.2 更直观的逻辑组织

所有逻辑都在顶层作用域中定义，代码结构更加清晰。

#### 3.3 更好的开发体验

`<script setup>` 减少了代码量，提高了开发效率，特别是在使用 TypeScript 时，类型推断更加自然。

---

### 4. `<script setup>` 与传统 `setup()` 的对比

#### 传统 `setup()` 写法

```vue
<script>
import { ref } from "vue";

export default {
  setup() {
    const count = ref(0);
    const increment = () => {
      count.value++;
    };

    return {
      count,
      increment,
    };
  },
};
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>
```

#### `<script setup>` 写法

```vue
<script setup>
import { ref } from "vue";

const count = ref(0);
const increment = () => {
  count.value++;
};
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>
```

可以看到，`<script setup>` 的代码更加简洁，逻辑更加直观。

---

### 5. `<script setup>` 的注意事项

#### 5.1 无法直接访问 `this`

在 `<script setup>` 中，无法直接访问 `this`，因为它是基于 Composition API 的，所有逻辑都通过函数式的方式实现。

#### 5.2 需要 Vue 3 支持

`<script setup>` 是 Vue 3 的特性，确保你的项目使用的是 Vue 3。

#### 5.3 需要工具链支持

`<script setup>` 需要 Vue 的编译工具（如 Vite 或 Vue CLI）支持。如果你使用的是 Vite，默认已经支持；如果是 Vue CLI，需要确保版本足够新。

