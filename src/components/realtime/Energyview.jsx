import React, { Component } from 'react';
import common from '../../styling/common.module.css'
import $ from 'jquery'

export default class Energyview extends Component {
    energydetail=()=>{
        $("#imgdetail").css("display", "block");
    }
    energyhide=()=>{
        $("#imgdetail").css("display", "none");
    }
  render() {
    return(
        <div  style={{ overflow: 'hidden',float: "right", width: "78%", marginRight:'5px'}}>
        <div>
             <p className={common.header}>
             Real-Time Energy View
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
             style={{width:'90%',marginTop:'20px',position:'relative'}}
             src="../images/energynew.png" alt="energy" 
             onMouseOver={this.energydetail}
             onMouseOut ={this.energyhide}
             />
             

            <div 
            id='imgdetail'
            className={common.imgdetailsenergy}
            style={{display:'none'}}
            >
                <p style={{marginTop:'2px'}}>Rack ID : 5a-c2-15-07-00-01</p>
                <p style={{display:'inline-block'}}>Total Power : 33.35KW </p>
                <a style={{display:'inline-block',}}>Show History &nbsp;
                    <i style={{fontSize:'12px'}}className="fas fa-plus-circle"></i>
                 </a>
                <p>No.of Assets : 29</p>
                <p>Average Power : 1.15KW </p>
                <p style={{display:'inline-block'}}>Peak Power : 2.30KW </p>
                <a style={{display:'inline-block',}}>Show History &nbsp;
                    <i style={{fontSize:'12px'}}className="fas fa-plus-circle"></i>
                 </a>
            </div>
        </div>
        </div>
    ) ;
  }
}
