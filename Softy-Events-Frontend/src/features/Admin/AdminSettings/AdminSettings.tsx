import User from '../members/Members'
import Posts from '../Posts/Posts'
import { Tabs } from 'antd'
import SponsorRequest from '../SponsorsRequest/SponsorRequest'
import { getAllClient } from '@src/store/slices/clientSlice/clientThunk'
import { getAllPost } from '@src/store/slices/post/action'
import { useAppDispatch } from '@src/store'

function AdminSettings()
{
  const dispatch=useAppDispatch()
  const items: any = [
    {
      label: 'People Events',
      key: '1',
      children: <Posts />,
    },
    {
      label: 'Members & Sponsors',
      key: '2',
      children: <User />,
    },
    {
      label: 'Sponsors Requests',
      key: '3',
      children: <SponsorRequest />,
    },
  ]
  const handleChange=(key:string) =>
  {
    if (key === '2')
    {
      dispatch(getAllClient({ pageSize: 5, page: 1 }))
    } else if (key === '3')
    {
      console.log('Sponsors Requests')
    } else
    {
      dispatch(getAllPost({ pageSize: 5, page: 1 }))
    }
  }
  return (
    <div>
      <Tabs onChange={(key) => handleChange(key)} items={items}>
        {' '}
      </Tabs>
    </div>
  )
}

export default AdminSettings
