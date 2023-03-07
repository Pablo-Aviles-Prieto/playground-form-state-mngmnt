import { FC } from 'react';
import { object, string, number, date, InferType } from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { IBasicForm, IFormikProps } from '../interfaces';

const formSchema = object().shape({
  name: string().required('Name is required'),
  email: string().email('Invalid email address').required('Email is required!!'),
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
      <h1 className='my-4 text-4xl font-bold text-center underline'>
        Basic formik
      </h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={formSchema}
      >
        {({ isSubmitting }) => (
          <Form className='px-20'>
            <div className='h-24'>
              <label htmlFor='name' className='text-violet-800'>
                Name:
              </label>
              <Field
                name='name'
                type='text'
                className='block w-auto px-4 py-3 text-sm border rounded-lg outline-none border-violet-600'
              />
              <p className='text-red-600'>
                <ErrorMessage name='name' />
              </p>
            </div>

            <div className='h-24'>
              <label htmlFor='email' className='text-violet-800'>
                Email:
              </label>
              <Field
                className='block w-auto px-4 py-3 text-sm border rounded-lg outline-none border-violet-600'
                name='email'
                type='email'
              />
              <p className='text-red-600'>
                <ErrorMessage name='email' />
              </p>
            </div>

            <div className='h-24'>
              <label htmlFor='age' className='text-violet-800'>
                Age:
              </label>
              <Field
                className='block w-auto px-4 py-3 text-sm border rounded-lg outline-none border-violet-600'
                name='age'
                type='number'
              />
              <p className='text-red-600'>
                <ErrorMessage name='age' />
              </p>
            </div>

            <button
              className='px-6 py-3 transition-all duration-500 border rounded-md shadow-lg text-violet-900 bg-violet-300 border-violet-900 hover:bg-violet-600 hover:scale-105 hover:text-violet-200 hover:shadow-2xl'
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
