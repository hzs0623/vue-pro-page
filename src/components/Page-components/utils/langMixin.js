/**
 * 职责： 多语言配置 mixins
 * 
*/
import i18n from '../../../i18n';

export default {
  methods: {
    lang(key) {
      return i18n(key);
    }
  },
}
