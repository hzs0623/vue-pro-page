/**
 * 职责： 多语言配置
*/

// import VueI18n from 'vue-i18n';
import locales from './lang/index.json';
const { zh, en } = locales;
export const messages = {
  zh,
  en
}

const currentLanguage = navigator.language === 'zh-CN' ? 'zh' : 'en';

export default (key) => messages[currentLanguage][key];
// export const i18n = new VueI18n({
//   locale: currentLanguage || 'zh', // 默认语言为中文 
//   messages,
// });
