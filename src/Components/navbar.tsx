import React from "react";
import { Link } from "react-router-dom";

export default function navbar() {
  return (
    <>

      <div className="navbar navbar-expand-lg navbar-dark bg-secondary" style={{margin:'0px'}}>
        <Link style={{ color: 'white', textDecoration: 'none' }} to="/" >
          <p style={{ fontSize: '20px', marginLeft: '20px' }}>CodeForcesVisualizer</p>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        ></button>
        <div className="d-flex justify-content-end">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav mr-auto">
              <div className="nav-item active mx-2 " >
                <Link style={{ color: 'white', textDecoration: 'none' }} to="/home" >
                  <p style={{ fontSize: '20px',marginLeft: '20px' }}>Home</p>
                </Link></div>

              {/* <div className="nav-item active mx-2" >
                <Link style={{ color: 'white', textDecoration: 'none' }} to="/compare" >
                  <p style={{ fontSize: '20px',marginLeft: '20px' }}>Compare</p>
                </Link>
              </div> */}
            </div>
            {/* <div className="nav-item active mx-2" >
              <Link style={{ color: 'white', textDecoration: 'none' }} to="/virtualratingchange" >
                <p style={{ fontSize: '20px',marginLeft: '20px' }}>Virtualratingchange</p>
              </Link>
            </div> */}
            {/* <div className="nav-item active mx-2">
              <Link style={{ color: 'white', textDecoration: 'none' }} to="/saysomething" >
                <p style={{ fontSize: '20px',marginLeft: '20px' }}>Saysomething</p>
              </Link>
            </div> */}
            <div className="nav-item active mx-2">
              <Link style={{ color: 'white', textDecoration: 'none' }} to="/contestdetails" >
                <p style={{ fontSize: '20px',marginLeft: '20px' }}>Contestdetails</p>
              </Link>
            </div>

          </div>
        </div>
      </div>

    </>
  );
}
