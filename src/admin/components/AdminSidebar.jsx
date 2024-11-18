import React from 'react'
import '../components/AdminSidebar.css'
import { useNavigate } from 'react-router-dom'; 
import ProductView from './products/ProductView';
import { CircleUserRound, Settings, LogOut } from 'lucide-react';
import Logo from '../assets/RiM-Logo.png'
import Enterprise from '../assets/AdminDashboardIcons/Enterprise ai.png'
import Forum from '../assets/AdminDashboardIcons/forum.png'
import Order from '../assets/AdminDashboardIcons/Order summary.png'
import Product from '../assets/AdminDashboardIcons/Product.png'
import Shipment from '../assets/AdminDashboardIcons/Shipment.png'
import Technician from '../assets/AdminDashboardIcons/Technicians.png'
import Distributor from '../assets/AdminDashboardIcons/Distributors.png'
import Transport from '../assets/AdminDashboardIcons/Transport.png'

const AdminSidebar = ({handleBackClick}) => {
  const navigate = useNavigate();  // Add this hook

  // Add this function to handle navigation
  const handleNavigation = (path, e) => {
    e.preventDefault();
    navigate(path);
  };


  return (
    <>
     <div className='sideNavContainer'>
      <div className="Dashboardlogo">
        <img src={Logo} alt="logo"/>
      </div>
     <div className='sideNavLinks'>
     <div className="back-link" onClick={handleBackClick}>
            <i className="bi bi-arrow-left-short" style={{ cursor: 'pointer' }}></i> Back
          </div>
        <div className='general'>
           <small>General</small>
        </div>
        <div className='generalLinks'>
            <ul>
                <li><a href="/Dashboard" onClick={(e) => handleNavigation ('/Dashboard',e)}><img src={Enterprise} alt=""/> Enterprise AI Hub</a></li>
                <li>
                  <a href='/Dashboard/forum' onClick={(e) => handleNavigation('/Dashboard/forum', e)}>
                    <img src={Forum} alt="" /> Forum
                  </a>
                </li>
                <li>
                <div className="dropdown">
                   <a className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                   <img src={Product} alt="" />
                     Products
                   </a>
                 
                   <ul className="dropdown-menu">
                     <li>
                       <a 
                         className="dropdown-item" 
                         href="/Dashboard/products"
                         onClick={(e) => handleNavigation('/Dashboard/products', e)}
                       >
                         Product list
                       </a>
                     </li>
                     <li>
                       <a 
                         className="dropdown-item" 
                         href="/Dashboard/productView"
                         onClick={(e) => handleNavigation('/Dashboard/products/productView', e)}
                       >
                         Product view
                       </a>
                     </li>
                   </ul>
               </div>
                </li>
                <li>
                  <a href="" onClick={(e) => handleNavigation('/Dashboard/technicians', e)}>
                    <img src={Technician} alt="" /> Technicians
                  </a>
                </li>
                <li>
                    <a href="'/Dashboard/Distributors" onClick={(e) => handleNavigation('/Dashboard/Distributors',e)}><img src={Distributor} alt="" />
                      Distributors</a>
                  </li>
                <li><a href=""><img src={Shipment} alt="" /> Shipments</a></li>
                <li><a href="/Dashboard/Transport" onClick={(e) => handleNavigation}><img src={Transport} alt="" /> Transport</a></li>
                <li>
                    <a href="/Dashboard/OrderSummary" onClick={(e) => handleNavigation('/Dashboard/OrderSummary',e)}><img src={Order} alt="" />
                      Order Summary</a>
                </li>
            </ul>
        </div>
        <div>
            <small className='support'>Support</small>
        </div>
        <div className='supportLinks'>
            <ul>
                <li><a href=""><CircleUserRound /> Accounts</a></li>
                <li><a href=""><Settings /> Settings</a></li>
                <li><a href=""><LogOut /> Logout</a></li>
            </ul>
        </div>
     </div>
     </div>
    </>
  )
}

export default AdminSidebar