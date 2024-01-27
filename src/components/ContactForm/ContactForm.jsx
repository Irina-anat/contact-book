import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';


const phoneRegExp = /\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}/;

const schema = yup.object().shape({
    name: yup.string().required(),
    number: yup.string().matches(phoneRegExp, "Valid Phone Number: Optional '+' Symbol, Digits, Spaces, Hyphens, and Parentheses").required(),
});
 
const initialValues = {
    name: '',
    number: ''
};

export const ContactForm = ({ onSubmit }) => {
    const handleSubmit = (values, { resetForm }) => {
       onSubmit(values)
       // console.log(values)
        resetForm()
    };
    
    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}
            validationSchema={schema}>
            <Form>
                <label htmlFor="name">
                    Name
                    <Field type="text" name="name" />
                    <ErrorMessage name='name' />
                </label>
                <label htmlFor="number">
                    Number
                    <Field type="tel" name="number" />
                    <ErrorMessage name='number' />
                </label>
                <button type="submit">Add contact</button>
            </Form>
        </Formik>
    )
};