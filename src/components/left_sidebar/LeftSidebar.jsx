/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from 'react'
import { Link } from "react-router-dom";

// Components
// import Dashboard from '../dashboard/Dashboard';
// import Config_RackMonitor from '../configuration/Config_RackMonitor';
// import Config_AssetTag from '../configuration/Config_AssetTag';
// import Config_Sensors from '../configuration/Config_Sensors';
// import Config_MasterGateway from '../configuration/Config_MasterGateway';
// import Config_SlaveGateway from '../configuration/Config_SlaveGateway';
// import Config_SignalRepeater from '../configuration/Config_SignalRepeater';
// import Config_UploadFloorMap from '../configuration/Config_UploadFloorMap';
// import RealtimeTracking from '../realtime/RealtimeTracking';
// import Health_Asset from '../health/Health_Assest';
// import Health_MasterGateway from '../health/Health_MasterGateway';
// import Health_SlaveGateway from '../health/Health_SlaveGateway';
// import Health_SignalRepeater from '../health/Health_SignalRepeater';
// import Health_Sensors from '../health/Health_Sensors';
// import Alerts from '../alerts/Alerts';
// import AssetRackMonitor from '../assets_tag/AssetRackMonitor';
// import AssetsTag from '../assets_tag/AssetsTag';
// import Assetview from '../realtime/Assetview';
// import Energyview from '../realtime/Energyview';
// import Thermalview from '../realtime/Thermalview';

// Leftsidebar CSS Style 
import leftsidebar from '../../styling/leftsidebar.module.css';

// Jquery dependency
import $ from 'jquery';

export default class LeftSidebar extends Component {
   // optionList = [false, false, false, false, false, false, false,false,false,false, false, false, false, false, false, false, false, false, false, false]
   constructor(props) {
      super(props);
      this.state = {
         flag: false,
      }
   }

   componentDidMount() {
      this.setState({ flag: true })
      // this.optionList[0] = true
      $("#parent_container").css("background-color", "#FFF");
      $("ul li a:first").addClass('active');
      $("ul li a.active").css({
         "color": "cyan",
         "background-color": "#575353",
         "border-left-color": "cyan",
         "font-weight": "bold",
      })
      this.activeTab();
   }
   optionChange = (e) => {
      e.preventDefault();
      // console.log('OPTION Method======', e.target.id);
      let ids = e.target.id;
      if (ids === 'opt0' || ids === 'opt14') {
         $("#assets").css("display", "none");
         $("#health").css("display", "none");
         $("#configuration").css("display", "none");
         $("#realtime").css("display", "none");
         $("nav ul .first").css("transform", "translateY(-50%) rotate(0deg)")
         $("nav ul .second").css("transform", "translateY(-50%) rotate(0deg)")
         $("nav ul .third").css("transform", "translateY(-50%) rotate(0deg)")
         $("nav ul .fourth").css("transform", "translateY(-50%) rotate(0deg)")
      }
      if (ids.length > 0 && ids !== 'configuration' && ids !== 'health' && ids !== 'assets' && ids !== 'assets') {
         if (ids === 'opt0') {
            $("#parent_container").css("background-color", "#FFF");
         } else {
            $("#parent_container").css("background-color", "#d4d4d487");
         }
         this.setState({ flag: true })
         this.optionList = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
         let id = parseInt(e.target.id.substring(3))
         this.optionList[id] = true;
      }
   }

   configBtn = (e) => {
      e.preventDefault();
      // console.log('configBtn Tab====>');
      $("#assets").css("display", "none");
      $("#health").css("display", "none");
      $("#realtime").css("display", "none");
      $("nav ul .second").css("transform", "translateY(-50%) rotate(0deg)")
      $("nav ul .third").css("transform", "translateY(-50%) rotate(0deg)")
      $("nav ul .fourth").css("transform", "translateY(-50%) rotate(0deg)")
      var display = $("#configuration").css("display");
      if (display === "none") {
         $("nav ul .first").css("transform", "translateY(-50%) rotate(-180deg)")
         $("#configuration").css("display", "block");
      }
      else {
         $("nav ul .first").css("transform", "translateY(-50%) rotate(0deg)")
         $("#configuration").css("display", "none");
      }
   }


   healthBtn = (e) => {
      e.preventDefault();
      $("#configuration").css("display", "none");
      $("#assets").css("display", "none");
      $("#realtime").css("display", "none");
      $("nav ul .first").css("transform", "translateY(-50%) rotate(0deg)")
      $("nav ul .third").css("transform", "translateY(-50%) rotate(0deg)")
      $("nav ul .fourth").css("transform", "translateY(-50%) rotate(0deg)")
      var display = $("#health").css("display");
      if (display === "none") {
         $("nav ul .second").css("transform", "translateY(-50%) rotate(-180deg)")

         $("#health").css("display", "block");
      }
      else {
         $("nav ul .second").css("transform", "translateY(-50%) rotate(0deg)")
         $("#health").css("display", "none");
      }
   }

