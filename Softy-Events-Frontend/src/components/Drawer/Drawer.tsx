import { setUserToPreviewToDefault } from '@src/store/slices/Admin/adminSlice'
import { Drawer } from 'antd'

import { useAppDispatch, RootState } from '../../store/index'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import FormatTime from '../FormatTime/FormatTime'
import { setRolePreviewToDefault } from '@src/store/slices/role/roleSlice'
import { useSelector } from 'react-redux'
import TagCom from '../TagCom/TagCom'

const DrawerComp = ({ isRole }: any) => {
  const { userToPreview } = useSelector((state: RootState) => state.admin)
  const { roleToPreview } = useSelector((state: RootState) => state.role)

  const dispatch = useAppDispatch()
  const onClose = () => {
    dispatch(setUserToPreviewToDefault())
    dispatch(setRolePreviewToDefault())
  }

  return (
    <>
      <Drawer
        title="Basic Drawer"
        placement="right"
        // onClose={userToPreview?.name?true:false}
        open={isRole ? roleToPreview : userToPreview}
        className="preview-user-container"
      >
        <div className="main-crud-form-title">
          <p>Preview {isRole ? 'Role' : 'User'}</p>
          <AiOutlineCloseCircle onClick={onClose} className="close-icon" />
        </div>
        <div className="preview-user-filed-container">
          <div className="preview-user-filed">
            <label htmlFor="">_id</label>
            <p>{isRole ? roleToPreview?._id : userToPreview?._id}</p>
          </div>
          <div className="preview-user-filed">
            <label htmlFor="">name</label>
            <p>{isRole ? roleToPreview?.name : userToPreview?.name}</p>
          </div>
          {userToPreview?.email && (
            <div className="preview-user-filed">
              <label htmlFor="">Email</label>
              <p>{userToPreview?.email}</p>
            </div>
          )}
          {isRole && (
            <div className="preview-user-filed">
              <label htmlFor="">Permissions</label>
              {
                roleToPreview?.permissions.length < 1 && <TagCom value={"no-permissions"} />
              }
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {roleToPreview?.permissions.map((el: any, i: number) => {
                  return <TagCom key={i} value={el}></TagCom>
                })}
              </div>
            </div>
          )}

          <div className="preview-user-filed">
            <label htmlFor="">Roles</label>
            <p>Role</p>
          </div>
          {userToPreview?.createdAt && (
            <div className="preview-user-filed">
              <label htmlFor="">CreatedAt</label>
              <FormatTime originalTime={userToPreview?.createdAt} />
            </div>
          )}
          {userToPreview?.updatedAt && (
            <div className="preview-user-filed">
              <label htmlFor="">updatedAt</label>
              <FormatTime originalTime={userToPreview?.updatedAt} />
            </div>
          )}
        </div>
      </Drawer>
    </>
  )
}

export default DrawerComp
