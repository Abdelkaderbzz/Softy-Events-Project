import { Tooltip } from 'antd'

const ToolTipText = ({ value }: any) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'end',
        gap: '10px',
        minWidth: '160px',
      }}
    >
      <p style={{ color: '#1c1c26d9', fontFamily: 'Poppins', fontSize: '16px', fontWeight: '500' }}>
        {value.slice(0, 5)}
      </p>
      <Tooltip placement="bottom" title={value}>
        <span style={{ fontSize: '20px' }} className="dots-tooltip">
          ...
        </span>
      </Tooltip>
    </div>
  )
}

export default ToolTipText
