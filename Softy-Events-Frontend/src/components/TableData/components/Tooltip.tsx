import { Popover } from 'antd'

const Tooltip = ({ target }: { target: string }) => {
  // Splitting the target string into two parts: first 20 characters and the rest
  const firstPart = target.substring(0, 20)
  const restPart = target.substring(20)

  return (
    <Popover
      placement="bottom" // Position of the popover relative to the target
      content={<div className="target-user-container">{restPart}</div>} // Content of the popover
      trigger="hover" // Triggering event to show the popover
    >
      {/* Displaying first 20 characters followed by ellipsis */}
      <span style={{cursor:'pointer',whiteSpace:'nowrap'}} className='table-data-user-field'>{firstPart} {restPart.length>0&&'...'} </span>
    </Popover>
  )
}

export default Tooltip // Exporting the Tooltip component
