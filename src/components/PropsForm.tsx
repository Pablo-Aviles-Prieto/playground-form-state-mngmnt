import { FC } from 'react';
import { object, string, number, date, InferType } from 'yup';
import { Formik, Form, Field, FormikProps } from 'formik';
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

  const handleSubmit = (values: IPropsForm) => {
    setTimeout(() => {
      console.log(values);
    }, 300);
  };

  const formSchema = object().shape({
    // color: string().required('Color is required'),
    email: string()
      .email('Invalid email address')
      .required('Email is required1'),
    firstName: string().required('first name is required'),
    lastName: string().required('last name is required'),
  });

  return (
    <div>
      <h1>Formik props</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={formSchema}
      >
        {(props: FormikProps<any>) => (
          <Form>
            <Field type='email' name='email' placeholder='Email' />
            <Field as='select' name='color'>
              <option value='red'>Red</option>
              <option value='green'>Green</option>
              <option value='blue'>Blue</option>
            </Field>

            <Field name='lastName'>
              {({
                field, // { name, value, onChange, onBlur }
                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
              }: IFormikProps) => (
                <div>
                  <>
                    <input type='text' placeholder='Last name' {...field} />
                    {meta.touched && meta.error && (
                      <div className='error'>{meta.error}</div>
                    )}
                    {console.log('props', props)}
                    {console.log('field', field)}
                    {console.log('touched', touched)}
                    {console.log('errors', errors)}
                    {console.log('meta', meta)}
                  </>
                </div>
              )}
            </Field>
            <Field name='lastName' placeholder='Doe' component={MyInput} />
            <button type='submit'>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
