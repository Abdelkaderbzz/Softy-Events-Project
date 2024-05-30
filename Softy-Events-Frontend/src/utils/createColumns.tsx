export const generateColumns = (
  data: any,
  exceptions?: string[],
  isRole?: boolean,
  isUser?: boolean
) => {
  if (!data || data.length === 0) {
    return []
  }
  const fields = Object.keys(data[0])

  const columns: any = fields
    .map((field, i) => {
      if (exceptions && !exceptions.includes(field)) {
        return {
          title: field,
          dataIndex: field,
          key: field,
          className: `table-column-field table-column-field-${i}`,
        }
      }
    })
    .filter((column) => column !== undefined)

  columns.push({
    title: 'Action',
    dataIndex: 'Action',
    key: 'Action',
    className: 'table-column-field action-field',
  })

  return columns
}
