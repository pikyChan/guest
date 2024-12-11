import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const username = localStorage.getItem('username') || 'Admin';

  return (
    <div>
      {/* Navbar */}
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button">
              <i className="fas fa-bars" />
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="/admin/dashboard" className="nav-link">Dashboard</a>
          </li>
        </ul>
        
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          {/* Profile Dropdown */}
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="profileDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ color: '#333', display: 'flex', alignItems: 'center' }}
            >
              <img
                src="https://i.pinimg.com/564x/d0/7b/a6/d07ba6dcf05fa86c0a61855bc722cb7a.jpg"
                alt="User Avatar"
                className="rounded-circle"
                style={{ width: '30px', height: '30px', marginRight: '8px' }}
              />
              {username}
            </a>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="profileDropdown">
              <Link to="/admin/profile" className="dropdown-item">Profile</Link>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="/logout">Logout</a>
            </div>
          </li>
        </ul>
      </nav>
      {/* /.navbar */}
    </div>
  );
}

export default Header;


