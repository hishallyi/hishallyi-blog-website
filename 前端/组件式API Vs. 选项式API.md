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

