import { isObj } from './utils';

export default {
  methods: {
    updateUrlSearchParams(query) {
      this.$router.replace({
        path: this.$route.path,
        query
      });
    },

    bindUrlQuery(keyMap) {
      this.initSearchParamsFromUrl(keyMap);
    },

    /**
     * @param keyMap 支持如下配置 { urlKey: 'dataKey', urlKey: { type: 'number || string', key: 'dataKey' }, urlKey: 'dataKey.key' }
     */
    initSearchParamsFromUrl(keyMap) {
      try {
        const query = this.$route.query;
        Object.keys(keyMap).forEach(urlKey => {
          const { value: initVal, type, datakey } = this._getConfigVal(keyMap[urlKey]);
          if (type !== "number" && type !== "string" && initVal !== null) {
            // console.warn(`initSearchParamsFromUrl: ${datakey} only support 'string' or 'number'`);
            return;
          }
          const urlVal = query[urlKey] || initVal; // 地址有值就取地址参数的值
          this._addUrlVal(urlKey, datakey, type === "number" && urlVal ? Number(urlVal) : String(urlVal), true);
          this._watch(urlKey, datakey);
        });
      } catch (e) {
        console.log("initSearchParamsFromUrlError: " + e);
      }
    },

    /**
     * 获取配置的值的value，type, datakey
     * @param {*} config
     */
    _getConfigVal(config) {
      let datakey;
      let defineType;
      if (typeof config === "string") {
        datakey = config;
      } else if (isObj(config)) {
        datakey = config.key;
        defineType = config.type;
      }
      const value = this._genVal(datakey); // data中的初始值
      const type = defineType || typeof value; // data中的初始值类型，自定义的type优先
      return { type, value, datakey };
    },

    /**
     * 监听data中的值变化，自动在url上修改
     * @param {*} urlKey url上映射的key
     * @param {*} datakey data中绑定的key
     */
    _watch(urlKey, datakey) {
      this.$watch(datakey, newVal => {
        this._addUrlVal(urlKey, datakey, newVal);
      });
    },

    /**
     * 将key映射到url
     * @param {*} urlKey url中显示的key
     * @param {*} datakey  data中定义的key
     * @param {*} value
     * @param {*} first
     */
    _addUrlVal(urlKey, datakey, value, first) {
      const query = { ...this.$route.query }; // query相同会执行abort
      query[urlKey] = value;
      first && this._setData(datakey, value);
      !first && this.updateUrlSearchParams(query);
    },

    /**
     * 修改data中的值
     */
    _setData(datakey, value) {
      const { target, lastKey } = this._getTarget(datakey);
      value = value === 'null' ? null : value;
      this.$set(target, lastKey, value);
    },

    /**
     * 获取属性的父对象
     * @param {*} datakey
     * @param {*} deep
     */
    _getTarget(datakey) {
      let target;
      let lastKey;
      if (/\./gi.test(datakey)) {
        // debugger
        const valueChains = datakey.split(".");
        const len = valueChains.length;
        lastKey = valueChains[len - 1];
        const targetChains = valueChains.slice(0, len - 1);
        if (targetChains.length === 1) {
          target = this[targetChains[0]]; //获取父级
        } else {
          target = targetChains.reduce((pre, cur, index) => {
            if (index === 1) {
              return this[pre][cur];
            }
            return pre[cur];
          });
        }
      } else {
        target = this;
        lastKey = datakey;
      }
      return { target, lastKey };
    },

    /**
     * 获取key的初始值
     * @param {*} key
     */
    _genVal(datakey) {
      const { target, lastKey } = this._getTarget(datakey);
      return target[lastKey];
    }
  }
};
