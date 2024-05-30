import { Table, Tag } from 'antd'
import UserImg from '../UserImg/UserImg'
import FormatTime from '../FormatTime/FormatTime'
import ActionControl from '../ActionControl/ActionControl'
import RolesComp from '../RolesComp/RolesComp'
import { generateColumns } from '@src/utils/createColumns'
import TagCom from '../TagCom/TagCom'
import ToolTipText from '../ToolTipText/ToolTipText'
import postSlice from '../../store/slices/post/index';
import { PostType } from '../../types/post.type';
import Tooltip from './components/Tooltip';

interface TableDataProp {
  data: readonly object[] | undefined
  loading: boolean
  isUserTable: boolean
  notIncluded: string[]
}
const TableData = ({ data, notIncluded, loading, isUserTable }: TableDataProp) => {
  const columns = generateColumns(data, notIncluded, isUserTable)
  const dataSource: any[] = []
  const generateRowData = (obj: any) => {
    const rowData: any = {
      _id: <ToolTipText value={obj._id} className="table-data-user-field"></ToolTipText>,
      permissions: <RolesComp roles={obj.permissions} />,
      name: isUserTable ? (
        <UserImg avatar={obj?.avatar} name={obj?.name} />
      ) : (
        <TagCom value={obj?.name} />
      ),

      title: <p className="table-data-user-field">{obj?.title}</p>,
      createdBy: (
        <p className="table-data-user-field">
          {obj?.createdBy?.firstName} {obj?.createdBy?.lastName}
        </p>
      ),
      postType: (
        <Tag
          color={
            obj?.PostType === 'NEWS' ? '#f50' : obj?.postType === 'EVENT' ? '#2db7f5' : '#87d068'
          }
        >
          {obj?.postType}
        </Tag>
      ),
      date: <FormatTime originalTime={obj?.date} />,
      status: <Tag>{obj?.status}</Tag>,
      content: <Tooltip target={obj?.content} />,
      firstName: <p className="table-data-user-field">{obj?.firstName}</p>,
      email: <p className="table-data-user-field">{obj?.email}</p>,
      userType: <p className="table-data-user-field">{obj?.userType?.name || '-'}</p>,
      lastName: <p className="table-data-user-field">{obj?.lastName}</p>,
      phoneNumber: <p className="table-data-user-field">{obj.phoneNumber || '-'}</p>,
      createdAt: <FormatTime originalTime={obj.createdAt} />,
      Action: <ActionControl id={obj._id} isUserTable={isUserTable} />,
    }
    return rowData
  }
  data?.forEach((el: any) => {
    const rowData = generateRowData(el)
    dataSource.push(rowData)
  })
  return (
    <>
      <div className="table-data-container">
        <Table
          loading={loading ? true : false}
          columns={columns}
          dataSource={dataSource?.map((item, index) => ({
            ...item,
            key: index,
          }))}
          size="middle"
          pagination={false}
        ></Table>
      </div>
    </>
  )
}

export default TableData
