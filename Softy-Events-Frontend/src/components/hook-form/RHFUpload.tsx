import { Button, Upload, UploadFile } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { Controller, useFormContext } from 'react-hook-form'

type RHFSelectProp = {
  name: string
  label: string
  onUpload: (file: UploadFile<any>) => void
}

const RHFUpload = ({ name, label, onUpload }: RHFSelectProp) => {
  const { control, register } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Upload
            fileList={field.value}
            {...register(name)}
            onChange={({ file }) => onUpload(file)}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
          {!!error && <div>{error?.message}</div>}
        </>
      )}
    />
  )
}

export default RHFUpload
