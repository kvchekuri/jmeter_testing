import * as Yup from 'yup';

 //User authentication
 export const SignupSchema = Yup.object({
    name: Yup.string()
        .min(1, 'Is your name really just 1 letter?')
        .trim()
        .nullable()
        .required('Your name is Required!'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required!'),
    phone: Yup.string()
        .matches(/^\d{10,15}$/, "Phone must be 10-15 digits")
        .required("Phone number is required!"),
    password: Yup.string()
        .min(8, "Password must be not less than 8")
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Check it, Password did not match.")
        .required('Confirm you password is required!')
 })

 export const LoginSchema = Yup.object({
         email: Yup.string()
            .email('Invalid email')
            .required('Email is required!'),
         password: Yup.string()
            .required('Password is required'),
       });