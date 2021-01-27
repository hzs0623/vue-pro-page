# vue-dynamic-page

# 中后台页面组件

## Development

```bash
$ yarn add vue-pro-page
```


## 前言


> 本组件适用于中后台管理系统，由表单、列表、页码三部分组成。
>
> 减少冗余代码，只需配置一些选项即可渲染页面。
>
> 提高开发效率，便于维护。



**1.注意事项：**

> 项目里面注意要配置vue- i18n。



**2.后端规范字段：**

​		**1.选择器**   映射数据字段    =>  数组  []

​				`demo` [ {lable： 标题 ,     value： 选择值} ]

​		**2.列表映射** 映射字段  =>  {}

​    			`demo`	{ key: '映射值'， value： ‘显示值’ }



## 引入：

```javascript
--全局引入--
import Vue from 'vue';
import DynamicPage from '@vue-dynamic-page';// +
Vue.use(DynamicPage);  // +

or

--单独引入--
import { DynamicPage } from '@vue-dynamic-page'; // +
Vue.component(DynamicPage.name, DynamicPage);   // +

```



## 一、Form组件

#### **1.Form Attributes**

| 参数       | 说明             | 类型    | 默认值 |
| ---------- | ---------------- | ------- | ------ |
| form       | 见2.1表          | Array   | []     |
| hasControl | 控制按钮是否显示 | Boolean | true   |
| sumbitText | 提交按钮显示文本 | String  | '提交' |
| resetText  | 重置按钮显示文本 | String  | '重置' |

#### **2.Form Option**

>(2.1表)

| 参数         | 说明                                                         | 类型                      | 默认值                    |
| ------------ | ------------------------------------------------------------ | ------------------------- | ------------------------- |
| title        | 表单名称                                                     | String                    | -                         |
| key          | 字段                                                         | String                    | -                         |
| type         | 表单类型                                                     | input、select、radio...   | Input                     |
| options      | 表单为select、radio的时候用, 支持对象格式{key: 值， value： '标题'} | Array \| { }              | [{label: '', value: ''} ] |
| defaultValue | 默认值                                                       | String \| Number \| Array | -                         |
| props        | 接受element原始属性值                                        | Object                    | {}                        |
| isRequired   | 是否校验                                                     | Boolean                   | false                     |
| contentWidth | 文本宽度                                                     | Number \| String          | 220px                     |
| rule         | 校验规则                                                     | Array \| Object           | [] \| {}                  |
| mapKey       | 日期选择多个key值(参数一：开始时间，参数二： 结束时间)。返回两个时间戳 | Array                     | [ ]                       |
| interval     | 日期间隔默认时间（天）                                       | Number ｜ String          | -                         |

#### **3.Form Events**

| 事件名称 | 说明                                                       | 参数                  |
| -------- | ---------------------------------------------------------- | --------------------- |
| submit   | Form提交方法，返回两个参数。参数一form值，第二个参数校验值 | Function(data, valid) |
| reset    | 重置按钮， 返回form值                                      | Function(form)        |

`Demo`

```javascript
<template>
  <dynamic-page :form="form" @submit="onSubmit"> </dynamic-page>
</template>

export default {
  data() {
    return {
       form: [
        { title: '员工', key: 'name', type: 'input',},
        {
          title: '时间',
          key: 'time',
          type: 'daterange',
          mapKey: ['start', 'end'], // 返回mapkey两个字段
          interval: 7, // 默认间隔7天
        },
        {
          title: '选择器',
          key: 'selectKey',
          type: 'select'
          options: [
            { label: 'name', value: '一方', },
        	  { label: 'base', value: '广州', },
          ],
        },
      ],
    }
  },
  methods: {
    onSubmit(data, valid) {
  	// 接受两个参数：
    // data: 返回的formdata值 类型：Object
    // valid: 校验值 类型： Booler
   }
  }
}

```

#### 4.Form Scoped Slot

> form表单支持具名插槽获取当前值

| name     | 说明           | 默认值 |
| -------- | -------------- | ------ |
| formData | 当前form所有值 | {}     |

`Demo`

```javascript
<template>
  <dynamic-page :form="form">
   + <template v-slot:formData="{ form }">
   +  <div>{{ form }}</div>  
	 +		<!--获取值： { "name": null, "age": null,  }  -->
   +  </template>
  </dynamic-page>
</template>

export default {
  data() {
    return {
       form: [
        { title: '员工', key: 'name', type: 'input' },
        { title: '年龄', key: 'age', type: 'input' },
      ],
    }
  },
}
```



## 二、table组件

#### 1.Aable Attributes

