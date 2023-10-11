/**
 * Storage二次封装
 * @author JackBean
 */

////ok
export default {
  setObjItem(key, val) {
    uni.setStorageSync(key, JSON.stringify(val));
  },
  getObjItem(key) {
    return JSON.parse(uni.getStorageSync(key) || "{}")
  },
  setItem(key, val) {
    uni.setStorageSync(key, val);
  },
  getItem(key) {
    return uni.getStorageSync(key) || ''
  }
}
