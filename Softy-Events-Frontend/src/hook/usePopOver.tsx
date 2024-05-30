import { useState } from 'react'

const usePopOver = () => {
  const [openPopover, setOpenPopover] = useState<boolean>(false)
  const onOpenPopover = () => setOpenPopover(true)
  const onClosePopover = () => setOpenPopover(false)
  const onTogglePopover = () => setOpenPopover((prev) => !prev)

  return {
    openPopover,
    onOpenPopover,
    onClosePopover,
    onTogglePopover,
  }
}

export default usePopOver
