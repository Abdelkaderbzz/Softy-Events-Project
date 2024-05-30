import { useAppDispatch } from '@src/store'
import { login } from '@src/store/slices/auth/authThunk'
import InputField from '@src/components/InputField/InputField'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { RootState } from '@src/store/index'
import { useSelector } from 'react-redux'
import Button from '@src/components/Button/Button'
import loginimg from '@src/assets/images/auth/loginimg.svg'
import hiIcon from '@src/assets/images/auth/hi.svg'
import ForgetPassword from '../../components/ForgetPassword/ForgetPassword'

const Login = () => {
  const dispatch = useAppDispatch()
  const { status } = useSelector((state: RootState) => state.auth)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const formik = useFormik({
    initialValues: {
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
    }),
    onSubmit: (values) => {
      dispatch(login(values))
    },
  })

  return (
    <>
      <div className="auth-container">
        <div className="auth-container-left-side">
          <form className="auth-container-form" onSubmit={formik.handleSubmit}>
            <div className="auth-form-greeting">
              <img src={hiIcon} alt="" />
              <p>Softy Events</p>
              <span>Unlock the world of events: create, sponsor, discover..</span>
            </div>
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
            <ForgetPassword forWhat="login" />

            <Button
              className="auth-submit-button"
              size="xl"
              type="submit"
              disabled={status === 'loading'}
              label={status === 'loading' ? 'loading...' : 'Log in'}
            />
          </form>
        </div>
        <div className="auth-container-right-side">
          <img src={loginimg} alt="" />
        </div>
      </div>
    </>
  )
}

export default Login
