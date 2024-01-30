import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const phoneRegExp =
  /\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}/;

const schema = yup.object().shape({
  name: yup.string().required(),
  number: yup
    .string()
    .matches(
      phoneRegExp,
      "Valid Phone Number: Optional '+' Symbol, Digits, Spaces, Hyphens, and Parentheses"
    )
    .required(),
});

const initialValues = {
  name: '',
  number: '',
};

export const ContactForm = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);
    // console.log(values)
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <Form className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md animate__animated animate__fadeInDown">
        <div className="mb-4">
          <label htmlFor="name" className="text-sm font-medium text-gray-600">
            Name
          </label>
          <Field
            type="text"
            name="name"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 hover:border-blue-500"
          />
          <ErrorMessage name="name" className="text-sm" />
        </div>
        <div className="mb-4">
          <label htmlFor="number" className="text-sm font-medium text-gray-600 focus:outline-none">
            Number
          </label>
          <Field
            type="tel"
            name="number"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 hover:border-blue-500"
          />
          <ErrorMessage name="number" className="text-sm" />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-green-500
          focus:ring"
        >
          Add contact
        </button>
      </Form>
    </Formik>
  );
};
