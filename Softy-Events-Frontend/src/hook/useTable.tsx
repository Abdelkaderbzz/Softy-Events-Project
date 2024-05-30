import { useState } from 'react'

const useTable = () => {
    const [page,setPage] = useState<number>(1)
  return (
   {
    page,
    setPage
   }
  )
}

export default useTable
