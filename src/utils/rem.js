/**
 * rem适配工具函数
 */

// 设置根字体大小
export function setRootFontSize() {
  const deviceWidth = document.documentElement.clientWidth || document.body.clientWidth
  // 假设设计稿宽度为750px，根字体大小为75px
  const fontSize = deviceWidth / 10
  document.documentElement.style.fontSize = fontSize + 'px'
  return fontSize
}

// px转rem函数
export function pxToRem(px) {
  const rootFontSize = parseFloat(document.documentElement.style.fontSize) || 75
  return px / rootFontSize + 'rem'
}

// 监听窗口大小变化
export function initRem() {
  setRootFontSize()
  window.addEventListener('resize', setRootFontSize)
}

export default {
  setRootFontSize,
  pxToRem,
  initRem
}