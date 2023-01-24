/**
 * 
 * @param {object} style 
 *  - input object for stylecreation
 *  - contains key for different element of styles
 * 
 *  - outputs object with each value of string, contacatenated by space from each element of the arr
 */
function createStyles(style) {
  const result = {}

  for (const [key, value] of Object.entries(style)) {
    result[key] = value.join(' ')
  }
  return result
}

export default createStyles
