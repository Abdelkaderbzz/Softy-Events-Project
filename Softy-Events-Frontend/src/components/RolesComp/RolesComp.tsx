import { useState, useMemo } from 'react'
import { Tooltip } from 'antd'


const RolesComp = ({ roles }: any) =>
{
  const isPermission =  ( typeof roles[0] === 'string')

  const colors = [
    { color: '#9E6E64', backgroundColor: '#FCD6CE' },
    { color: '#4F7B70', backgroundColor: '#C4E7C1' },
    { color: '#554580', backgroundColor: '#EFEAFA' },
  ]

  const limitedRoles = roles.slice(0, 2)
  const [arrow, setArrow] = useState('Show')
  const mergedArrow = useMemo(() => {
    return {
      pointAtCenter: true,
    }
  }, [arrow])
  return (
    <div className="roles-container">
      {limitedRoles.length < 1 ? <span className='empty-case'>-</span> :
      limitedRoles.map((role: any, i: number) => (
        <span
        style={{
          color: `${colors[i % colors.length].color}`,
          backgroundColor: `${colors[i % colors.length].backgroundColor}`,
        }}
        key={i}
        >
          {isPermission?role:role.name}
        </span>
      ))
    }
      {roles.length > 2 && (
        <Tooltip
          placement="bottom"
          title={
            <div>
              {roles.slice(2).map((role: any, i: number) => (
                <div key={i}>{isPermission?role:role.name}</div>
              ))}
            </div>
          }
          arrow={mergedArrow}
        >
          <span className="more-roles">+{roles.length - 2} ...</span>
        </Tooltip>
      )}
    </div>
  )
}

export default RolesComp
