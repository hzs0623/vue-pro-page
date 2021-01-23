import { messages } from '../../../i18n';

export default {
  methods: {
    lang(key, ...values) {
      return this.$i18n ? this.$i18n._t(key, this.$i18n.locale, messages, null, ...values) : key;
    }
  },
}
