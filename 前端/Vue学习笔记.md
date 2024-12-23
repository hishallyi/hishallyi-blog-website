## Vue相关命令

### 1. vue版本冲突的解决办法

当本地安装的npm版本较高，造成无法解析Vue项目中的依赖树，进而导致项目依赖下载失败时，可尝试使用如下命令解决此问题：

```
npm install --legacy-peer-deps
```

## Vue 工具分类

- @Vue/cli：Vue 项目创建脚手架，用来初始化工程开发的 Vue 项目
- create-vue：新的 Vue 官方项目脚手架工具，运行`npm create vue@latest`命令即可安装 create-vue 包，并进行项目创建列表
- Vite：代替 Webpack 的前端项目构建工具，用于开发时的实时更新和生产环境下的优化打包，可支持多种前端框架的项目构建
- Vuex：Vue 官方的状态管理库，专门用来集中管理 Vue 应用中的状态（数据）
- Vue Router：官方路由管理器，用于管理单页应用的页面导航
- Pinia：Vue 的新一代状态管理库，用于替代 Vuex，API 更简洁，使用起来更直观，适用于 Vue3
- Element Plus：饿了么开发的组件库

## Vue 工程开发脚手架构建

1. 安装 Nodejs
2. 在外网电脑**全局安装**开发需要的包

1. 1. vue 项目构建工具 vue cli `npm install -g @vue/cli`
   2. 使用命令对包进行保存`npm pack @vue/cli`
   3. 以此类推安装和打包各种包

也就是说，所有内网项目的依赖包都可以在外网全局下载然后打包传入内网，然后在内网项目中安装

好像不行，element-plus 只能在线安装

1. 在外网电脑用脚手架创建初始化项目 `vue create 项目名称`

项目名称必须是小写字母

1. 将创建的项目目录压缩，并和打包的包一起传内网机里

1. 1. 内网机安装打包的包的命令：` npm install -g ./vue-cli-xxx.tgz`

## Axios请求

1. 自定义axios实例

```javascript
axios.create({
  baseURL: http//localhost:5173,
  timeout: 10000
})
```

1. 测试axios实例

## 异步操作

在Vue框架中，`async` 和 `await` 是用来处理异步操作的现代JavaScript语法，它们可以使异步代码看起来像同步代码，从而提高代码的可读性和可维护性。在Vue中，`async` 和 `await` 可以用于组件的生命周期钩子函数、方法以及Vuex中的异步操作。

### 基本语法和概念

1. **async 函数**

- **定义**：async 关键字用于声明一个异步函数，异步函数始终返回一个 Promise 对象。
- **作用**：使函数内部可以使用 await 关键字。

**2. await 关键字**

- **定义**：await 用于等待一个 Promise 对象的结果。它只能在 async 函数内部使用。
- **作用**：暂停函数的执行，直到 Promise 对象的结果被解析（resolve）或被拒绝（reject）。

## 选项式/组合式组件

在Vue 3中，开发者可以选择使用选项式语法（Options API）或组合式语法（Composition API）进行开发。

### 选项式语法（Options API）

**选项式语法是Vue 2及之前版本的主要编程方式，它通过组件的选项来组织代码，如** `data`**、**`methods`**、**`computed`**、**`watch` **和生命周期钩子。**

**特点**

- **简单易懂**：选项式语法更直观，适合初学者。
- **清晰的组织结构**：每个选项明确分离职责，代码容易理解。
- **现有代码兼容**：对于使用Vue 2的项目，继续使用选项式语法可以避免大规模重构。

**示例**

```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="increment">Count: {{ count }}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello Vue!',
      count: 0
    };
  },
  methods: {
    increment() {
      this.count++;
    }
  }
};
</script>
```

### 组合式语法（Composition API）

组合式语法是Vue 3引入的新特性，通过 `setup` 函数和一系列的组合函数（如 `ref`、`reactive`、`computed`）来组织代码。它提供了更灵活的代码组织方式，特别适合大型应用和复杂逻辑。

**特点**

