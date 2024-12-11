import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container">
        <div className="d-flex justify-content-center align-items-center">
          <p className="text-center mb-0 small">
            &copy; {new Date().getFullYear()} SMK Negeri 1 Ponorogo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
