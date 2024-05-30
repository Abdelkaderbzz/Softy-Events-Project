import { PostType } from '@src/types/post.type'
import * as Yup from 'yup'

export const CreatePostSchema = Yup.object().shape({
  title: Yup.string().required('title is required'),
  content: Yup.string().min(10).required('content must be above 10 characters'),
  postType: Yup.string().oneOf(Object.values(PostType)).required(),
  date: Yup.date().required(),
})
