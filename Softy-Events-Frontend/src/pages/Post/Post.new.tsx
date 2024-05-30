import FormProvider, { RHFDatePicker, RHFTextField, RHFUpload } from '@src/components/hook-form/'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { PostType } from '@src/types/post.type'
import { useForm } from 'react-hook-form'
import RHFSelect from '@src/components/hook-form/RHFSelect'
import { dispatch } from '@src/store'
import { createPost } from '@src/store/slices/post/action'
import { message, UploadFile } from 'antd'
import { CreatePostSchema } from './post.create.schema'
import { useState } from 'react'

const data = [
  {
    label: 'News',

    value: PostType.NEWS,
  },
  {
    label: 'Event',
    value: PostType.EVENT,
  },
  {
    label: 'Article',
    value: PostType.ARTICLE,
  },
]

const PostForm = ({ onClose }: { onClose: VoidFunction }) => {
  const methods = useForm({
    defaultValues: {
      title: '',
      content: '',
      postType: PostType.EVENT,
      date: '',
    },
    resolver: yupResolver(CreatePostSchema),
  })
  const {
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = methods
  const [file, setFile] = useState<UploadFile<any>>()
  const onUpload = (file: UploadFile<any>) => setFile(file)
  const onSubmit = (data: any) => {
    dispatch(createPost({ ...data, postPicUrl: file?.originFileObj }))
      .unwrap()
      .then((res) => {
        message.success(res.message)
        reset()
        onClose()
      })
      .catch((err) => {
        console.error(err)
        message.error(err.message)
      })
  }
  return (
    <FormProvider
      methods={methods}
      style={{
        gap: '1rem',
        display: 'flex',
        flexDirection: 'column',
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <RHFTextField name="title" label="title" />
      <RHFTextField name="content" label="content"  />
      <RHFSelect name="postType" label="post type" data={data}  />
      <RHFUpload name="file" label="picture of event" onUpload={onUpload} />
      <RHFDatePicker name="date" label="pick a date for event" />
      <LoadingButton type="submit" loading={isSubmitting}>
        Create Post
      </LoadingButton>
    </FormProvider>
  )
}

export default PostForm
