import React, { Component } from 'react';
import common from '../../styling/common.module.css'
import $ from 'jquery'

export default class Thermalview extends Component {
    thermaldetail=()=>{
        $("#imgdetailthermal").css("display", "block");
    }
    thermalhide=()=>{
        $("#imgdetailthermal").css("display", "none");
    }
  render() {
    return(
        <div  style={{ overflow: 'hidden',float: "right", width: "78%", marginRight:'5px'}}>
        <div>
             <p className={common.header}>
             Real-Time Thermal View
             </p>
             <select 
                style={{ width: "30%" }}
                className="form-select bg-light text-dark border border-secondary mt-2"
                id="">
                 <option>Vacus Floor Map</option>
                 <option>Cambridge Ground Floor</option>
             </select>
             <br />
             <img 
              style={{width:'100%',marginTop:'-20px',position:'relative'}}
              src="../images/thermalmap.png" alt="thermalmap"
              onMouseOver={this.thermaldetail}
              onMouseOut ={this.thermalhide}
               />

            <div 
            id='imgdetailthermal'
            className={common.imgdetailsthermal}
            style={{display:'none'}}
            >
                <p style={{display:'inline-block'}}>Hot Spots : 8</p>
                <a style={{display:'inline-block'}}>Show History &nbsp;
                    <i style={{fontSize:'12px'}}className="fas fa-plus-circle"></i>
                 </a>
                <p style={{display:'inline-block'}}>Cold Spots : 3</p>
                <a style={{display:'inline-block'}}>Show History &nbsp;
                    <i style={{fontSize:'12px'}}className="fas fa-plus-circle"></i>
                 </a>
                <p style={{display:'inline-block'}}>Temperature(°C) : 29</p>
                <a style={{display:'inline-block'}}>Show History &nbsp;
                    <i style={{fontSize:'12px'}}className="fas fa-plus-circle"></i>
                 </a>
                <p style={{display:'inline-block'}}>Humidity(RH) : 48% </p>
                <a style={{display:'inline-block'}}>Show History &nbsp;
                    <i style={{fontSize:'12px'}}className="fas fa-plus-circle"></i>
                 </a>
                
            </div>
        </div>
        </div>
    ); 
  }
}
