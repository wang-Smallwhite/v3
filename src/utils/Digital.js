/**
 * 数字处理工具类
 * @class Digital
 * @description 提供各种数字处理方法，如格式化、转换等
 */

class Digital {
  // 保留小数位数
  static toFixed(num, fractionDigits) {
    const factor = Math.pow(10, fractionDigits)
    return Math.round(num * factor) / factor
  }

  // 数字千分位格式化
  static formatThousands(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  // 数字转百分比格式
  static toPercentage(num, fractionDigits = 2) {
    return `${this.toFixed(num * 100, fractionDigits)}%`
  }

  // 百分比格式转数字
  static fromPercentage(percentageStr) {
    return parseFloat(percentageStr.replace('%', '')) / 100
  }

  /**
   * 获取数字的小数位数
   * @param {number} num - 输入数字
   * @returns {number} - 小数位数
   */
  static getDecimalPlaces(num) {
    const numStr = num.toString()
    const decimalIndex = numStr.indexOf('.')
    return decimalIndex === -1 ? 0 : numStr.length - decimalIndex - 1
  }

  /**
   * 精确加法函数，解决浮点数精度问题
   * @param {number} num1 - 第一个加数
   * @param {number} num2 - 第二个加数
   * @returns {number} - 精确的和
   * @example
   * preciseAdd(0.1, 0.2) // 返回 0.3
   */
  static preciseAdd(num1, num2) {
    // 处理浮点数精度问题
    const factor = Math.pow(10, Math.max(this.getDecimalPlaces(num1), this.getDecimalPlaces(num2)))
    // 使用整数进行加法运算，避免浮点数精度丢失
    return (Math.round(num1 * factor) + Math.round(num2 * factor)) / factor
  }

  static preciseAddMultiple(...nums) {
    return nums.reduce((acc, curr) => this.preciseAdd(acc, curr), 0)
  }

  /**
   * 精确减法函数，解决浮点数精度问题
   * @param {number} num1 - 被减数
   * @param {number} num2 - 减数
   * @returns {number} - 精确的差
   * @example
   * preciseSubtract(0.3, 0.1) // 返回 0.2
   */
  static preciseSubtract(num1, num2) {
    // 处理浮点数精度问题
    const factor = Math.pow(10, Math.max(this.getDecimalPlaces(num1), this.getDecimalPlaces(num2)))
    // 使用整数进行减法运算，避免浮点数精度丢失
    return (Math.round(num1 * factor) - Math.round(num2 * factor)) / factor
  }

  static preciseSubtractMultiple(...nums) {
    return nums.reduce((acc, curr) => this.preciseSubtract(acc, curr))
  }

  /**
   * 精确乘法函数，解决浮点数精度问题
   * @param {number} num1 - 第一个乘数
   * @param {number} num2 - 第二个乘数
   * @returns {number} - 精确的积
   * @example
   * preciseMultiply(0.1, 0.2) // 返回 0.02
   */
  static preciseMultiply(num1, num2) {
    const totalDecimalPlaces = this.getDecimalPlaces(num1) + this.getDecimalPlaces(num2)
    const intNum1 = Number(num1.toString().replace('.', ''))
    const intNum2 = Number(num2.toString().replace('.', ''))
    return (intNum1 * intNum2) / Math.pow(10, totalDecimalPlaces)
  }
  static preciseMultiplyMultiple(...nums) {
    return nums.reduce((acc, curr) => this.preciseMultiply(acc, curr), 1)
  }

  /**
   * 精确除法函数，解决浮点数精度问题
   * @param {number} num1 - 被除数
   * @param {number} num2 - 除数
   * @returns {number} - 精确的商
   * @example
   * preciseDivide(0.3, 0.1) // 返回 3.0
   */
  static preciseDivide(num1, num2) {
    const decimalPlacesNum1 = this.getDecimalPlaces(num1)
    const decimalPlacesNum2 = this.getDecimalPlaces(num2)
    const intNum1 = Number(num1.toString().replace('.', ''))
    const intNum2 = Number(num2.toString().replace('.', ''))
    return (intNum1 / intNum2) * Math.pow(10, decimalPlacesNum2 - decimalPlacesNum1)
  }
  static preciseDivideMultiple(...nums) {
    return nums.reduce((acc, curr) => this.preciseDivide(acc, curr))
  }
}

// 导出类本身，以便可以调用静态方法
export default Digital

// 如果需要实例，也可以创建并导出
export const digitalInstance = new Digital()