   assetBtn = (e) => {
      e.preventDefault();
      $("#configuration").css("display", "none");
      $("#health").css("display", "none");
      $("#realtime").css("display", "none");
      $("nav ul .first").css("transform", "translateY(-50%) rotate(0deg)")
      $("nav ul .second").css("transform", "translateY(-50%) rotate(0deg)")
      $("nav ul .fourth").css("transform", "translateY(-50%) rotate(0deg)")
      var display = $("#assets").css("display");
      if (display === "none") {
         $("nav ul .third").css("transform", "translateY(-50%) rotate(-180deg)")
         $("#assets").css("display", "block");
      }
      else {
         $("nav ul .third").css("transform", "translateY(-50%) rotate(0deg)")
         $("#assets").css("display", "none");
      }
   }

   realtimeBtn = (e) => {
      e.preventDefault();
      $("#configuration").css("display", "none");
      $("#health").css("display", "none");
      $("#assets").css("display", "none");
      $("nav ul .first").css("transform", "translateY(-50%) rotate(0deg)")
      $("nav ul .second").css("transform", "translateY(-50%) rotate(0deg)")
      $("nav ul .third").css("transform", "translateY(-50%) rotate(0deg)")
      var display = $("#realtime").css("display");
      if (display === "none") {
         $("nav ul .fourth").css("transform", "translateY(-50%) rotate(-180deg)")
         $("#realtime").css("display", "block");
      }
      else {
         $("nav ul .fourth").css("transform", "translateY(-50%) rotate(0deg)")
         $("#realtime").css("display", "none");
      }
   }

   activeTab = () => {
      // e.preventDefault();
      // console.log('Active Tab====>');
      $('ul li a').removeAttr("style");
      var selector = 'ul li a';
      $(selector).on('click', function () {
         $(selector).removeClass('active');
         $(this).addClass('active');
      });
      $("ul li a.active").css({
         "color": "cyan",
         "background-color": "#575353",
         "border-left-color": "cyan",
         "font-weight": "bold",
      })
   }

