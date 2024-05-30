// form
import { useFormContext, Controller } from 'react-hook-form'
// @mui
import { Input } from 'antd'
// translation

// ----------------------------------------------------------------------

type Props = {
  name: string
  min?: number
  defaultValue?: string
  label: string
  rows?: number
  maxLength?: number
}

export default function RHFTextField({
  name,

  rows = 1,
  maxLength,
  label,
  defaultValue,
  ...other
}: Props) {
  const { control } = useFormContext()
  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault()
  }
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <>
          <Input
            {...field}
            name={name}
            onBlur={field.onBlur}
            defaultValue={defaultValue}
            onWheel={handleWheel}
            value={field.value}
            maxLength={maxLength}
            onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
              field.onChange(e)
            }}
            status={!!error ? 'error' : undefined}
            {...other}
          />
          {!!error && <div>{error?.message}</div>}
        </>
      )}
    />
  )
}
