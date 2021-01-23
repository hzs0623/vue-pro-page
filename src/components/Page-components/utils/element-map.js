/** 
 *  映射组件
 * key: type用户传递组件名 例如（input => el-input)
 * component:  组件名
 * props: 配置项
 * 
*/
export default {
	input: {
		component: 'Input',
		props: {
			clearable: true,
			style: {
				width: '200px'
			}
		}
	},

	checkbox: {
		component: 'el-checkbox',
		props: {
			clearable: true
		}
	},

	// 数字输入框
	inputNumber: {
		component: 'el-input-number',
		props: {
			clearable: true
		}
	},

	// 多行文本框
	textarea: {
		component: 'el-input',
		props: {
			type: 'textarea',
			rows: 6,
			style: {
				width: '300px'
			}
		}
	},

	// 时间
	datetime: {
		component: 'el-date-picker',
		props: {
			type: 'datetime',
			valueFormat: 'timestamp'
		}
	},


	/* 
	*  自定义组件
	*/
	select: {
		component: 'base-select',
		props: {
			filterable: true, // 默认开启模糊搜索
			clearable: true // 默认开启清除功能
		}
	},

	// 日期时间
	daterange: {
		component: 'BaseDate',
		props: {
			type: "daterange",
			rangeSeparator: "至",
			startPlaceholder: "开始日期",
			endPlaceholder: "结束日期",
		}
	},
};
