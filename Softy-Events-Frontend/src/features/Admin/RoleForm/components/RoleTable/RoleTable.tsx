import { handleRolesChange } from '@src/store/slices/role/roleSlice'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useAppDispatch, RootState } from '../../../../../store/index'
import { useSelector } from 'react-redux'

const RoleTable: React.FC = () => {
  const dispatch = useAppDispatch()
  const { roleToUpdate } = useSelector((state: RootState) => state.role)

  const [checkedItems, setCheckedItems] = useState<string[]>(roleToUpdate?.permissions || [])
  useEffect(() => {
    dispatch(handleRolesChange(checkedItems))
  }, [dispatch, checkedItems])
  const roles = ['user', 'role', 'domain', 'permissions']
  const actions = ['get', 'create', 'update', 'delete', 'manage']
  const colors = [
    { color: '#9E6E64', backgroundColor: '#FCD6CE' },
    { color: '#4F7B70', backgroundColor: '#C4E7C1' },
    { color: '#554580', backgroundColor: '#EFEAFA' },
  ]

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    role: string,
    action: string
  ) => {
    const isChecked = event.target.checked
    const item = `${action}_${role}`

    if (isChecked) {
      setCheckedItems([...checkedItems, item])
    } else {
      setCheckedItems(checkedItems.filter((checkedItem) => checkedItem !== item))
    }
  }

  const handleRowCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, role: string) => {
    const isChecked = event.target.checked
    const rowItems = actions.map((action) => `${action}_${role}`)

    if (isChecked) {
      setCheckedItems([...checkedItems, ...rowItems])
    } else {
      setCheckedItems(checkedItems.filter((checkedItem) => !rowItems.includes(checkedItem)))
    }
  }

  const handleSelectAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked
    let allItems: string[] = []

    if (isChecked) {
      allItems = roles.flatMap((role) => actions.map((action) => `${action}_${role}`))
    }

    setCheckedItems(allItems)
  }

  return (
    <div className="table-role-container">
      <table className="table-role">
        <thead>
          {/* <th>
            <input
            type="checkbox"
            checked={checkedItems.length === roles.length * actions.length}
            onChange={handleSelectAllChange}
            />
          </th> */}
          <tr>
            <th className="role-actions td-collection">Collection/action</th>
            {actions.map((action) => (
              <th className="role-actions" key={action}>
                {action}
              </th>
            ))}
            <th className="role-actions">All</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role: string, i: number) => (
            <tr key={role}>
              <td className="role-container">
                <p
                  style={{
                    color: `${colors[i % colors.length].color}`,
                    backgroundColor: `${colors[i % colors.length].backgroundColor}`,
                  }}
                >
                  {role}
                </p>
              </td>
              {actions.map((action) => (
                <td key={action}>
                  <input
                    type="checkbox"
                    checked={checkedItems.includes(`${action}_${role}`)}
                    onChange={(event) => handleCheckboxChange(event, role, action)}
                  />
                </td>
              ))}
              <td>
                <input
                  type="checkbox"
                  checked={actions.every((action) => checkedItems.includes(`${action}_${role}`))}
                  onChange={(event) => handleRowCheckboxChange(event, role)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RoleTable
