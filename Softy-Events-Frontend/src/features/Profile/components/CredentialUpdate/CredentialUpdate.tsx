import { useState } from 'react'
import { useSelector } from 'react-redux'
import { message } from 'antd'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputField from '@components/InputField/InputField'
import { RootState, useAppDispatch } from '@store/index'
// import { updateCredential, updateAvatar } from '@store/slices/profileSlice/profileThunk'
import Button from '@src/components/Button/Button'
import UploadIcon from '@src/components/UploadIcon/UploadIcon'

const CredentialUpdate = () => {
  const dispatch = useAppDispatch()
  const { user } = useSelector((state: RootState) => state.auth)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>('')
  const formik = useFormik({
    initialValues: {
      email: `${user?.email}`,
      name: `${user?.name}`,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .matches(
          /^([a-zA-Z0-9._%+-]+)@((?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})$/,
          'Invalid email address',
        )
        .test(
          'no-special-chars',
          'Email contains disallowed characters',
          (value: string | undefined) => !value || /^[^<>()\\/[\]{}\s]+@[^\s]+$/.test(value),
        )
        .required('Email is required'),
      name: Yup.string()
        .required('name is required')
        .min(3, 'name length must be greater or equal to 3'),
    }),
    onSubmit: (values) => {
      if (selectedFile) {
        // dispatch(updateAvatar(selectedFile))
      }
      if (values.name === user?.name && values.email === user?.email && !selectedFile) {
        message.error('No changes to update')
      } else {
        // dispatch(updateCredential(values))
      }
    },
  })
  return (
    <form className="credentials-update" onSubmit={formik.handleSubmit}>
      <div className="credentials-update-fields">
        <div className="upload-image-container">
          <div className="image-container">
            {imageUrl ? (
              <img className="default-avatar" src={imageUrl} alt="Uploaded" />
            ) : (
              <img
                src={`${import.meta.env.VITE_APP_BASE_URL}/users/${user?.avatar}`}
                alt="User"
                className="default-avatar"
                crossOrigin="anonymous"
              />
            )}
          </div>
          
          <UploadIcon setSelectedFile={setSelectedFile} setImageUrl={setImageUrl} />
        </div>

        <InputField
          formik={formik}
          field={{
            name: 'name',
            type: 'text',
            placeholder: 'update your name',
            label: 'Name',
            redStar: '*',
          }}
        />
        <InputField
          formik={formik}
          field={{
            name: 'email',
            type: 'email',
            placeholder: 'update your email',
            label: 'Email',
            redStar: '*',
          }}
        />
      </div>
      <Button
        className="credential-update-btn"
        type={'submit'}
        label={'Update Your Credential'}
      ></Button>
    </form>
  )
}

export default CredentialUpdate