- **更灵活**：组合式API可以更灵活地组织代码，将逻辑进行更细粒度的复用。
- **可组合**：允许更容易地提取和复用逻辑，适合复杂的业务逻辑和大型应用。
- **更好的类型支持**：对TypeScript支持更好，类型推断更加精确。

**示例**

```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="increment">Count: {{ count }}</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const title = ref('Hello Vue!');
    const count = ref(0);

    const increment = () => {
      count.value++;
    };

    return {
      title,
      count,
      increment
    };
  }
};
</script>
```

### 选择使用选项式还是组合式语法

**什么时候使用选项式语法**

1. **简单项目或小型应用**：选项式语法简单直观，适合小型项目或单一职责的组件。
2. **团队熟悉选项式语法**：如果团队对选项式语法更熟悉，并且现有项目都是用选项式语法开发的，继续使用选项式语法可以保持一致性。
3. **快速开发**：选项式语法结构清晰，可以快速上手开发。

**什么时候使用组合式语法**

1. **大型项目或复杂应用**：组合式语法更灵活，适合组织复杂的业务逻辑和大型项目。
2. **需要高度复用逻辑**：如果项目中需要高度复用逻辑，组合式API可以更方便地提取和复用代码。
3. **使用TypeScript**：组合式API对TypeScript支持更好，类型推断更加精确。
4. **需要更好的性能**：组合式API在性能上可能有更好的表现，特别是在处理复杂的逻辑和数据时。

**实践中的考虑**

1. **团队协作**：考虑团队成员的熟悉程度和学习曲线。如果团队成员对组合式API不熟悉，可能需要一些学习时间。
2. **代码风格和规范**：为项目设定统一的代码风格和规范，决定在何种情况下使用哪种语法。
3. **渐进式迁移**：如果从Vue 2迁移到Vue 3，可以逐步引入组合式API，不必一次性重写所有代码。

### 混合使用

在实际开发中，也可以混合使用选项式API和组合式API，根据具体需求选择最合适的方式。例如，在大部分组件中使用选项式API，而在某些需要高度复用或复杂逻辑的部分使用组合式API。

```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="increment">Count: {{ count }}</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  data() {
    return {
      title: 'Hello Vue!'
    };
  },
  setup() {
    const count = ref(0);

    const increment = () => {
      count.value++;
    };

    return {
      count,
      increment
    };
  }
};
</script>
```

## ref()函数

在Vue 3中，`ref` 函数是组合式 API (Composition API) 中用于创建响应式引用（reactive references）的一种方式。它可以用于定义响应式的数据，使得该数据在变化时会触发视图的重新渲染。

### `ref` 函数的语法和使用

**引入** `**ref**` **函数**

```javascript
import { ref } from 'vue';
```

1. **创建一个响应式引用**

`ref` 函数可以接受一个初始值，并返回一个包含该初始值的响应式引用对象。

```javascript
const count = ref(0);
```

1. **访问和修改响应式引用的值**

创建的响应式引用对象有一个 `.value` 属性，用于访问和修改其值。

```javascript
const count = ref(0);

console.log(count.value); // 输出: 0

count.value++;
console.log(count.value); // 输出: 1
```

### 在 Vue 组件中使用 `ref`

下面是一个完整的示例，包括导入、创建响应式引用、绑定到模板和处理事件：

```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 创建响应式引用
const title = ref('Hello Vue 3!');
const count = ref(0);

// 方法：增加计数器
const increment = () => {
  count.value++;
};
</script>
```

### `ref` 与 `reactive` 的区别

- `**ref**`：用于简单类型（如数字、字符串、布尔值）以及对象类型。通过 `.value` 访问和修改值。
- `**reactive**`：用于创建嵌套对象的响应式状态，返回的对象是一个响应式代理，不需要通过 `.value` 访问属性。

1. **示例：使用** `**reactive**`

```javascript
import { reactive } from 'vue';

const state = reactive({
  count: 0,
  title: 'Hello Vue 3!'
});

console.log(state.count); // 0
state.count++;
console.log(state.count); // 1
```

1. **何时使用** `**ref**` **和** `**reactive**`

