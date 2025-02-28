import React from 'react'
import "./BNCommisionPage.css"
import SimpleLineChart from '../../Components/CustomCharts/SimpleLineChart'
const BNCommisionPage = () => {
  return (
    <div
    className='BNCommisionPage_container'
    >
        <div className="BNCommisionPage_chart">
            <SimpleLineChart/>
        </div>
    </div>
  )
}

export default BNCommisionPage