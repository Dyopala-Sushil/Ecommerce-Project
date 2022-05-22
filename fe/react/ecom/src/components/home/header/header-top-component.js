import { Modal, Button, Tabs, Tab } from "react-bootstrap";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
export function HeaderTop() {
  const [show, setShow] = useState(false);
  let user = JSON.parse(localStorage.getItem('_user')) || {};
  //console.log("User: ", user);

  let content = '';
  if(user.name){
    content = '<li><NavLink to="/admin">'+user.name+'</NavLink></li>';
  } else {
    content = '<li><NavLink to="/register">Sign Up</NavLink></li><li><NavLink to="/login">Sign In</NavLink></li>'
  }
  return (
    <>
      <div className="header-top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
              <div className="header-top-left">
                <a href="tel:+977000000000">
                  <i className="bi bi-telephone-forward"></i> +977-123-456-789
                </a>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
              <div className="header-top-right">
                <ul className="text-end">

                  {
                    user && user.name 
                      ? (<><li><NavLink to="/admin">{user.name}</NavLink></li><li><NavLink to="/logout">Logout</NavLink></li></>)
                      : (<><li><NavLink to="/register">Sign Up</NavLink></li><li><NavLink to="/login">Sign In</NavLink></li></>)
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
