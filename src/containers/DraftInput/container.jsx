// going to be a nice looking form
// composed of components that is styled at the component lvl
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useForm } from 'react-hook-form'
import { useAPIQuery } from '@Hooks'

import { Card, TextField, Select, Button } from '@Components'
import useDraftInputSytles from './styles'

function DraftInput({ setServRes }) {

  const [ postData, setPostData ] = useState(null)
  const styles = useDraftInputSytles()
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues : {
      leagueFormat: '1/2 PPR',
      headCount: ''
    }
  })

  const queryFunc = useAPIQuery()
  const { isLoading, data, refetch } = useQuery(['fetchFtbllAPI', postData], () => queryFunc(postData), {enabled: false})

  const onSubmit = (formData) => {
    setPostData({...formData})
  }

  useEffect(() => () => {
      // component dismount
      setPostData(null)
    }, [])

  useEffect(() => {
    if(postData) refetch()

  }, [postData])


  useEffect(() => {
    if (data) {
      console.log('data: ', data)
      setServRes(data)
    }

  }, [data])

  if (isLoading) return 'hello world, data is loading'


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


DraftInput.propTypes = {
  setServRes: PropTypes.func.isRequired
}

export default DraftInput