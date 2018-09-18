export const mixinHighLight = function(str, keywords) {
  if (typeof str !== 'string') return ''
  if (!keywords) return str
  const reg = new RegExp(keywords, 'g')
  return str.replace(reg, `<span style="color: red;">${keywords}</span>`)
}
