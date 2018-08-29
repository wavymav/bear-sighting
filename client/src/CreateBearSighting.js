import React from 'react'
import { compose } from 'recompose'
import axios from 'axios'
import { withRouter } from 'react-router'
import { withFormik } from 'formik'
import * as yup from 'yup'

const CreateBearSighting = ({
  values,
  touched,
  errors,
  dirty,
  isSubmitting,
  handleChange,
  setFieldValue,
  handleBlur,
  handleSubmit,
  handleReset,
}) => (
  <div>
    <form onSubmit={handleSubmit}>
      <h1>Create Bear Sighting</h1>
      <div>
        <label>Bear Type</label>
        <input
          name='bear_type'
          type='text' 
          value={values.bear_type} 
          onChange={handleChange}
          onBlur={handleBlur} />
        {errors.bear_type && touched.bear_type && <div>{errors.bear_type}</div>}
      </div>
      <div>
        <label>Notes</label>
        <input
          name='notes'
          type='text' 
          value={values.notes} 
          onChange={handleChange}
          onBlur={handleBlur} />
        {errors.notes && touched.notes && <div>{errors.notes}</div>}
      </div>
      <div>
        <label>Zip Code</label>
        <input
          name='zip_code'
          type='text' 
          value={values.zip_code} 
          onChange={handleChange}
          onBlur={handleBlur} />
        {errors.zip_code && touched.zip_code && <div>{errors.zip_code}</div>}
      </div>
      <div>
        <label>Number of Bears</label>
        <input
          name='num_bears'
          type='nubmer' 
          value={values.num_bears} 
          onChange={handleChange}
          onBlur={handleBlur} />
        {errors.num_bears && touched.num_bears && <div>{errors.num_bears}</div>}
      </div>
      <button type='submit' disabled={isSubmitting}>
        {isSubmitting ? 'submitting' : 'submit'}
      </button>
    </form>
  </div>
)

const formikEnhancer = withFormik({
  validationSchema: yup.object().shape({
    bear_type: yup
      .string()
      .required('bear_type is required'),
    notes: yup
      .string()
      .required('notes is required'),
    zip_code: yup
      .string()
      .required('zip_code is required'),
    num_bears: yup
      .number()
      .min(1)
  }),
  validate: ({ zip_code }, props) => {
    const errors = {}
    const zipCodeRegex = /^\d{5}$/

    if (!zipCodeRegex.test(zip_code)) {
      errors.zip_code = 'must enter a valid zip code'
    }

    return errors
  },
  mapPropsToValues: (props) => ({ 
    bear_type: '',
    notes: '',
    zip_code: '',
    num_bears: ''
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    axios.post('/sighting', values)
      .then(() => {
        props.history.push('/')
        setSubmitting(false)
      })
      .catch((err) => console.log(err))
  },
})

export default compose(
  withRouter,
  formikEnhancer
)(CreateBearSighting)