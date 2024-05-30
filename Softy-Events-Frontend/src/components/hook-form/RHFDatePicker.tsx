import { DatePicker } from 'antd'
import { Controller, useFormContext } from 'react-hook-form'

type RHFSelectProp = {
  name: string
  label: string
}

const RHFDatePicker = ({ name, label }: RHFSelectProp) => {
  const { control, register } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          placeholder={label}
          {...register(name)}
          {...field}
          onChange={field.onChange}
          status={!!error ? 'error' : undefined}
        />
      )}
    />
  )
}

export default RHFDatePicker
