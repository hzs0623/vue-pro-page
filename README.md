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

## 一、fd-form组件

#### **1.Form Attributes**

| 参数       | 说明               | 类型   | 默认值 |
| ---------- | ------------------| ------ | ------ |
| form       | 见2.1表           | Array  | []     |
| hasControl | 控制按钮是否显示    | Booler | true   |
| sumbitText | 提交按钮显示文本    | String | '提交' |
| resetText  | 重置按钮显示文本    | String | '重置' |

#### **2.Form Option**

>(2.1表)

| 参数         | 说明                        | 类型                                   | 默认值   |
| ------------ | --------------------------- | -------------------------------------- | -------- |
| title        | 表单名称                    | String                                 | -        |
| key          | 字段                        | String                                 | -        |
| type         | 表单类型                    | input、select、radio...                | Input    |
| options      | 表单为select、radio的时候用 | Array \| [{label: '表单', value: ''} ] | [ ]      |
| defaultValue | 默认值                    | String \| Number \| Array           |          |
| props        | 接受element原始属性值       | Object                             | {}       |
| isRequired   | 是否校验                    | Booler                            | false    |
| contentWidth | 文本宽度                    | Number \| String                  | 220px    |
| rule         | 校验规则                    | Array \| Object                   | [] \| {} |

#### **3.Form Events**

| 事件名称    | 说明              | 参数 |
| ----------| ---------------------- | ---------------------------|
| submit    | Form提交方法，接受两个参数。参数一form值，第二个参数校验值|  Function(data, valid)    |

```javascript
<Fd-main :form="formData" @submit="onSubmit"></Fd-main>

onSubmit(data, valid) {
  // 接受两个参数：
  // data: 返回的formdata值 类型：Object
  // valid: 校验值 类型： Booler
 }
```

## 二、table组件

#### 1.Aable Attributes
`table`列表接受两个属性值，一个为列表值，一个为配置值。

| 参数          | 说明        | 类型  | 默认值 |
| ------------- | ----------- | ----- | ------ |
| tableData     | table列表值 | Array | [ ]    |
| tableConfig   | 列表配置项  | Array | [ ]    |

#### 2.tableConfig Attributes

| 参数   | 说明                  | 类型   | 默认值 |
| ------ | --------------------- | ------ | ------ |
| key    | 列表字段              | String | ''     |
| title  | 列表标题              | String | ''     |
| props  | 接受element原始属性值 | Object | {}     |
| format | 格式化时间的时候传递  | Booler | true   |
| render | render函数进行渲染  | Function | -   |

```javascript
tableConfig: [
        { key: "date", title: "时间", props: { width: "180" }, format: true },
        { key: "name", title: "姓名", },
        { key: "address", title: "地区" },
    ]
```

#### **3.Table-column Scoped Slot**

通过 `v-slot:name = { scope }` 可以获取到 row, column, $index的数据，用法参考 demo。
>注意:`name`就是key的值对应。

| name | 说明 | 默认值 |
| ---- |-----|-------|
| key  | 自定义列的内容，参数为 { row, column, $index }  | |

```javascript
<Fd-main :tableData="list" :tableConfig="tableConfig">
        <template v-slot:name="scope">{{ scope.row.name }}</template>
</Fd-main>
```

**4.table使用render函数**

参考Vue-render地址： [参考地址](https://cn.vuejs.org/v2/guide/render-function.html)

> 参数一：render函数， 参数二：当前行值

```javascript
 {
    title: '操作',
    render: (h, { row }) => {
         return h('el-button', {
            props: {
              type: 'primary'
            },
            on: {
              click: () => {
                this.onUpdate(row);
                },
              },
           domProps: {
              innerHTML: '操作',
             },
          });
     },
 },
```

## 三、Pagination 分页使用

#### Pagination Attributes

| 参数        | 说明                         | 类型         | 默认值                    |
| :---------- | ---------------------------- | ------------ | ------------------------- |
| currentPage | 当前页码                     | Number       | 1                         |
| pageSize    | 页数                         | Number       | 10                        |
| total       | 总条数                       | number       | -                         |
| pageSizes   | 每页显示个数选择器的选项设置 | number ｜ [] | [10, 20, 30, 40, 50, 100] |

#### Pagination Events

| 事件名称   | 说明                     | 回调函数       |
| ---------- | ------------------------ | -------------- |
| changeSize | pageSize 改变时会触发    | size，formData |
| changePage | currentPage 改变时会触发 | page, formData |



```javascript
<template> 
	<FdMain
      @changePage="changePage"
      :total="total"
      :currentPage="1"
      :pageSize="10"
    ></FdMain>
</template>

export default {
 methods: {
    changePage(page, form) { 
      // 接受两个参数
      //1. page 当前页码
      //2. form 表单数据
      console.log(page, form);
    },
  },
}
```
