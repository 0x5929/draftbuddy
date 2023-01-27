// going to be a nice looking form
// composed of components that is styled at the component lvl
import { useForm } from 'react-hook-form'
import { useAPIQuery } from '@Hooks'

import { Card, TextField, Select, Button } from '@Components'
import useDraftInputSytles from './styles'

export default function DraftInput() {

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues : {
      leagueFormat: '1/2 PPR',
      headCount: ''
    }
  })

  const styles = useDraftInputSytles()

  const onSubmit = data => useAPIQuery(data)

  return (
    // form container 
    <div className={styles.formContainer} role="form">
      <form className={styles.form} action="#" method="POST">
        <Card styles={styles.cardContainer}>
          <div className={styles.gridContainer}>
            <div className={styles.gridColumn}>
              <Select
                register={register}
                name='League Format'
                id='leagueFormat'
                options={[
                  'Points Per Reception (PPR)',
                  '1/2 PPR',
                  'Standard non PPR'
                ]}
              />
              <TextField 
                register={register}
                errors={errors}
                name='# of Participants'
                id='headCount'
                validation={{ 
                  required: 'This field is required.' , 
                  pattern: { 
                    value:  /^(8|10|12|14|16)$/i, 
                    message: 'Please enter an even # between 8 to 16.' }}}
              />
            </div>
          </div>
        </Card>
        <div className={styles.btnContainer}>
          <Button 
            text='Clear'
            styles={styles.clearBtn}
            onClick={() => reset({
              leagueFormat: '1/2 PPR',
              headCount: ''
            })}

          />
          <Button
            type='submit'
            text='Draft'
            styles={styles.draftBtn}
            onClick={handleSubmit(onSubmit)}

          />
        </div>
      </form>
    </div>
  )
}