/**
 * 
 * @param {string} hcValue headcount value
 *  provides validation for pickNumber based on hc value
 * 
 *  tests if value is postive integer, and if its smaller or eq to hcvalue
 */

const  validatePick = (hcValue) => 
  (value) => 
    ( 
      /^\+?(0|[1-9]\d*)$/.test(value) && 
      parseInt(value, 10) <= parseInt(hcValue, 10) && 
      parseInt(value, 10) !== 0 
    ) 
    
    || 'Please enter a valid draft pick.'


export default validatePick