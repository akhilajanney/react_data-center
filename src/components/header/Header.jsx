import React, { Component } from 'react'
import header from '../../styling/header.module.css';

export default class Header extends Component {
   logout = (e) => {
      e.preventDefault();
      localStorage.setItem('isLogged', 'failed');
      window.location.pathname = "/login";
   }
   render() {
      return (
         <div className={header.header_container}>
            <div className={header.heading}>

               <span>
                  <i className="fa fa-bell" id={header.headericon}>
                  </i>
               </span>
               <span>
                  <i className="fa fa-user-circle" id={header.headericon}>
                  </i>
               </span>
               <img src='../images/logout.png' alt="logout" id="logout"
                  className={header.logout_image}
                  onClick={this.logout}
               />
            </div>
         </div>
      )
   }
}
