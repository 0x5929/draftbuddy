import PropTypes from 'prop-types'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { useTxtFldStyles } from './styles'

function TextField({register, errors, name, id, validation}) {

  const styles = useTxtFldStyles(errors[id])

  return (
    <div>
      <label htmlFor={id} className={styles.label}>
        { name }
      </label>

      <div className={styles.inputContainer}>
        <input          
          {...register(id, validation)}

          type="text"
          name={id}
          id={id}
          className={styles.input}
          aria-invalid={errors[id] ? 'true' : 'false'}
        />
        {
          errors[id] && 
            <div className={styles.iconContainer}>
              <ExclamationCircleIcon className={styles.icon} aria-hidden="true" />
            </div>
        }
      </div>
      {
        errors[id] &&
          <p className={styles.errMsg}>
            { errors[id].message }
          </p>
      }
    </div>
  )
}

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  validation: PropTypes.oneOfType([
    PropTypes.oneOfType([      
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.instanceOf(RegExp),
      PropTypes.object
    ])
  ]),
  errors: PropTypes.oneOfType([
    PropTypes.object
  ]),


}

TextField.defaultProps = {
  validation: null,
  errors: null
}

export default TextField