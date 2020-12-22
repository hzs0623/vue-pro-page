# vue-admin-components

## Project setup
```
yarn add
```

### Compiles and hot-reloads for development
```
yarn dev
```
# 使用文档



# 一、fd-form组件

### 1.整体的参数

| 参数       | 说明             | 类型   | 默认值 |
| ---------- | ---------------- | ------ | ------ |
| datas      | 见2.1表          | Array  | []     |
| hasControl | 控制按钮是否显示 | Booler | true   |
| sumbitText | 提交按钮显示文本 | String | '提交' |
| resetText  | 重置按钮显示文本 | String | '重置' |



### **2.datas参数**

| 参数         | 说明                        | 类型                                   | 默认值   |
| ------------ | --------------------------- | -------------------------------------- | -------- |
| title        | 表单名称                    | String                                 | -        |
| key          | 字段                        | String                                 | -        |
| type         | 表单类型                    | input、select、radio...                | Input    |
| options      | 表单为select、radio的时候用 | Array \| [{label: '表单', value: ''} ] | [ ]      |
| defaultValue | 表单默认值                  | String \| Number \| Array              |          |
| props        | 接受element原始属性值       | Object                                 | {}       |
| isRequired   | 是否校验                    | Booler                                 | false    |
| contentWidth | 文本宽度                    | Number \| 220px                        | 220px    |
| rule         | 校验规则                    | Array \| Object                        | [] \| {} |

​																								(2.1表)

#### **3.知识点**：

**1.component**  

**2.slot 具名插槽**

**3.vue组件之间通信。使用v-bind="$attrs"，从父组件传递给孙组件通信**



### 4.使用文档

**事件函数： submit**

```javascript
<Fd-from :datas="datas" @submit="onSubmit"></Fd-from>

onSubmit(data, valid) {
  // 接受两个参数：
  // data: 返回的formdata值 类型：Object
  // valid: 校验值 类型： Booler
 }
```



## 二、table组件

### 1.table整体参数：

| 参数      | 说明        | 类型  | 默认值 |
| --------- | ----------- | ----- | ------ |
| tableData | table列表值 | Array | [ ]    |
| options   | 列表配置项  | Array | [ ]    |
|           |             |       |        |

### 2.options参数：

| 参数  | 说明                  | 类型   | 默认值 |
| ----- | --------------------- | ------ | ------ |
| key   | 列表字段              | String | ''     |
| title | 列表标题              | String | ''     |
| props | 接受element原始属性值 | Object | {}     |
| slot  | 插槽名字              | String | ''     |

##### **3.使用文档**

使用插槽的时候

通过 `v-slot:name = { scope }` 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据，用法参考 demo。

```javascript
<Table :tableData="tables" :options="config">
        <template v-slot:name="{ scope }">{{ scope.row.name }}</template>
</Table>
```


