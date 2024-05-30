import { Popover, Space, Button, message } from 'antd'
import { BsThreeDots } from 'react-icons/bs'
import { AiOutlineDelete } from 'react-icons/ai'
import { BiEditAlt } from 'react-icons/bi'
import { useAppDispatch, RootState } from '../../store/index'

import {
  getRoleById,
} from '../../store/slices/role/roleThunk'
import Swal from 'sweetalert2'
import { toggleCrudForm } from '@src/store/slices/sittingSlice/sittingSlice'
import { useState } from 'react'

import { deleteMember, getAllClient } from '../../store/slices/clientSlice/clientThunk'
import { useSelector } from 'react-redux'
import { deleteEvent, getAllPost } from '@src/store/slices/post/action'
import { getUserToUpdate } from '@src/store/slices/clientSlice/clientSlice'
const ActionControl: React.FC<{
  id: string
  isUserTable: boolean
}> = ({ id, isUserTable }) => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const { currentPage, itemsPerPage } = useSelector((state: RootState) => state.sitting)
  const content = (
    <div className="action-popup">
      <Button
        onClick={() => {
          handleUpdate(id)
          setOpen(false)
        }}
        className="action-popup-button"
      >
        <BiEditAlt />
        <span>Edit</span>
      </Button>
      <Button
        onClick={() => {
          setOpen(false)
          handleRemove(id)
        }}
        className="action-popup-button"
      >
        <AiOutlineDelete />
        <span>Delete</span>
      </Button>
    </div>
  )
  const handleRemove = (index: string) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0078ff',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (!isUserTable) {
          dispatch(deleteEvent(index)).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
              message.success(result.payload.message)
              dispatch(getAllPost({ page: currentPage, pageSize: itemsPerPage }))
            }
          })
        } else {
          dispatch(deleteMember(index)).then(async (result) => {
            if (result.meta.requestStatus === 'fulfilled') {
              message.success(result.payload.message)
              dispatch(
                getAllClient({
                  page: currentPage,
                  pageSize: itemsPerPage,
                  orderBy: 'createdAt',
                  order: 'desc',
                })
              )
            }
          })
        }
      }
    })
  }

  const handleUpdate = async (id: string) => {
    if (isUserTable) {
      await dispatch(getUserToUpdate({id}))
      dispatch(toggleCrudForm())
    } else {
      await dispatch(getRoleById(id))
      dispatch(toggleCrudForm())
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }

  return (
    <Space wrap>
      <Popover
        onOpenChange={handleOpenChange}
        open={open}
        placement="bottom"
        content={content}
        trigger="click"
      >
        <Button>
          <BsThreeDots className="dots-icon" />
        </Button>
      </Popover>
    </Space>
  )
}

export default ActionControl
