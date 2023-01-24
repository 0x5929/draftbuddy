import PropTypes from 'prop-types'
import { useSlctStyles } from './styles'

// NOTE: errors and validation not included in Select
// to implement, take a look at TextField base Input Component
function Select({register, name, id, options}) {

  const styles = useSlctStyles()

  return (
    <div>
      <label htmlFor={id} className={styles.label}>
       { name }
      </label>

      <select
        {...register(id)}

        id={id}
        name={id}
        className={styles.select}
      >
        {
          options && options.map((option) => (
            <option key={option}>
              { option }
            </option>
          ))
        }
      </select>
    </div>
  )

}


Select.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired
}


export default Select