   render() {

      return (
         <Fragment>
            <div id="parent_container">
               <nav className={leftsidebar.sidebar}>
                  <img src="../images/Vacus_White_Logo.png" alt=""
                     className={leftsidebar.logoImg} />
                  <ul onClick={this.activeTab}>
                     <div className=' animate__animated animate__fadeInLeft' style={{ animationDelay: "0.5s", animationDuration: "0.2" }}>
                        <div onClick={this.optionChange}>

                           <Link to='/dashboard'
                              style={{ textDecoration: 'none' }}
                           >
                              <li>
                                 <a id="opt0">
                                    <i className="fal fa-home"
                                       style={{
                                          fontSize: '20px',
                                          marginRight: '10px'
                                       }}>
                                    </i>Home
                                 </a>
                              </li>
                           </Link>
                           <li>
                              <a href="#config"
                                 className={leftsidebar.feat_btn}
                                 onClick={this.configBtn}>
                                 <i className="fal fa-cogs"
                                    style={{
                                       fontSize: '20px',
                                       marginRight: '10px'
                                    }}>
                                 </i>Configurations
                                 <span className="fa fa-caret-down first"></span>
                              </a>
                              <ul id="configuration" className={leftsidebar.feat_show}>
                                 <Link to='/floormap'>
                                    <li><a id="opt7" >Upload FloorMap</a></li>
                                 </Link>
                                 <Link to='/master'>
                                    <li id="opt4"><a id="opt4" >Master Gateway</a></li>
                                 </Link>
                                 <Link to='/slave'>
                                    <li><a id="opt5" >Slave Gateway</a></li>
                                 </Link>
                                 <Link to='/monitor'>
                                    <li id="opt1"><a id="opt1" >Rack Monitor</a></li>
                                 </Link>
                                 <Link to='/sensor'>
                                    <li id="opt3"><a id="opt3" >Sensors</a></li>
                                 </Link>
                                 <Link to='/asset'>
                                    <li id="opt2"><a id="opt2" >Asset Tag</a></li>
                                 </Link>
                                 <Link to='/signal'>
                                    <li><a id="opt6" >Signal Repeater</a></li>
                                 </Link>
                              </ul>
                           </li>

                           <li>
                              <a href="#"
                                 className={leftsidebar.feat_btn}
                                 onClick={this.realtimeBtn}>
                                 <i className="fal fa-compass"
                                    style={{
                                       fontSize: '20px',
                                       marginRight: '10px'
                                    }}>
                                 </i>Realtime Status
                                 <span className="fa fa-caret-down fourth"></span>
                              </a>
                              <ul id="realtime" className={leftsidebar.feat_show}>
                                 <Link to='/realtime'>
                                    <li><a id="opt8" href="#" >Realtime Tracking</a></li>
                                 </Link>
                                 <Link to='/assetview'>
                                    <li><a id="opt17" href="#" >Asset View</a></li>
                                 </Link>
                                 <Link to='/thermalview'>
                                    <li><a id="opt18" href="#" >Thermal View</a></li>
                                 </Link>
                                 <Link to='energy'>
                                    <li><a id="opt19" href="#" >Energy View</a></li>
                                 </Link>
                              </ul>
                           </li>
                           <li>
                              <a href="#"
                                 className={leftsidebar.feat_btn}
                                 onClick={this.healthBtn}>
                                 <i className="fal fa-medkit"
                                    style={{
                                       fontSize: '20px',
                                       marginRight: '10px'
                                    }}>
                                 </i>System Health
                                 <span className="fa fa-caret-down second"></span>
                              </a>
                              <ul id="health" className={leftsidebar.feat_show}>
                                 <Link to='/mastergate'>
                                    <li><a id="opt9" href="#" >Master Gateway</a></li>
                                 </Link>
                                 <Link to='/slavegate'>
                                    <li><a id="opt10" href="#" >Slave Gateway</a></li>
                                 </Link>
                                 <Link to='/sensorhealth'>
                                    <li><a id="opt11" href="#" >Sensors</a></li>
                                 </Link>
                                 <Link to='/assethealth'>
                                    <li><a id="opt12" href="#" >Asset Tag</a></li>
                                 </Link>
                                 <Link to='/signalhealth'>
                                    <li><a id="opt13" href="#" >Signal Repeater</a></li>
                                 </Link>
                              </ul>
                           </li>
                           <Link to='/alerts'
                              style={{ textDecoration: 'none' }}
                           >
                              <li>
                                 <a id="opt14" href="#">
                                    <i className="fal fa-exclamation-triangle"
                                       style={{
                                          fontSize: '20px',
                                          marginRight: '10px'
                                       }}>
                                    </i>Alerts Details
                                 </a>
                              </li>
                           </Link>
                           <li>
                              <a href="#" className={leftsidebar.serv_btn}
                                 onClick={this.assetBtn}>
                                 <i className="fal fa-server"
                                    style={{
                                       fontSize: '20px',
                                       marginRight: '10px'
                                    }}>
                                 </i>Assets Details
                                 <span className="fa fa-caret-down third"></span>
                              </a>
                              <ul id="assets" className={leftsidebar.serv_show}>
                                 <Link to='/assetrack'>
                                    <li><a id="opt15" href="#" >Rack Monitor</a></li>
                                 </Link>
                                 <Link to='/assettag'>
                                    <li><a id="opt16" href="#" >Assets Tag</a></li>
                                 </Link>
                              </ul>
                           </li>
                        </div>
                     </div>
                  </ul>
               </nav>

               <div className={leftsidebar.container}
               // style={{marginLeft:'200px'}} 
               >
                  {/* Home Page Components */}
                  {/* {this.optionList[0] && (<Dashboard />)} */}

                  {/* Configuration all components */}
                  {/* {this.optionList[7] && (<Config_UploadFloorMap />)} */}
                  {/* {this.optionList[7] && (<Link to='/floormap'></Link>)} */}




                  {/* {this.optionList[4] && (<Config_MasterGateway />)}
                  {this.optionList[5] && (<Config_SlaveGateway />)}
                  {this.optionList[1] && (<Config_RackMonitor />)}
                  {this.optionList[3] && (<Config_Sensors />)}
                  {this.optionList[2] && (<Config_AssetTag />)}
                  {this.optionList[6] && (<Config_SignalRepeater />)} */}

                  {/* RealtimeTracking Page Components */}
                  {/* {this.optionList[8] && (<RealtimeTracking />)}
                  {this.optionList[17] && (<Assetview />)}
                  {this.optionList[18] && (<Thermalview />)}
                  {this.optionList[19] && (<Energyview />)} */}

                  {/* System Health all Components */}
                  {/* {this.optionList[9] && (<Health_MasterGateway />)}
                  {this.optionList[10] && (<Health_SlaveGateway />)}
                  {this.optionList[11] && (<Health_Sensors />)}
                  {this.optionList[12] && (<Health_Asset />)}
                  {this.optionList[13] && (<Health_SignalRepeater />)} */}

                  {/* Alerts Page Components */}
                  {/* {this.optionList[14] && (<Alerts />)} */}

                  {/* Assets Tag all components */}
                  {/* {this.optionList[15] && (<AssetRackMonitor />)}
                  {this.optionList[16] && (<AssetsTag />)} */}
               </div>
            </div>
         </Fragment>
      )
   }
}