- 使用 `ref` 来处理原始值（如数字、字符串、布尔值）以及需要单独处理某个对象引用的情况。
- 使用 `reactive` 来处理嵌套对象以及需要对整个对象进行响应式处理的情况。

1. **示例：混合使用** `**ref**` **和** `**reactive**`

在实际项目中，可以混合使用 `ref` 和 `reactive` 来满足不同的需求：

```vue
<template>
  <div>
    <h1>{{ state.title }}</h1>
    <p>Count: {{ state.count }}</p>
    <button @click="increment">Increment</button>
    <p>Message: {{ message }}</p>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

// 创建响应式对象
const state = reactive({
  count: 0,
  title: 'Hello Vue 3!'
});

// 创建响应式引用
const message = ref('This is a reactive message.');

// 方法：增加计数器
const increment = () => {
  state.count++;
};
</script>
```

在这个示例中，`state` 是一个使用 `reactive` 创建的响应式对象，而 `message` 是一个使用 `ref` 创建的响应式引用。这样可以根据数据的性质选择最合适的响应式处理方式。

## Vue3选项式开发中包含的选项及代码含义

> 组件、选项

在 Vue 3 中，组件是由一组选项组成的，通常包括 `data`、`methods`、`computed`、`props` 等，这些选项共同定义了一个组件的行为、数据和视图。Vue 3 的选项式 API 是传统 Vue 组件的核心部分，仍然广泛用于 Vue 3 项目中（尽管 Vue 3 也引入了组合式 API）。在选项式 API 中，每个选项都有其特定的作用。下面我会详细解释 Vue 3 中各个组件选项的含义。

### 1. **`data`**

`data` 是一个返回对象的函数，包含了组件的响应式数据。在 Vue 中，所有的数据都可以响应式地绑定到模板中。当数据发生变化时，视图会自动更新。

例子：

```javascript
data() {
  return {
    message: 'Hello, Vue!',
    count: 0
  }
}
```

- 解释
  - `data` 是一个函数，返回一个对象。对象中的属性将成为该组件的响应式数据。
  - `message` 和 `count` 就是响应式数据，可以在模板中绑定，且它们的值会随着修改而更新视图。

### 2. **`methods`**

`methods` 是一个对象，其中包含该组件的方法。方法中可以定义自定义的业务逻辑，通常用于响应事件或进行数据处理。

例子：

```javascript
methods: {
  increment() {
    this.count++
  },
  updateMessage(newMessage) {
    this.message = newMessage
  }
}
```

- 解释

  ：

  - `methods` 定义了该组件中可以调用的函数（方法）。
  - `increment` 方法用于递增 `count`，`updateMessage` 方法用于更新 `message` 的值。
  - 在模板中可以通过 `@click="increment"` 绑定到事件处理程序上。

### 3. **`computed`**

`computed` 用于定义计算属性。计算属性是基于响应式数据的计算结果，它们是缓存的，只有在依赖的数据发生变化时才会重新计算。

例子：

```javascript
computed: {
  doubledCount() {
    return this.count * 2
  },
  reversedMessage() {
    return this.message.split('').reverse().join('')
  }
}
```

- 解释

  ：

  - `doubledCount` 是一个计算属性，它返回 `count` 的两倍，并且只有在 `count` 变化时才会重新计算。
  - `reversedMessage` 计算 `message` 的反转字符串。
  - 计算属性在模板中用法与普通数据属性一样，`{{ doubledCount }}`。

### 4. **`props`**

`props` 是用来定义父组件传递给子组件的数据。通过 `props`，父组件可以向子组件传递数据。`props` 是父子组件之间传递数据的主要方式。

例子：

```javascript
props: {
  title: String,
  count: {
    type: Number,
    required: true
  }
}
```

- 解释

  ：

  - `title` 和 `count` 都是 props，父组件可以通过 `<ChildComponent :title="parentTitle" :count="parentCount" />` 将数据传递给子组件。
  - `count` 是一个必需的 prop，且必须是 `Number` 类型。
  - `title` 是一个可选的 prop，类型为 `String`。

