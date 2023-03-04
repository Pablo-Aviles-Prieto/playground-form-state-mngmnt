import { FC } from 'react';
import { object, string, number, date, InferType } from 'yup';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { IFormikProps, IPropsForm } from '../interfaces';

const MyInput = ({ field, form, ...props }: IFormikProps) => {
  return <input {...field} {...props} />;
};

export const PropsForm: FC = () => {
  const initialValues = {
    email: '',
    color: 'red',
    firstName: '',
    lastName: '',
  };

  const handleSubmit = (
    values: IPropsForm,
    { resetForm }: FormikHelpers<IPropsForm>
  ) => {
    setTimeout(() => {
      console.log(values);
    }, 300);
    resetForm();
  };

  const formSchema = object().shape({
    email: string()
      .email('Invalid email address')
      .required('Email is required'),
    firstName: string().required('The first name is required'),
    lastName: string().required('The last name is required'),
  });

  return (
    <div>
      <h1>Formik props</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={formSchema}
      >
        {({ isSubmitting, isValid, touched, errors }) => (
          <Form>
            <Field type='email' name='email' placeholder='Email' />
            {touched.email && errors.email && (
              <p style={{ color: 'red' }}>{errors.email}</p>
            )}
            <div style={{ margin: '20px 0' }}>
              <Field as='select' name='color'>
                <option value='red'>Red</option>
                <option value='green'>Green</option>
                <option value='blue'>Blue</option>
              </Field>
            </div>

            <Field name='firstName'>
              {({
                field, // { name, value, onChange, onBlur }
                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
              }: IFormikProps) => (
                <div style={{ margin: '20px 0' }}>
                  <>
                    <input type='text' placeholder='First name' {...field} />
                    {meta.touched && meta.error && (
                      <p style={{ color: 'red' }}>{meta.error}</p>
                    )}
                  </>
                </div>
              )}
            </Field>
            <Field
              name='lastName'
              placeholder='Last name'
              component={MyInput}
            />
            {touched.lastName && errors.lastName && (
              <p style={{ color: 'red' }}>{errors.lastName}</p>
            )}
            <button
              style={{ display: 'block', margin: '10px 0' }}
              type='submit'
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
