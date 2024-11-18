import React, { useEffect } from 'react';
import Card from '../components/Card';
import NavBar from '../components/NavBar';
import NavbarSearch from '../components/NavbarSearch';
import SearchBarLocation from '../components/SearchBarLocation';
import Propic from '../assets/profile-pic.png';
import '../pages/MainPage.css';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  

  return (
    <>
      <NavBar />
      <NavbarSearch />
      <SearchBarLocation />
      <Card />
    </>
  );
};

export default MainPage;