### 5. **`watch`**

`watch` 用于观察数据的变化。当数据变化时，可以执行一些副作用或自定义逻辑。`watch` 用于监听单个数据属性或计算属性，并在变化时执行回调。

例子：

```javascript
watch: {
  count(newValue, oldValue) {
    console.log(`count changed from ${oldValue} to ${newValue}`)
  }
}
```

- 解释

  ：

  - 监听 `count` 数据的变化，触发回调函数并接收 `newValue` 和 `oldValue` 参数。
  - 可以用于监听某个数据的变化并进行异步操作或其他副作用。

### 6. **`created` / `mounted` / `updated` / `destroyed`**

Vue 的生命周期钩子函数是组件实例在不同阶段触发的函数，通常用来进行一些初始化工作或清理操作。

例子：

```javascript
created() {
  console.log('Component created')
},
mounted() {
  console.log('Component mounted to DOM')
},
updated() {
  console.log('Component updated')
},
destroyed() {
  console.log('Component destroyed')
}
```

- 解释

  ：

  - `created`：组件实例被创建后，数据观测和事件设置已完成，但还没有挂载到 DOM。
  - `mounted`：组件挂载到 DOM 后调用，通常用于 DOM 操作或发起请求。
  - `updated`：组件更新后调用，视图和数据都发生了变化。
  - `destroyed`：组件销毁时调用，可以在这里进行清理工作，如清除定时器、取消订阅等。

### 7. **`emits`**

Vue 3 引入了 `emits` 选项来声明组件发出的事件。这对于 TypeScript 用户尤其有用，它可以在组件的声明中显示指定哪些事件是组件可能会触发的。

例子：

```javascript
emits: ['update', 'submit']
```

- 解释

  ：

  - `emits` 声明了这个组件会发出 `update` 和 `submit` 这两个事件。
  - 通过 `this.$emit('update', newValue)` 触发事件。

### 8. **`name`**

`name` 用于定义组件的名称，通常用于递归组件或调试时更容易识别该组件。

例子：

```javascript
name: 'MyComponent'
```

- 解释

  ：

  - 组件名称 `MyComponent` 可以帮助调试工具更好地显示组件信息。

### 9. **`provide` / `inject`**

`provide` 和 `inject` 用于在祖先组件与后代组件之间共享数据，可以跨越多级组件传递数据，不需要通过 `props` 逐层传递。

例子：

```javascript
// 祖先组件
provide() {
  return {
    sharedData: this.sharedData
  }
}
// 后代组件
inject: ['sharedData']
```

- 解释

  ：

  - 通过 `provide` 共享数据，后代组件可以通过 `inject` 来访问。
  - 适用于跨越多层组件传递数据。

### 10. **`slot`**

`slot` 是 Vue 中的插槽机制，允许父组件在子组件中插入内容，提供了更灵活的组件组合能力。

例子：

```javascript
// 子组件
<template>
  <div>
    <slot></slot>
  </div>
</template>

// 父组件
<MyComponent>
  <p>This is a slot content</p>
</MyComponent>
```

- 解释

  ：

  - `slot` 用于在子组件中定义插槽，父组件通过 `<MyComponent>` 标签的内容来填充插槽。

### 总结

- **data**：定义响应式数据。
- **methods**：定义方法，响应事件或执行业务逻辑。
- **computed**：定义计算属性，基于响应式数据的派生值。
- **props**：定义父组件传递给子组件的数据。
- **watch**：观察响应式数据的变化，执行副作用。
- **生命周期钩子**：如 `created`、`mounted` 等，用于在组件生命周期的不同阶段执行特定操作。
- **emits**：声明组件发出的事件。
- **name**：定义组件名称，便于调试。
- **provide / inject**：跨组件层级传递数据。
- **slot**：插槽，用于在子组件中插入内容，增强组件的灵活性。

Vue 3 的选项式语法提供了丰富的 API，用来组织和管理组件的行为、状态和生命周期，使得开发者能够在不需要引入额外的复杂逻辑的情况下，高效地构建复杂的交互式 Web 应用。