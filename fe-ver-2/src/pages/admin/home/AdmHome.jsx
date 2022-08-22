import React from 'react'
import AdmWidget from '../../../components/admWidget/AdmWidget'
import Chart from '../../../components/chart/Chart'
import Featured from '../../../components/featured/Featured'
import TableList from '../../../components/table/TableList'
import './admHome.scss'

const AdmHome = () => {
  return (
    <div className="adm-home">
      <div className="widgets">
        <AdmWidget type="user"/>
        <AdmWidget type="order" />
        <AdmWidget type="earning" />
        <AdmWidget type="balance" />
      </div>
      <div className="charts">
        <Featured />
        <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
      </div>
      <div className="list">
        <div className="list--title">
          Lastest Transactions
        </div>
        <TableList />
      </div>
    </div>
  )
}

export default AdmHome