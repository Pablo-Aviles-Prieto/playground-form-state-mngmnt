import { FC } from 'react';
import { object, string, number, date, InferType } from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { IBasicForm, IFormikProps } from '../interfaces';

const formSchema = object().shape({
  name: string().required('Name is required'),
  email: string().email('Invalid email address').required('Email is required1'),
  age: number().positive().integer().required('Age is required'),
  createdOn: date().default(() => new Date()),
});

type Form = InferType<typeof formSchema>;

export const BasicForm: FC = () => {
  const initialValues: IBasicForm = {
    name: '',
    email: '',
    age: 0,
  };

  const handleSubmit = (values: IBasicForm) => {
    setTimeout(() => {
      console.log(values);
    }, 300);
  };

  return (
    <div>
      <h1>Basic formik</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={formSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <div style={{ height: '60px' }}>
              <label htmlFor='name'>Name:</label>
              <Field name='name' type='text' />
              <p style={{ color: 'red' }}>
                <ErrorMessage name='name' />
              </p>
            </div>

            <div style={{ height: '60px' }}>
              <label htmlFor='email'>Email:</label>
              <Field name='email' type='email' />
              <p style={{ color: 'red' }}>
                <ErrorMessage name='email' />
              </p>
            </div>

            <div style={{ height: '60px' }}>
              <label htmlFor='age'>Age:</label>
              <Field name='age' type='number' />
              <p style={{ color: 'red' }}>
                <ErrorMessage name='age' />
              </p>
            </div>

            <button type='submit' disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
