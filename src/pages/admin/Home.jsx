import React, { useEffect, useState } from "react";
import InstansiChart from "./InstansiChart";
import TanggalKunjungChart from "./TanggalKunjungChart";
import ExamplePieChart from "../admin/ExamplePieChart"
import ExampleDonutChart from "../admin/ExampleDonutChart"

const Home = ()=>{
  const [guestBookCount, setGuestBookCount] = useState(0);
  const [UsersCount, setUsersCount] = useState(0);
  const token= localStorage.getItem("token")

  useEffect(() => {
    // Fungsi untuk mengambil data buku tamu ketika endpoint sudah diketahui
    const fetchGuestBookCount = async () => {
      try {
        const response= await fetch("http://127.0.0.1:3000/api/bukutamu",{
          headers:{Authorization:`Bearer ${token}` }
      })
        const data = await response.json();
        const filteredData = data.filter(item => item.deleted_at === null);
        setGuestBookCount(filteredData.length);
      } catch (error) {
        console.error("Error fetching guest book count:", error);
      }
    };

    const fetchUsersBookCount = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3000/api/users", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const data = await response.json();
        // Set usersCount to the total number of users
        setUsersCount(data.length);
      } catch (error) {
        console.error("Error fetching guest book count:", error);
      }
    };
    

    fetchGuestBookCount();
    fetchUsersBookCount();
  }, []);

  return (
   <>
  {/* Content Header (Page header) */}
  <div className="content-header" >
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 className="m-0">Dashboard</h1>
        </div>{/* /.col */}
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="/admin">Admin</a></li>
            <li className="breadcrumb-item active">Dashboard</li>
          </ol>
        </div>{/* /.col */}
      </div>{/* /.row */}
    </div>{/* /.container-fluid */}
  </div>
  {/* /.content-header */}
  {/* Main content */}
  <section className="content">
    <div className="container-fluid">
      {/* Small boxes (Stat box) */}
      <div className="row">
        <div className="col-lg-6 col-15">
          {/* small box */}
          <div className="small-box bg-info">
            <div className="inner">
            <h3>{UsersCount}<sup style={{ fontSize: 20 }}></sup></h3>
              <p>Users Online</p>
            </div>
            <div className="icon">
              <i className="ion ion-person-add" />
            </div>
            <a href="/admin/users" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
          </div>
        </div>
        {/* ./col */}
        <div className="col-lg-6 col-15">
      {/* small box */}
      <div className="small-box bg-success">
        <div className="inner">
          <h3>{guestBookCount}<sup style={{ fontSize: 20 }}></sup></h3>
          <p>Guest Book</p>
        </div>
        <div className="icon">
          <i className="ion ion-stats-bars" />
        </div>
        <a href="/admin/bukutamu" className="small-box-footer">
          More info <i className="fas fa-arrow-circle-right" />
        </a>
      </div>
    </div>
        {/* ./col */}
      
      </div>
      {/* /.row */}
      {/* Main row */}
      <div className="row">
        {/* Left col */}
        <section className="col-lg-7 connectedSortable">
          {/* Custom tabs (Charts with tabs)*/}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title d-flex " style={{gap:'5px'}}>
                <i className="fas fa-chart-pie mr-1" />
               <h7 className="d-none d-md-flex flex-column">Data </h7> Kunjungan
              </h3>
              <div className="card-tools">
                <ul className="nav nav-pills ml-auto">
                  <li className="nav-item">
                    <a className="nav-link active" href="#area-chart" data-toggle="tab">Area</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#sales-chart" data-toggle="tab">Donut</a>
                  </li>
                </ul>
              </div>
            </div>{/* /.card-header */}
            <div className="card-body">
              <div className="tab-content p-0">
                {/* Morris chart - Sales */}
                <div className="chart tab-pane active" id="area-chart" style={{ position: 'relative', height: 370 }}>
                      <ExamplePieChart />
                    </div>
                    
                <div className="chart tab-pane" id="sales-chart" style={{position: 'relative', height: 370}}>
                  <ExampleDonutChart />
                  
                </div>
              </div>
            </div>{/* /.card-body */}
          </div>
          {/* /.card */}
          {/* DIRECT CHAT */}
          <div className="card direct-chat direct-chat-primary" >
            <div className="card-header">
            <h3 className="card-title">
  <i className="fas fa-calendar-check" style={{marginRight:'15px'}} />
  Waktu Kunjung
</h3>

              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                  <i className="fas fa-minus" />
                </button>
              </div>
            </div>
            {/* /.card-header */}
            <div className="card-body">
              <div style={{height: 150, width: '100%', marginTop:'-150px'}} />
              <TanggalKunjungChart />
              
            </div>
          </div>
          {/*/.direct-chat */}
        
        </section>
        {/* /.Left col */}
        {/* right col (We are only adding the ID to make the widgets sortable)*/}
        <section className="col-lg-5 connectedSortable">
          {/* Map card */}
          <div className="card bg-gradient-primary">
            <div className="card-header border-0">
            <h3 className="card-title">
                <i className="fas fa-users" style={{marginRight:'15px'}} />
                Asal Instansi
              </h3>
              {/* card tools */}
              <div className="card-tools">
                <button type="button" className="btn btn-primary btn-sm" data-card-widget="collapse" title="Collapse">
                  <i className="fas fa-minus" />
                </button>
              </div>
              {/* /.card-tools */}
            </div>
            <div className="card-body">
              <div style={{height: 150, width: '100%', marginTop:'-150px'}} />
              <InstansiChart />
            </div>
            <div className="card-footer bg-transparent">
              <div className="row">
                <div className="col-4 text-center">
                  <div id="sparkline-1" />
                  <div className="text-white"></div>
                </div>
                {/* ./col */}
                <div className="col-4 text-center">
                  <div id="sparkline-2" />
                  <div className="text-white"></div>
                </div>
                {/* ./col */}
                <div className="col-4 text-center">
                  <div id="sparkline-3" />
                  <div className="text-white"></div>
                </div>
                {/* ./col */}
              </div>
              {/* /.row */}
            </div>
          </div>
          {/* /.card */}
        
          {/* Calendar */}
          <div className="card bg-gradient-success">
            <div className="card-header border-0">
              <h3 className="card-title">
                <i className="far fa-calendar-alt" style={{marginRight:'15px'}}  />
                Calendar
              </h3>
              {/* tools card */}
              <div className="card-tools">
                {/* button with a dropdown */}
                <div className="btn-group">
                  <button type="button" className="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown" data-offset={-52}>
                    <i className="fas fa-bars" />
                  </button>
                  <div className="dropdown-menu" role="menu">
                    <a href="#" className="dropdown-item">Add new event</a>
                    <a href="#" className="dropdown-item">Clear events</a>
                    <div className="dropdown-divider" />
                    <a href="#" className="dropdown-item">View calendar</a>
                  </div>
                </div>
                <button type="button" className="btn btn-success btn-sm" data-card-widget="collapse">
                  <i className="fas fa-minus" />
                </button>
                <button type="button" className="btn btn-success btn-sm" data-card-widget="remove">
                  <i className="fas fa-times" />
                </button>
              </div>
              {/* /. tools */}
            </div>
            {/* /.card-header */}
            <div className="card-body pt-0">
              {/*The calendar */}
              <div id="calendar" style={{width: '100%'}} />
            </div>
            {/* /.card-body */}
          </div>
          {/* /.card */}
        </section>
        {/* right col */}
      </div>
      {/* /.row (main row) */}
    </div>{/* /.container-fluid */}
  </section>
  {/* /.content */}



</>
  );
}

export default Home;
