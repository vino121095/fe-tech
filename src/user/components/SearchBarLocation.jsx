import React, { Fragment } from 'react'
import '../components/SearchBarLocation.css'
import FeedsViews from '../pages/FeedViews'
import { useNavigate } from 'react-router-dom'

const SearchBarLocation = () => {
  const navigate = useNavigate();
  return (
    <>
     <div className='nav-links'>
              <button className='searchLocForumBtn' onClick={()=>navigate('/user/Pages/FeedViews')}> <i class="bi bi-box-seam"></i>  Forum</button>
                <div className='nav-container'>
                  <ul>
                    <li> <input className='loc-search' type="text" placeholder='Enter Location...' /></li>
                    <li><a href=""> <i class="bi bi-crosshair" style={{width: '24px', height: '24px'}}></i> Near Me</a></li>
                    <li><a href="">Coimbatore</a></li>
                    <li><a href="">Chennai</a></li>
                    <li><a href="">Kerala</a></li>
                    <li><a href="">Goa</a></li>
                    <li><a href="">Bangalore</a></li>
                    <li><a href="">Pune</a></li>
                  </ul>
                </div>
           </div>
    </>
  )
}

export default SearchBarLocation