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
