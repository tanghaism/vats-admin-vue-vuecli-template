// 防抖，多用于搜索输入
// @param func 传入的回调函数
// @param delay 延时抖动时长，默认200毫秒
// @param immediate 调用时是否立即触发回调函数，默认false
export function debounced(
  func: (...args: any) => void,
  delay = 200,
  immediate = false,
): (...args: any) => void {
  let timer: any;
  return function (this: void, ...args: any) {
    if (immediate) {
      func.apply(this, args);
      immediate = false;
      return;
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
