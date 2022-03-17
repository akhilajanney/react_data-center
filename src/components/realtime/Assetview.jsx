import React, { Component } from 'react';
import common from '../../styling/common.module.css'
import $ from 'jquery'

export default class Assetview extends Component {
    assetdetail=()=>{
        $("#imgdetail").css("display", "block");
    }
    assethide=()=>{
        $("#imgdetail").css("display", "none");
    }
  render() {
    return(
        <div  style={{ overflow: 'hidden',float: "right", width: "78%", marginRight:'5px'}}>
        <div>
             <p className={common.header}>
              Real-Time Asset View
             </p>
             <select 
                style={{ width: "30%" }}
                className="form-select bg-light text-dark border border-secondary mt-2"
                id="">
                 <option>Vacus Floor Map</option>
                 <option>Cambridge Ground Floor</option>
                 {/* <option></option> */}
             </select>
             <br />
             <img 
             onMouseOver={this.assetdetail}
             onMouseOut ={this.assethide}
            //  onClick={this.assethide}
             style={{width:'95%',marginTop:'-25px',position:'relative'}}
             src="../images/assetview.png" alt="asset" />


            <div 
            id='imgdetail'
            className={common.imgdetails}
            style={{display:'none'}}
            >
                <p style={{marginTop:'2px'}}>Rack ID : 5a-c2-15-07-00-01</p>
                <p>Rack Capacity : 42U</p>
                <p>No.of Assets : 29</p>
                <p>Available U : 10</p>
                <p style={{display:'inline-block'}}>Utilization : 76% </p>
                <a style={{display:'inline-block',}}>Show History &nbsp;
                    <i style={{fontSize:'12px'}}className="fas fa-plus-circle"></i></a>
            </div>
        </div>
        </div>
    ) ;
  }
}
