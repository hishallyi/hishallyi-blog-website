### 记忆技巧

数组元素的操作函数：add、get、remove、clear（清空全部元素）

集合元素的操作函数：add、remove、clear，没有get

双向链表（LinkedList，其实也是属于List）元素操作函数：add、get、remove、poll，由于是双向的，其中add和remove函数名后面可以跟First、Last来指定插入和删除的位置



哈希元素的操作函数：put、get、remove、containsKey、clear



栈和队列的查看元素的函数中都包含peek

栈对栈顶的元素的操作函数：push、pop、peek（仅查看不删除）

队列对双端元素的操作函数：添加是offer、移除是poll、查看是peek，后面跟的First、Last表示对队首和队尾的操作



### ArrayList

`ArrayList` 是一个动态数组，允许元素重复，有序存储。

- **添加元素**：
  - `boolean add(E e)`：将指定元素添加到列表的末尾。
  - `void add(int index, E element)`：在指定位置插入指定元素。

- **获取元素**：
  - `E get(int index)`：返回指定位置的元素。

- **删除元素**：
  - `E remove(int index)`：移除指定位置的元素，并返回该元素。
  - `boolean remove(Object o)`：移除列表中第一次出现的指定元素（如果存在）。

- **其他**：
  - `int size()`：返回列表中的元素个数。
  - `boolean isEmpty()`：判断列表是否为空。
  - `void clear()`：移除列表中的所有元素。

### Vector
`Vector` 也是一个动态数组，与 `ArrayList` 类似，但它是线程安全的。

- **添加元素**：
  - `boolean add(E e)`：将指定元素添加到向量的末尾。
  - `void add(int index, E element)`：在指定位置插入指定元素。
  - `boolean addAll(Collection<? extends E> c)`：将指定集合中的所有元素添加到此向量的末尾。

- **获取元素**：
  - `E get(int index)`：返回指定位置的元素。

- **删除元素**：
  - `E remove(int index)`：移除指定位置的元素，并返回该元素。
  - `boolean remove(Object o)`：移除向量中第一次出现的指定元素（如果存在）。

- **其他**：
  - `int size()`：返回向量中的元素个数。
  - `boolean isEmpty()`：判断向量是否为空。
  - `void clear()`：移除向量中的所有元素。
  - `synchronized E elementAt(int index)`：返回指定位置的元素（线程安全）。

### HashSet
`HashSet` 是一个无序集合，不允许元素重复。

- **添加元素**：
  - `boolean add(E e)`：如果指定元素不在集合中，则将其添加到集合中。

- **删除元素**：
  - `boolean remove(Object o)`：如果集合中存在指定元素，则将其移除。

- **其他**：
  - `int size()`：返回集合中的元素个数。
  - `boolean isEmpty()`：判断集合是否为空。
  - `void clear()`：移除集合中的所有元素。
  - `boolean contains(Object o)`：判断集合中是否包含指定元素。

### LinkedList

`LinkedList` 是一个双向链表实现的列表，它实现了 `List` 和 `Deque` 接口，既可以作为列表使用，也可以作为队列或栈使用。

```java
import java.util.LinkedList;

public class LinkedListExample {
    public static void main(String[] args) {
        LinkedList<String> linkedList = new LinkedList<>();

        // 添加元素
        linkedList.add("A");
        linkedList.addLast("B"); // 在列表末尾添加元素
        linkedList.addFirst("C"); // 在列表开头添加元素

        // 获取元素
        String first = linkedList.getFirst();
        String last = linkedList.getLast();

        // 删除元素
        linkedList.removeFirst();
        linkedList.removeLast();

        // 遍历元素
        for (String element : linkedList) {
            System.out.println(element);
        }
    }
}
```

常用方法：

- 添加元素
  - `add(E e)`：将指定元素添加到列表末尾。
  - `addFirst(E e)`：将指定元素插入到列表开头。
  - `addLast(E e)`：将指定元素添加到列表末尾。
  - `offer()`
- 获取元素
  - `getFirst()`：返回列表的第一个元素。
  - `getLast()`：返回列表的最后一个元素。
  - `get(int index)`：返回指定索引处的元素。
- 删除元素
  - `removeFirst()`：移除并返回列表的第一个元素。
  - `removeLast()`：移除并返回列表的最后一个元素。
  - `remove(int index)`：移除指定索引处的元素。
  - `poll()`

### HashMap

`HashMap` 是一个键值对集合，允许 `null` 键和 `null` 值，无序存储。

