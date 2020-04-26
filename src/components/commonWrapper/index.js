/**
 * 传入的参数 full和 ten 每次只能用一个 可以不用
 * full: Boolean, true | false
 * ten: Boolean, true | false
 * width: String, 20px | 20% | 20vw (最大100vw)
 * height: String, 20px | 20% | 20vh (最大100vh)
 *
 * 使用
 * <CommonWrapper ></CommonWrapper>
 * <common-wrapper ></common-wrapper>
 */
import CommonWrapper from "./commonWrapper";

const install = function(Vue) {
  Vue.component(CommonWrapper.name, CommonWrapper);
};
const VueCommonWrapper = { CommonWrapper, install };

export default VueCommonWrapper;
export { CommonWrapper, install };
