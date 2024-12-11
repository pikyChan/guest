import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const Logout = () => {
  useEffect(() => {
    const handleLogout = async () => {
      try {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: 'Do you really want to log out?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Logout',
          cancelButtonText: 'Cancel',
          reverseButtons: true,
        });

        if (result.isConfirmed) {
          // User confirms logout
          Swal.fire({
            title: 'Logging out...',
            text: 'Please wait',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
              Swal.showLoading();
            },
          });

          const token = localStorage.getItem('token');
          if (!token) throw new Error('No token found');

          localStorage.removeItem('token');
          localStorage.removeItem('Id');
          localStorage.removeItem('username');
          localStorage.setItem('isLoggedIn', 'false');

          const response = await fetch('http://localhost:3000/api/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            Swal.close();
            Swal.fire({
              icon: 'success',
              title: 'Logged out!',
              text: 'You have been logged out successfully.',
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              window.location.href = '/';
            });
          } else {
            console.error('Logout failed:', response.statusText);
            Swal.fire('Error', 'Logout failed, please try again.', 'error');
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // User cancels logout, go back to the previous page without reload
          window.history.back();
        }
      } catch (error) {
        console.error('Error:', error);
        Swal.fire('Error', 'An error occurred during logout.', 'error');
      }
    };

    handleLogout();
  }, []);

  return null;
};

export default Logout;