- **添加元素**：
  - `V put(K key, V value)`：将指定的键值对添加到映射中。如果映射中已存在该键，则替换其对应的值。

- **获取元素**：
  - `V get(Object key)`：返回指定键所映射的值；如果此映射不包含该键的映射关系，则返回 `null`。

- **删除元素**：
  - `V remove(Object key)`：如果存在指定键的映射关系，则将其从映射中移除，并返回该键所映射的值。

- **其他**：
  - `int size()`：返回映射中的键值对数量。
  - `boolean isEmpty()`：判断映射是否为空。
  - `void clear()`：移除映射中的所有键值对。
  - `boolean containsKey(Object key)`：判断映射中是否包含指定键的映射关系。
  - `boolean containsValue(Object value)`：判断映射中是否存在一个或多个键映射到指定的值。
  - `Set<K> keySet()`：返回映射中包含的键的 `Set` 视图。
  - `Collection<V> values()`：返回映射中包含的值的 `Collection` 视图。
  - `Set<Map.Entry<K, V>> entrySet()`：返回映射中包含的键值对的 `Set` 视图。

### Stack

`Stack` 是一个后进先出（LIFO）的栈，它继承自 `Vector` 类。

```java
import java.util.Stack;

public class StackExample {
    public static void main(String[] args) {
        Stack<String> stack = new Stack<>();

        // 入栈
        stack.push("A");
        stack.push("B");

        // 出栈
        String top = stack.pop();

        // 查看栈顶元素
        String peek = stack.peek();

        // 判断栈是否为空
        boolean isEmpty = stack.isEmpty();

        System.out.println("Top element: " + peek);
        System.out.println("Is stack empty? " + isEmpty);
    }
}
```

常用方法：

- 入栈
  - `push(E item)`：将元素压入栈顶。
- 出栈
  - `pop()`：移除并返回栈顶元素。
- 查看栈顶元素
  - `peek()`：返回栈顶元素，但不移除。
- 判断栈是否为空
  - `isEmpty()`：如果栈为空返回 `true`，否则返回 `false`。

### Deque

`Deque` 是一个双端队列**接口**，它支持在队列的两端插入和删除元素。`LinkedList` 和 `ArrayDeque` 都实现了 `Deque` 接口。

```java
import java.util.Deque;
import java.util.LinkedList;

public class DequeExample {
    public static void main(String[] args) {
        Deque<String> deque = new LinkedList<>();

        // 在头部添加元素
        deque.addFirst("A");
        // 在尾部添加元素
        deque.addLast("B");

        // 从头部移除元素
        String first = deque.removeFirst();
        // 从尾部移除元素
        String last = deque.removeLast();

        System.out.println("First element: " + first);
        System.out.println("Last element: " + last);
    }
}
```

常用方法：

- 添加元素
  - `addFirst(E e)`：在双端队列的头部插入元素。
  - `addLast(E e)`：在双端队列的尾部插入元素。
- 移除元素
  - `removeFirst()`：移除并返回双端队列的第一个元素。
  - `removeLast()`：移除并返回双端队列的最后一个元素。
- 查看元素
  - `getFirst()`：返回双端队列的第一个元素。
  - `getLast()`：返回双端队列的最后一个元素。

### ArrayDeque

`ArrayDeque` 是一个基于数组实现的双端队列，它比 `LinkedList` 在某些操作上更高效。

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class ArrayDequeExample {
    public static void main(String[] args) {
        Deque<String> deque = new ArrayDeque<>();

        // 在头部添加元素
        deque.offerFirst("A");
        // 在尾部添加元素
        deque.offerLast("B");

        // 从头部移除元素
        String first = deque.pollFirst();
        // 从尾部移除元素
        String last = deque.pollLast();

        System.out.println("First element: " + first);
        System.out.println("Last element: " + last);
    }
}
```

常用方法：

- 添加元素
  - `offerFirst(E e)`：在双端队列的头部插入元素，如果插入成功返回 `true`。
  - `offerLast(E e)`：在双端队列的尾部插入元素，如果插入成功返回 `true`。
- 移除元素
  - `pollFirst()`：移除并返回双端队列的第一个元素，如果队列为空返回 `null`。
  - `pollLast()`：移除并返回双端队列的最后一个元素，如果队列为空返回 `null`。
- 查看元素
  - `peekFirst()`：返回双端队列的第一个元素，如果队列为空返回 `null`。
  - `peekLast()`：返回双端队列的最后一个元素，如果队列为空返回 `null`。
