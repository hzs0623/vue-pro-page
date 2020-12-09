<script>
export default {
  name: 'Render',
  props: {
    scope: Object,
    render: {
      type: Function,
      default: function () { }
    }
  },
  functional: true,
  render: (h, ctx) => {
    // 进行渲染
    return ctx.props.render ? ctx.props.render(h, ctx.props.scope) : ''
  }
};
</script>
