import elementMap from './element-map';
import { isObject } from '../../utils';

const InputMap = ['el-input', 'el-input-number'];
// 规则
const getRrules = (item) => {
	const { rule, isRequired, title, type } = item;

	if (typeof isRequired === 'boolean' && isRequired) {
		const isInput = InputMap.indexOf(type) > -1;
		return {
			required: true,
			message: `${isInput ? '请输入' : '请选择'} ${title}`,
			trigger: `${isInput ? 'blur' : 'change'}`
		};
	} else if (isObject(rule) || Array.isArray(rule)) {
		// 用户传递校验规则
		return rule;
	} else {
		return null;
	}
};

// 获取item
export const computeFormItem = (config) => {
	const item = { ...config };
	const res = elementMap[item.type || 'input']; // 默认input
	item.type = res.component;
	// 外面可以传递props方法 合并配置  用户传递的优先级高
	item.props = Object.assign({}, res.props, item.props);

	// 校验
	item._rule = getRrules(item);

	if (item.contentWidth) {
		// 设置宽度
		const temp = typeof item.contentWidth === 'number' ? `${item.contentWidth}px` : item.contentWidth;
		item.props.style = { width: temp };
	}

	return item;
};
