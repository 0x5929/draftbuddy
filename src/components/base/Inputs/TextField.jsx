import PropTypes from 'prop-types'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { twMerge } from 'tailwind-merge'
import { useTxtFldStyles } from './styles'

function TextField({register, errors, name, id, validation, styles}) {

  const baseStyles = useTxtFldStyles(errors[id])

  return (
    <div>
      <label htmlFor={id} className={baseStyles.label}>
        { name }
      </label>

      <div className={baseStyles.inputContainer}>
        <input          
          {...register(id, validation)}

          type="text"
          name={id}
          id={id}
          className={twMerge(baseStyles.input, styles)}
          aria-invalid={errors[id] ? 'true' : 'false'}
        />
        {
          errors[id] && 
            <div className={baseStyles.iconContainer} role="alert">
              <ExclamationCircleIcon className={baseStyles.icon} aria-hidden="true" />
            </div>
        }
      </div>
      {
        errors[id] &&
          <p className={baseStyles.errMsg} role="alert">
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
  styles: PropTypes.string,
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
  errors: null,
  styles: ''
}

export default TextField