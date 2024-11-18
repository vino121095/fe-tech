import React from 'react';
import'../components/NavbarSearch.css';

const NavbarSearch = () => {
  return (
    <>
       <div class="search-container">
              <input type="text" class="search-input" placeholder="Search" />
              <div class="search-icons">
                <i class="bi bi-x-lg"></i> 
                <div class="divider"></div>
                <i class="bi bi-mic-fill"></i>
                <i class="bi bi-search"></i>
              </div>
          </div>
    </>
  )
}

export default NavbarSearch