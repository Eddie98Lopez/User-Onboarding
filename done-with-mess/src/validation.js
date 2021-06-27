import * as Yup from "yup"; 

const schema = Yup.object().shape(
    {
        name: Yup
            .string()
            .required('Must enter Name'),
        email: Yup
            .string()
            .email('Must be valid email')
            .required('Must enter email'),
        password: Yup
            .string()
            .required('Must enter password')
            .min(8,"Password must be minimum of 8 characters long."),
        terms: Yup
            .boolean()
            .oneOf([true], 'Must accept Terms and Conditions')
            .required('Must mark checkbox to accept Terms and Conditions')
    }
)

export default schema