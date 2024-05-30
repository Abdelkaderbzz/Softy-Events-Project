import { useAppDispatch } from '@src/store'
import { login, register } from '@src/store/slices/auth/authThunk'
import InputField from '@src/components/InputField/InputField'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { RootState } from '@src/store/index'
import { useSelector } from 'react-redux'
import Button from '@src/components/Button/Button'
import registerimg from '@src/assets/images/auth/registerimg.svg'
import ForgetPassword from '../../components/ForgetPassword/ForgetPassword'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { status } = useSelector((state: RootState) => state.auth)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email format.')
        .matches(emailRegex, 'Invalid email format.')
        .test(
          'no-extra-chars',
          'Invalid email format. No extra characters allowed.',
          (value: string | undefined) => {
            if (!value) {
              return true
            }
            return emailRegex.test(value)
          }
        )
        .required('Email cannot be empty.'),
      password: Yup.string()
        .required('Password cannot be empty')
        .min(6, 'Password must have at least 6 characters.')
        .max(20, 'Password cannot have more than 20 characters'),
      firstName: Yup.string().required('Name cannot be empty.'),
      lastName: Yup.string().required('Last Name cannot be empty.'),
      phoneNumber: Yup.string()
        .min(8, 'phone number length must be 8')
        .required('Phone Number cannot be empty.'),
    }),
    onSubmit: (values) =>
    {
      dispatch(register(values))
    },
  })

  return (
    <>
      <div className="auth-container">
        <div className="auth-container-left-side">
          <form className="auth-container-form" onSubmit={formik.handleSubmit}>
            <div className="register-form-greeting">
              <p>Softy events</p>
              <span>
                {' '}
                Join us now to connect with a vibrant community of event organizers and enthusiasts
              </span>
            </div>
            <InputField
              formik={formik}
              field={{
                class: 'auth-input-container',
                name: 'firstName',
                type: 'text',
                placeholder: 'Enter your name',
                label: 'Name',
                redStar: '*',
              }}
            />
            <InputField
              formik={formik}
              field={{
                class: 'auth-input-container',
                name: 'lastName',
                type: 'text',
                placeholder: 'Enter your lastName',
                label: 'Last Name',
                redStar: '*',
              }}
            />
            <InputField
              formik={formik}
              field={{
                class: 'auth-input-container',
                name: 'phoneNumber',
                type: 'text',
                placeholder: 'Enter your phoneNumber',
                label: 'Phone Number',
                redStar: '*',
              }}
            />
            <InputField
              formik={formik}
              field={{
                class: 'auth-input-container',
                name: 'email',
                type: 'text',
                placeholder: 'Enter your email',
                label: 'Email',
                redStar: '*',
              }}
            />
            <InputField
              formik={formik}
              field={{
                class: 'auth-input-container',
                name: 'password',
                type: 'password',
                placeholder: 'Enter your password',
                label: 'Password',
                redStar: '*',
              }}
            />
            <ForgetPassword forWhat="register" />
            <Button
              className="auth-submit-button"
              size="xl"
              type="submit"
              disabled={status === 'loading'}
              label={status === 'loading' ? 'loading...' : 'Register'}
            />
          </form>
        </div>
        <div className="auth-container-right-side">
          <img src={registerimg} alt="" />
        </div>
      </div>
    </>
  )
}

export default Register
