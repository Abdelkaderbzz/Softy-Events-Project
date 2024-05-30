import { RootState, useAppDispatch } from '../../store/index'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { toggleCrudForm } from '@src/store/slices/sittingSlice/sittingSlice'
import Button from '@src/components/Button/Button'
import { Drawer } from 'antd'
import InputField from '../InputField/InputField'
import SelectComp from '../SelectComp/SelectComp'
import { addUser, UpadateAdmin } from '../../store/slices/Admin/adminThunk'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { userUpdateSchema, userCreateSchema } from '../../utils/schema'
import { getAllClient } from '@src/store/slices/clientSlice/clientThunk'
import { message } from 'antd'
import { setUserToUpdateToDefault } from '@src/store/slices/Admin/adminSlice'
import { useEffect } from 'react'

const CrudForm = () => {
  const { isCrudFormOpened } = useSelector((state: RootState) => state.sitting)
  const { clientToUpdate } = useSelector((state: RootState) => state.client)
  console.log(clientToUpdate)
  const initialValues = {
    id: clientToUpdate ? clientToUpdate._id : '',
    name: clientToUpdate ? clientToUpdate.name : '',
    email: clientToUpdate ? clientToUpdate.email : '',
    ...(clientToUpdate ? {} : { password: '' }),
    userType: clientToUpdate?.userType?._id || '',
  }
  useEffect(() => {
    formik.setValues(initialValues)
    return () => {
      formik.resetForm()
    }
  }, [clientToUpdate])
  const dispatch = useAppDispatch()
  const { currentPage, itemsPerPage } = useSelector((state: RootState) => state.sitting)
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: clientToUpdate ? userUpdateSchema : userCreateSchema,
    onSubmit: (values) => {
      if (Object.keys(values).length === 0) {
        message.error('no changes were made')
        dispatch(toggleCrudForm())
      } else {
        if (clientToUpdate) {
          dispatch(UpadateAdmin({ values, clientToUpdate })).then((result) => {
            if (result.payload.statusCode === 200) {
              dispatch(
                getAllClient({
                  page: currentPage,
                  pageSize: itemsPerPage,
                  orderBy: 'createdAt',
                  order: 'desc',
                })
              )
              dispatch(toggleCrudForm())
            }
          })
        } else {
          dispatch(addUser(values)).then((result) =>
          {
            if (result.payload.statusCode === 200) {
              dispatch(
                getAllClient({
                  page: currentPage,
                  pageSize: itemsPerPage,
                  orderBy: 'createdAt',
                  order: 'desc',
                })
              )
              dispatch(toggleCrudForm())
            }
          })
        }
      }
    },
  })
  return (
    <Drawer
      title="Basic Drawer"
      onClose={() => {
        dispatch(() => setUserToUpdateToDefault())
        dispatch(toggleCrudForm())
      }}
      placement="right"
      open={isCrudFormOpened}
    >
      <div className={`crud-form-popup `}>
        <div className="main-crud-form-title">
          <p>{clientToUpdate ? 'Update User' : 'Create User'}</p>
          <AiOutlineCloseCircle className="close-icon" onClick={() => dispatch(toggleCrudForm())} />
        </div>
        <form onSubmit={formik.handleSubmit}>
          <InputField
            formik={formik}
            field={{
              name: 'name',
              type: 'text',
              placeholder: 'Enter your name',
              label: 'Name',
              class: 'crud-form-field',
              redStar: '*',
            }}
          />
          <InputField
            formik={formik}
            field={{
              name: 'email',
              type: 'email',
              placeholder: 'Enter your email',
              label: 'Email',
              redStar: '*',
              class: 'crud-form-field',
            }}
          />
          {!clientToUpdate ? (
            <InputField
              formik={formik}
              field={{
                name: 'password',
                type: 'password',
                placeholder: 'Enter your password',
                label: 'Password',
                redStar: '*',
                class: 'crud-form-field',
              }}
            />
          ) : null}
          <div>
            <SelectComp
              touched={formik.touched.userType}
              error={formik.errors.userType}
              value={formik.values.userTpye}
              setValue={(value: any) => formik.setFieldValue('userType', value)}
            />
          </div>
          <Button
            type="submit"
            style={{
              width: '100%',
              fontSize: '17px',
              marginTop: '30px',
              backgroundColor: '#0078ff',
            }}
            size="xl"
          >
            {clientToUpdate ? 'Update User' : 'Submit'}
          </Button>
        </form>
      </div>
    </Drawer>
  )
}

export default CrudForm
