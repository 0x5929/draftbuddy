// going to be a nice looking form
// composed of components that is styled at the component lvl
import { useForm } from "react-hook-form"
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'

import Card from '@Components'

export default function DraftInput() {

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues : {
      leagueFormat: '1/2 PPR',
      headCount: ''
    }
  });
  const onSubmit = data => console.log(data)
  return (
    // form container 
    <div className="flex flex-col justify-center items-center">
      {/* form */}
      <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
        {/* card container */}
        <Card>
          {/* card grid container */}
          <div className="grid md:grid grid-cols-1 md:grid-cols-1 gap-6 md:gap-6">
            {/* card grid column */}
            <div className="mt-5 space-y-6 col-auto md:mt-0">
            {/*  select container  */}
            <div>
              {/* select label */}
              <label htmlFor="leagueFormat" className="block text-sm font-medium text-gray-700">
                League Format
              </label>

              {/* select input */}
              <select
                id="leagueFormat"
                name="leagueFormat"
                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                // defaultValue="1/2 PPR"

                {...register('leagueFormat', { required: true })}
              >
                <option>Points Per Reception (PPR)</option>
                <option>1/2 PPR</option>
                <option>Standard non PPR</option>
              </select>
            </div>

    {/* NOTE THE FOLLOWING COULD ALSO BE A SELECT INPUT, BUT THIS WAY IT SHOWS NICE ERR MSGS FOR PPL WHO TRIES TO MESS WITH THE APP. */}
            {/* number input container */}
            <div>
              <label htmlFor="headCount" className="block text-sm font-medium text-gray-700">
                # of Participants
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  {...register('headCount', { required: true , pattern: /^(8|10|12|14|16)$/i })}

                  type="text"
                  name="headCount"
                  id="headCount"
                  className={`block w-full rounded-md ${errors.headCount ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'} pr-10 focus:outline-none sm:text-sm`}
                  aria-invalid={errors.headCount ? 'true' : 'false'}
                />
                {
                  errors.headCount ?
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                    </div>
                  :
                    null
                }
              </div>
              {
                errors.headCount?.type === 'required' ? 
                  <p className="mt-2 text-sm text-red-600">
                    This field is required.
                  </p>
                :
                  null
              }              
              {
                errors.headCount?.type === 'pattern' ? 
                  <p className="mt-2 text-sm text-red-600">
                    Please enter an even # between 8 to 16.
                  </p>
                :
                  null
              }
            </div>
            </div>
          </div>
        </Card>



        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => reset({
              leagueFormat: '1/2 PPR',
              headCount: ''
            })}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}