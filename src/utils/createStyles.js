/**
 * 
 * @param {object} style 
 *  - input object for stylecreation
 *  - contains key for different element of styles
 * 
 */
function createStyles(style) {

  const result = {}

  for (const [key, value] of Object.entries(style)) {
    result[key] = value.join(' ')
  }

  return result
}

export default createStyles
