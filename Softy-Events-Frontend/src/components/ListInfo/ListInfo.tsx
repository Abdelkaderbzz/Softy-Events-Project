import Button from '@src/components/Button/Button'
import { toggleCrudForm } from '@src/store/slices/sittingSlice/sittingSlice'
import { getAllClient } from '../../store/slices/clientSlice/clientThunk'
import Search from './../../assets/icons/client/search.svg'
import Input from '@src/components/Input/Input'
import { useState, useEffect } from 'react'
import { useAppDispatch, RootState } from '../../store/index'
import { setUserToUpdateToDefault } from '@src/store/slices/Admin/adminSlice'

import { useNavigate } from 'react-router-dom'
import { getRoles } from '../../store/slices/role/roleThunk'
import { useSelector } from 'react-redux'
import useWindowSize from '../../hook/useWindowSize'
import { setRoleUpdateToDefault } from '@src/store/slices/role/roleSlice'
import { getAllPost } from '@src/store/slices/post/action'
import { Modal } from 'antd'
import { PostForm } from '@src/pages/Post'

interface ListInfoProp {
  title: string
  itemsNumber: number | undefined
  isUserListInfo: boolean
}
const ListInfo = ({ title, itemsNumber, isUserListInfo }: ListInfoProp) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  const [openPopover, setOpenPopover] = useState(false)
  const {  itemsPerPage } = useSelector((state: RootState) => state.sitting)
  const { width } = useWindowSize()
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
  }
  useEffect(() => {
    const delay = 500
    const id = setTimeout(() => {
      isUserListInfo
        ? dispatch(
            getAllClient({
              name: searchValue,
              pageSize: itemsPerPage,
            })
          )
        : dispatch(getAllPost({ name: searchValue, pageSize: itemsPerPage }))
    }, delay)
    return () => {
      clearTimeout(id)
    }
  }, [searchValue, isUserListInfo, dispatch, itemsPerPage])
  const handleAdd = () => {
    if (!isUserListInfo) {
      setOpenPopover(true)
    } else {
      dispatch(toggleCrudForm())
      dispatch(setUserToUpdateToDefault())
    }
  }

  const onClosePopover = () =>
  { 
    setOpenPopover(false)
  }
  return (
    <>
      <div className="client-list-info">
        <Modal title="create posts" open={openPopover} onCancel={onClosePopover} footer={null}>
          <PostForm onClose={onClosePopover} />
        </Modal>
        <div className="main-title">
          <h1>{title}</h1>
          <p>{itemsNumber || 0}</p>
        </div>
        <div className="admin-user-creation">
          <Input
            className="admin-user-search-input"
            icon={Search}
            value={searchValue}
            onChange={handleSearch}
            placeholder={'Search...'}
          />
          <Button className={`admin-user-creation-btn`} onClick={() => handleAdd()}>
            {width < 600 ? '+' : isUserListInfo ? 'Create Member' : 'Create Events'}
          </Button>
        </div>
      </div>
    </>
  )
}

export default ListInfo
