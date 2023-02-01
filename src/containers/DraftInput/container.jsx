import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useForm } from 'react-hook-form'

import { validatePick } from '@Utils'
import { useFetch } from '@Hooks'
import { Card, TextField, Select, Button, CircularProgress } from '@Components'

import useDraftInputSytles from './styles'

function DraftInput({ setServRes }) {

  const { register, watch, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues : {
      leagueFormat: '1/2 PPR',
      headCount: '',
      pickNumber: ''
    }
  })

  const [ getParams, setGetParams ] = useState(null)
  const styles = useDraftInputSytles()
  const fetchData = useFetch()
  const { isLoading, data, refetch } = useQuery(
    ['fetchFtbllAPI', getParams], 
    () => fetchData(getParams), 
    {enabled: false}
  )

  const watchHc = watch('headCount')


  const onSubmit = (formData) => {
    setGetParams({...formData})
  }

  // component dismount
  useEffect(() => () => setGetParams(null), [])

  useEffect(() => {
    if(getParams) refetch()

  }, [getParams])


  useEffect(() => {
    if (data) setServRes(data)
  
  }, [data])

  if (isLoading) return <CircularProgress />


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
                    value:  /^(8|10|12|14)$/i, 
                    message: 'Please enter an even # between 8 to 14.' }}}
              />
              <TextField 
                register={register}
                errors={errors}
                name='Pick #'
                id='pickNumber'
                validation={{
                  required: 'This field is required.',
                  validate: {  
                    pattern: validatePick(watchHc)
                  }
                }}
                disabled={watchHc === ''}

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
              headCount: '',
              pickNumber: ''
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


DraftInput.propTypes = {
  setServRes: PropTypes.func.isRequired
}

export default DraftInput