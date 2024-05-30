import Input from '@src/components/Input/Input'
import Button from '@src/components/Button/Button'
import { useAppDispatch, RootState } from '../../../../../store/index'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { message } from 'antd'
import { CreateRole, updateRole } from '../../../../../store/slices/role/roleThunk'

const RoleFormControls = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { listOfRoles, roleToUpdate } = useSelector((state: RootState) => state.role)

  const [roleName, setRoleName] = useState(roleToUpdate?.name || '')
  function isValidString(str:string) {
    if (typeof str !== 'string' || str.length < 2 || str.length > 20) {
      return false
    }
    return /^[A-Za-z]+$/.test(str)
  }
  const handleAddRole = () => {
    if (!isValidString(roleName)) {
      message.error('invalid role name')
    } else {
      roleToUpdate?.name
        ? dispatch(
            updateRole({
              id: roleToUpdate._id,
              name: roleName,
              permissions: listOfRoles,
            })
          ).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
              message.success(result.payload.message)
              navigate('/role')
            }
          })
        : dispatch(CreateRole({ name: roleName, permissions: listOfRoles })).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
              message.success(result.payload.message)
              navigate('/role')
            }
          })
    }
  }

  return (
    <div className="role-form-controls">
      <div className="role-form-controls-back-arrow">
        <h1 className="role-form-controls-title">{roleToUpdate ? 'Update Role' : 'Create Role'}</h1>
      </div>
      <div className="role-creation">
        <Input
          className="role-search-input"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setRoleName(event.target.value)}
          value={roleName}
          placeholder="Enter role Name"
        />
        <Button className="role-creation-btn" onClick={handleAddRole} size="xl">
          {roleToUpdate ? 'Update' : 'Submit'}
        </Button>
      </div>
    </div>
  )
}

export default RoleFormControls
