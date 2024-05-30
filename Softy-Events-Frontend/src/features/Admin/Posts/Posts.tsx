import TableData from '../../../components/TableData/TableData'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../../store/index'
import ListInfo from '../../../components/ListInfo/ListInfo'
import CrudForm from '../../../components/CrudForm/CrudForm'
import DrawerComp from '../../../components/Drawer/Drawer'
import { Pagination } from 'antd'
import { getAllPost } from '@src/store/slices/post/action'

const Posts = () => {
  const dispatch = useAppDispatch()
  const {posts, status} = useSelector((state: RootState) => state.post)
  return (
    <div className="client-container">
      <div className="client-data">
        <ListInfo
          title={'Events List'}
          itemsNumber={posts?.meta?.totalDocs || 0}
          isUserListInfo={false}
        />
        <TableData
          isUserTable={false}
          data={posts.docs}
          notIncluded={['_id', 'avatar', 'updatedAt', 'role', 'verified']}
          loading={status == 'loading' ? true : false}
        />
      </div>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <Pagination
          defaultPageSize={5}
          className="pagination"
          onChange={(page, pageSize) => dispatch(getAllPost({page,pageSize}))}
          current={posts.meta.page}
          total={posts?.meta?.totalDocs}
          showSizeChanger={false}
        />
      </div>
      <DrawerComp isRole={false} />
      <CrudForm />
    </div>
  )
}

export default Posts
