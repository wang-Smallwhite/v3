// 主题切换工具函数

// 获取当前主题
export function getCurrentTheme() {
  return localStorage.getItem('theme') || 'light'
}

// 设置主题
export function setTheme(theme) {
  // 保存到localStorage
  localStorage.setItem('theme', theme)
  
  // 应用主题到DOM
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.removeAttribute('data-theme')
  }
}

// 切换主题
export function toggleTheme() {
  const currentTheme = getCurrentTheme()
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
  setTheme(newTheme)
  return newTheme
}

// 初始化主题
export function initTheme() {
  // 检查系统主题偏好
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  // 获取用户保存的主题或使用系统偏好
  let theme = localStorage.getItem('theme')
  if (!theme) {
    theme = systemPrefersDark ? 'dark' : 'light'
    localStorage.setItem('theme', theme)
  }
  
  // 应用主题
  setTheme(theme)
  
  // 监听系统主题变化
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // 只有在用户没有手动设置主题时才跟随系统变化
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light')
    }
  })
}