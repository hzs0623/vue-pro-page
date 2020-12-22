<script>
export default {
  name: 'fd-render',
  props: {
    scope: Object, // 当前的值
    render: {
      type: Function,
      default: function () {},
    },
  },
  functional: true, //函数式组件
  render: (h, ctx) => {
    // 进行渲染
    return ctx.props.render ? ctx.props.render(h, ctx.props.scope) : '';
  },
};
</script>