`table`列表接受两个属性值，一个为列表值，一个为配置值。

| 参数            | 说明            | 类型    | 默认值 |
| --------------- | --------------- | ------- | ------ |
| tableData       | table列表值     | Array   | [ ]    |
| tableConfig     | table配置项     | Array   | [ ]    |
| isTableCheckBox | table条件显示列 | boolean | false  |

#### 2.tableConfig Attributes

| 参数   | 说明                                       | 类型             | 默认值 |
| ------ | ------------------------------------------ | ---------------- | ------ |
| key    | 列表字段                                   | String           | ''     |
| title  | 列表标题                                   | String           | ''     |
| props  | 接受element原始属性值                      | Object           | {}     |
| format | 格式化时间   可以传递 (YYYY-MM-DD)进行过滤 | String \|boolean | true   |
| render | render函数进行渲染                         | Function         | -      |
| map    | 映射数据的map值 映射key值来获取value显示   | Object           | {}     |

`Demo`

```javascript
<template>
  <dynamic-page :tableData="tableLists" :tableConfig="tableConfig"></dynamic-page>
</template>

export default {
  data() {
    return {
       tableConfig: [
        { key: 'date', title: '时间', props: { width: 180 }, format: true },
        { key: 'name', title: '姓名' },
        { key: 'address', title: '地区' },
        { key: 'jobs', title: '岗位' },
      ],
       tableLists: [
        { date: 1607265511, name: '一方', address: '广州', jobs: '前端' },
        { date: 1607265510, name: 'xx', address: '广州', jobs: '前端' },
        { date: 1607265511856, name: 'xx', address: '广州', jobs: '前端' },
        { date: 1608870702164, name: 'xx', address: '广州', jobs: '后端' },
      ],
    }
  },
}
```

#### **3.Table-column Scoped Slot**

通过 `v-slot:name = { scope }` 可以获取到 row, column, $index的数据，用法参考 demo。

>注意:`name`就是key的值对应。

| name | 说明                                           | 默认值 |
| ---- | ---------------------------------------------- | ------ |
| key  | 自定义列的内容，参数为 { row, column, $index } | -      |

`Demo`

```javascript
<template>
  <dynamic-page :tableData="tableLists" :tableConfig="tableConfig">
   + <template v-slot:option="scope">
   +   <div>
   +     <el-button type="primary" @click="handleOption(scope)">操作</el-button> 
   +   </div>
   +  </template>
  </dynamic-page>
</template>

export default {
  data() {
    return {
       tableConfig: [
        { key: 'date', title: '时间', props: { width: 180 }, format: true },
        { key: 'name', title: '姓名' },
        { key: 'address', title: '地区' },
        { key: 'jobs', title: '岗位' },
        { key: 'option', title: '操作' }, // 自定义一个key值来进行插槽使用
      ],
       tableLists: [
        { date: 1607265511, name: 'xx', address: '广州', jobs: '前端' },
        { date: 1607265510, name: 'xx', address: '广州', jobs: '前端' },
        { date: 1607265511856, name: 'xx', address: '广州', jobs: '前端' },
        { date: 1608870702164, name: 'xx', address: '广州', jobs: '后端' },
      ],
    }
  },
  methods: {
   handleOption(scope) {}, 
  }
}

```

**4.table使用render函数**

参考`Vue-render`地址： [参考地址](https://cn.vuejs.org/v2/guide/render-function.html)，  在table里面不想添加`key`来进行插槽使用时，也可以使用`render`函数来进行渲染。

> 参数一：`render`函数， 参数二：当前行值

`Demo`

```javascript
export default {
  data() {
    return {
       tableConfig: [
        { key: 'date', title: '时间', props: { width: 180 }, format: true },
        { key: 'address', title: '地区' },
        { key: 'jobs', title: '岗位' },
        {
          key: 'option',
          title: '操作',
          render: (h, { row }) => {
            return h('el-button', {
              props: {
                type: 'primary',
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
      ],
       tableLists: [
        { date: 1607265511, name: '一方', address: '广州', jobs: '前端' },
        { date: 1607265510, name: 'xx', address: '广州', jobs: '前端' },
        { date: 1607265511856, name: 'xx', address: '广州', jobs: '前端' },
        { date: 1608870702164, name: 'xx', address: '广州', jobs: '后端' },
      ],
    }
  },
  methods: {
    onUpdate(row) {}
  }
}
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

`Demo`

```javascript
<template> 
	<dynamic-page
      @changePage="changePage"
      :total="total"
      :currentPage="1"
      :pageSize="10"
    ></dynamic-page>
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
