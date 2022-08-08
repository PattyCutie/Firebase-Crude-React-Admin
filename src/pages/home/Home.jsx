import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Widget from '../../components/widget/Widget'
import Featured from '../../components/featured/Featured'
import Chart from '../../components/chart/Chart'
import TableList from '../../components/tablelist/TableList'
import "./home.scss"

function Home() {
  return (
    <div className='home'>
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="widgets">
            <Widget type="user" />
            <Widget type="product"/>
            <Widget type="earning"/>
            <Widget type="balance"/>
          </div>
          <div className="charts">
             <Featured />
             <Chart aspect={ 2 / 1 } title="Last 6 months (Revenue)"/>
          </div>
          <div className="listContainer">
            <div className="listTitle">Latest Transections</div>
            <TableList />
          </div>
        </div>
    </div>
  )
}

export default Home