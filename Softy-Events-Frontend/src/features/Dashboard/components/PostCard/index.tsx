import { PublicURL } from '@src/config'
import { IPost } from '@src/types/post.type'
import { Card } from 'antd'

const PostCard = ({ title, content, postPicUrl }: IPost) => {
  return (
    <Card title={title} hoverable cover={<img title={title} src={PublicURL + postPicUrl}  />}>
      {content}
    </Card>
  )
}

export default PostCard
