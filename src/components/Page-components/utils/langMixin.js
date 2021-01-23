// import { messages } from '../../../i18n';

export default {
  methods: {
    lang(key) {
      return key
    //  return messages['zh'][key];
      // return this.$i18n ? this.$i18n._t(key, this.$i18n.locale, messages, null) : key;

    }
  },
}
