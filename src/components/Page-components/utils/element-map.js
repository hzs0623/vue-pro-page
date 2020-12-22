//  映射组件
export default {
	input: {
		component: 'el-input',
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
		component: 'fd-select',
		props: {
			filterable: true, // 默认开启模糊搜索
			clearable: true // 默认开启清除功能
		}
	},

	// 日期时间
	datepicker: {
		component: 'BaseDate',
		props: {
			type: "datetimerange",
			rangeSeparator: "至",
			startPlaceholder: "开始日期",
			endPlaceholder: "结束日期",
		}
	},
};
