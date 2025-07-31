import { defineStore } from 'pinia';
export const settingStore = defineStore('settingInfo', {
      // 开启数据缓存
  persist: {
    enabled: true
  },
    state: () => {
        return {
            menuState: false,
            tagsView: true,
        }
    },
    actions: {
        changeSetting(flag) {
            return new Promise(resolve => {
                this.menuState =flag;
                resolve()
            })
        },
    },
    getters: {
        
    }
})