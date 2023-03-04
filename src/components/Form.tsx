import { object, string, number, date, InferType } from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

interface MyFormValues {
  name: string;
  email: string;
  age: number;
}

const formSchema = object().shape({
  name: string().required('Name is required'),
  email: string().email('Invalid email address').required('Email is required1'),
  age: number().positive().integer().required('Age is required'),
  createdOn: date().default(() => new Date()),
});

type Form = InferType<typeof formSchema>;

export const FormTest = () => {
  const initialValues: MyFormValues = { name: '', email: '', age: 0 };

  const handleSubmit = (values: MyFormValues) => {
    setTimeout(() => {
      console.log(values);
    }, 600);
  };

  return (
    <div>
      <h1>Formik + Yup</h1>
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
