import { Select, SelectProps, Space, Tag } from 'antd'
import { RootState } from '../../store/index'
import { useSelector } from 'react-redux'

export default function SelectComp({ touched, error, value, setValue }: any) {
  const { userTypes } = useSelector((state: RootState) => state.role)
  const options: any[] = []
  userTypes?.map((el: any, index: number) => {
    options.push({
      label: `${el.name}`,
      value: `${el._id}`,
      index: index, // We add an index property to identify each option uniquely
    })
  })
  
  const selectProps: SelectProps<string[]> = {
    style: { width: '100%' },
    value,
    onChange: (newValue: string[]) => {
      setValue(newValue)
    },
    placeholder: 'Select user type...',
    maxTagCount: 3,
    autoClearSearchValue: false,
  }

  return (
    <div className="modal-field">
      <label className="modal-field-label">User Type</label>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Select {...selectProps}>
          {options.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              <Tag  color={getColorForIndex(option.index)}>{option.label}</Tag>
            </Select.Option>
          ))}
        </Select>
      </Space>
      {touched && error ? <p className="error-message">{error}</p> : null}
    </div>
  )
}

// Function to generate a unique color based on the index
function getColorForIndex(index: number): string {
  const colors = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
  ]
  return colors[index % colors.length]
}
