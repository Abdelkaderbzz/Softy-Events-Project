import { Select } from 'antd'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

type RHFSelectProp = {
  name: string
  label: string
  data: {
    label: string
    value: string
  }[]
}

const RHFSelect = ({ name, data, label }: RHFSelectProp) => {
  const { control, register } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Select
          {...field}
          {...register(name)}
          status={!!error ? 'error' : undefined}
          placeholder={label}
          onChange={field.onChange}
        >
          {data.map(({ label, value }) => (
            <Select.Option key={label} value={value}>
              {label}
            </Select.Option>
          ))}
        </Select>
      )}
    />
  )
}

export default RHFSelect
