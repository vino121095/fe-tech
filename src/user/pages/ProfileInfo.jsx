import React, { Fragment } from 'react'
import '../pages/ProfileInfo.css'

const ProfileInfo = () => {
    const customStyle = {
        backgroundColor: '#F8F8F8',
        border: 'none',
        borderRadius: '5px',
        padding: '10px',
        maxWidth: '1200PX'
      };

      const customStyles = {
        backgroundColor: '#F8F8F8',
        width: '500px',
        border: 'none',
        borderRadius: '5px',
        padding: '10px'
      }

      const customStyless = {
        backgroundColor: '#F8F8F8',
        width: '500px',
        border: 'none',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
        marginLeft: '40px'
      }
    
      const labelStyle = {
        fontWeight: 'bold'
      };

      const labelStyles = {
        fontWeight: 'bold',
        marginLeft: '10px',
        marginLeft: '40px'
      };
  return (
    <>
       <div className="container mt-5 me-5">
      <h3 className="mb-4">Personal Information</h3>
      <form>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="fullName" className="form-label" style={labelStyle}>Full Name</label>
            <input type="text" className="form-control" id="fullName" style={customStyles} />
          </div>
          <div className="col-md-6">
            <label htmlFor="mobileNumber" className="form-label" style={labelStyles}>Mobile Number</label>
            <input type="text" className="form-control" id="mobileNumber" style={customStyless} />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label" style={labelStyle}>E-Mail Address</label>
          <input type="email" className="form-control" id="email" style={customStyle} />
        </div>

        <div className="mb-3">
          <label htmlFor="companyName" className="form-label" style={labelStyle}>Company Name</label>
          <input type="text" className="form-control" id="companyName" style={customStyle} />
        </div>

        <div className="mb-3">
          <label htmlFor="creditLimit" className="form-label" style={labelStyle}>Credit Limit</label>
          <input type="text" className="form-control" id="creditLimit" style={customStyle} />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label" style={labelStyle}>Address</label>
          <textarea className="form-control" id="address" rows="3" style={customStyle}></textarea>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="pincode" className="form-label" style={labelStyle}>Pincode</label>
            <input type="text" className="form-control" id="pincode" style={customStyles} />
          </div>
          <div className="col-md-6">
            <label htmlFor="landmark" className="form-label" style={labelStyles}>Landmark</label>
            <input type="text" className="form-control" id="landmark" style={customStyless} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="city" className="form-label" style={labelStyles}>City</label>
            <input type="text" className="form-control" id="city" style={customStyles} />
          </div>
          <div className="col-md-6">
            <label htmlFor="state" className="form-label" style={labelStyles}>State</label>
            <input type="text" className="form-control" id="state" style={customStyless} />
          </div>
        </div>
      </form>
    </div>
    </>
  )
}

export default ProfileInfo