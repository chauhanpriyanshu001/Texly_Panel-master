import React from 'react'
import CustomPieChart from '../../Components/CustomPiechart'
import "./TCommisionPage.css"
const TCommisionPage = () => {
    const size={
        radius:80
    }
  return (
    <div className='TCommisionPage_container'>
        <div className="TCommisionPage_piechart">
          Commision
            <CustomPieChart
            size={size}
            />
        </div>
        <div className="TCommision_table_container">
          
        </div>
    </div>
  )
}

export default TCommisionPage