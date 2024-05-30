import TableData from '../../../components/TableData/TableData'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../../store/index'
import ListInfo from '../../../components/ListInfo/ListInfo'
import CrudForm from '../../../components/CrudForm/CrudForm'
import DrawerComp from '../../../components/Drawer/Drawer'
import { Pagination} from 'antd'
import { getAllClient } from '@src/store/slices/clientSlice/clientThunk'
import { getUserTypes } from '@src/store/slices/role/roleThunk'
import { useEffect } from 'react'


const User = () => {
  const dispatch = useAppDispatch()
  const { length, client, status, currentPage } = useSelector((state: RootState) => state.client)
  useEffect(() => {
    dispatch(getUserTypes())
  }, [dispatch])
  return (
    <div className="client-container">
      <div className="client-data">
        <ListInfo title={'Members List'} itemsNumber={length || 0} isUserListInfo={true} />
        <TableData
          isUserTable={true}
          data={client}
          notIncluded={['_id', 'avatar', 'updatedAt', 'role', 'verified']}
          loading={status}
        />
      </div>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <Pagination
          defaultPageSize={5}
          className="pagination"
          onChange={(page, pageSize) => dispatch(getAllClient({ pageSize, page }))}
          current={currentPage}
          total={length}
          showSizeChanger={false}
        />
      </div>
      <DrawerComp isRole={false} />
      <CrudForm />
    </div>
  )
}

export default User
