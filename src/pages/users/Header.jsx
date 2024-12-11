import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa'; // Importing the hamburger icon

const Header = () => {
  // State to control sidebar visibility
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div>
      {/* Navbar */}
      <nav
        className="navbar navbar-expand"
        style={{
          backgroundColor: '#f8f9fa',
          boxShadow: '0px 2px 4px rgba(0,0,0,0.3)',
          padding: '1rem 3rem',
          display:'flex',
          justifyContent:'space-between',
          zIndex:'10000',
          position: 'fixed', // Fixing the navbar
      top: 0,
      width: '100%', // Full width
          
        }}
      >
        {/* Left section with logo, title, and subtitle */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              alt="SMKN 1 Ponorogo"
              src="/src/assets/logo_old.png"
              style={{ width: '35px', height: '40px' }}
            />
            <div>
              <p style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>SMKN 1 PONOROGO</p>
              <p style={{ margin: 0, fontSize: '0.7rem', color: '#555' }} className="d-none d-md-flex flex-column">
                Mewujudkan Generasi Unggul dan Berkarakter
              </p>
            </div>
          </div>
        </div>

        {/* Mobile hamburger menu */}
        <div className="d-md-none" onClick={toggleSidebar}>
          <FaBars style={{ fontSize: '1.5rem', cursor: 'pointer' }} />
        </div>

        {/* Navbar links for larger screens (desktop) */}
        <ul
          className="navbar-nav ml-auto d-none d-md-flex"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            justifyContent: 'flex-start',
          }}
        >
          {/* Navbar links */}
          <li className="nav-item d-flex" style={{ zIndex: '10000', display: 'flex', position: 'relative' }}>
            <a href="/home" className="nav-link" style={{ color: '#333', fontWeight: '500' }}>
              Home
            </a>
            <a href="/datatamu" className="nav-link" style={{ color: '#333', fontWeight: '500' }}>
              Data Tamu
            </a>
          </li>

          {/* Login Button with outline */}
          <li className="nav-item d-none d-md-flex">
            <a
              href="/"
              className="btn btn-outline-primary"
              style={{
                borderRadius: '20px',
                padding: '0.2rem 1rem',
                fontWeight: '500',
              }}
            >
              Login
            </a>
          </li>
        </ul>
      </nav>

      {/* Sidebar menu (mobile view only) */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: isSidebarVisible ? 0 : '-250px', // Sidebar visibility control
          width: '250px',
          height: '100%',
          backgroundColor: '#f8f9fa',
          boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
          paddingTop: '60px',
          transition: 'right 0.3s ease',
          zIndex:'10000',
        
        }}
      >
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li style={{ padding: '10px 20px' }}>
            <a href="/home" className="nav-link" style={{ color: '#333', fontWeight: '500' }}>
              Home
            </a>
          </li>
          <li style={{ padding: '10px 20px' }}>
            <a href="/datatamu" className="nav-link" style={{ color: '#333', fontWeight: '500' }}>
              Data Tamu
            </a>
          </li>
          <li style={{ padding: '10px 20px' }}>
            <a
              href="/"
              className="btn btn-outline-primary "
              style={{
                borderRadius: '20px',
                padding: '0.2rem 1rem',
                fontWeight: '500',
                
              }}
            >
              Login
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
