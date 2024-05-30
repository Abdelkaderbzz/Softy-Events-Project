import { PublicURL } from '@src/config'
import { dispatch, useSelector } from '@src/store'
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons'
import { getAllPost } from '@src/store/slices/post/action'
import { List, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { fDate } from '@src/utils/date'
import useTable from '@src/hook/useTable'
import { Virtuoso } from 'react-virtuoso'

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

const PostInfiniteScroll = () => {
  // const {user} = useSelc
  console.log("user")
  const { page, setPage } = useTable()
  useEffect(() => {
    dispatch(getAllPost({ page }))
  }, [dispatch, page])
  const { posts } = useSelector((store) => store.post)
  const [data, setData] = useState(posts?.docs || [])
  useEffect(() => {
    setData((pre) => [...pre, ...posts.docs])
  }, [posts])
  const handleNearEnd = () => {
    if (posts.meta.totalDocs > data.length) {
      setPage((pre) => pre + 1)
    }
  }
  console.log({ posts })
  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={data}
      style={{
        minHeight: '100%',

        overflow: 'hidden',
      }}
    >
      <Virtuoso
        className="reels-virtuoso"
        style={{ height: '40rem' }}
        totalCount={data.length}
        itemContent={(item) => (
          <List.Item
            key={data[item]._id}
            extra={<img width={272} alt="logo" src={PublicURL + data[item].postPicUrl} />}
            actions={[
              <IconText
                icon={StarOutlined}
                text={data[item].postType}
                key="list-vertical-star-o"
              />,
              <IconText
                icon={LikeOutlined}
                text={fDate(data[item].date, 'dd-MM-yyyy')}
                key="list-vertical-like-o"
              />,
              
              <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            ]}
            style={{
              display: 'flex',
              '.ant-list-item-main': {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              },
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <List.Item.Meta title={data[item].title} />
              {data[item].content}
            </div>
          </List.Item>
        )}
        atBottomStateChange={handleNearEnd}
      />
    </List>
  )
}

export default PostInfiniteScroll
