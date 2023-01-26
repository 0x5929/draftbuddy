import PropTypes from 'prop-types'
import { twMerge } from 'tailwind-merge'
import { useSlctStyles } from './styles'

// NOTE: errors and validation not included in Select
// to implement, take a look at TextField base Input Component
function Select({register, name, id, options, styles}) {

  const baseStyles = useSlctStyles()

  return (
    <div>
      <label htmlFor={id} className={baseStyles.label}>
       { name }
      </label>

      <select
        {...register(id)}

        id={id}
        name={id}
        className={twMerge(baseStyles.select, styles)}
      >
        {
          options && options.map((option) => (
            <option className={baseStyles.options} key={option}>
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
  styles: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired
}

Select.defaultProps = {
  styles: ''
}

export default Select