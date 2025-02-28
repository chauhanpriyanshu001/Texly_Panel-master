import React from 'react'
import { useEffect } from 'react'
import { NameContext } from '../../Context'
import { useContext } from 'react'


const WithdrawlManagementPage = () => {
  const {setDashBoardName}=useContext(NameContext)
  useEffect(() => {
    setDashBoardName("WithDrawl Management")
  }, [])
  
  return (
    <div>WithdrawlManagementPage</div>
  )
}

export default WithdrawlManagementPage