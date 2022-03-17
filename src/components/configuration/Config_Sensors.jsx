import React, { Component, Fragment } from 'react';
import common from '../../styling/common.module.css';
import $ from 'jquery';
import axios from 'axios';
import {
   floormap_det, asset_rack_det, sensor_register,
   iaq_sensor_register
} from '../../urls/apiurls';

export default class Config_Sensors extends Component {
   constructor(props) {
      super(props);
      this.state = {
         macid: "",
         floorid: "",
         rackid: "",
         tagType: "temperature/humidity",
         x: 0,
         y: 0,
         position: "FT",
         removeTag: false,
         message: "",
         success: false,
         error: false,
      }
   }
   componentDidMount = () => {
      axios({ method: "GET", url: floormap_det })
         .then((response) => {
            console.log('Response--->', response);
            const data = response.data;
            if (data.length !== 0 && response.status === 200) {
               $("#sensor_floor").empty();
               for (let i = 0; i < data.length; i++) {
                  $("#sensor_floor").append("<option value=" + data[i].id + ">" + data[i].name + "</option>")
               }
               console.log('floorId: --->', data[0].id);
               this.setState({ floorId: data[0].id })
               this.getRackDetails();
            } else {
               this.setState({
                  error: true,
                  message: "No floor map uploaded. Please upload a floor map to begin",
               });
            }
         })
         .catch((error) => {
            console.log('Error----->', error);
            if (error.response.status === 403) {
               this.setState({
                  error: true,
                  message: "User session had timed out. Please login again.",
               });
               this.timeout = setTimeout(() => {
                  localStorage.setItem("isLogged", "failed");
                  window.location.pathname = "/"
               }, 1000 * 2)
            } else {
               this.setState({
                  error: true,
                  message: "Error occurred. Please try again.",
               });
            }
         })
   };

   componentWillUnmount = () => {
      this.setState({
         macid: "",
         floorid: "",
         rackid: "",
         tagType: "temperature/humidity",
         x: 0,
         y: 0,
         position: "FT",
         removeTag: false,
         message: "",
         success: false,
         error: false,
      });
      clearTimeout(this.timeout);
   };

   getRackDetails = async () => {
      console.log('getRackDetails-------', $("#sensor_floor").val());
      this.setState({
         floorid: $("#sensor_floor").val(),
         error: false,
         success: false,
      });
      axios({
         method: "GET",
         url: asset_rack_det + $("#sensor_floor").val(),
      })
         .then((response) => {
            // console.log(response);
            console.log("====", response);
            if (response.status === 200) {
               $("#sensor_rack").empty();
               if (response.data.length !== 0) {
                  for (let i = 0; i < response.data.length; i++) {
                     $("#sensor_rack").append(
                        "<option value=" +
                        response.data[i].id +
                        ">" +
                        response.data[i].macid +
                        "</option>"
                     );
                  }
                  this.setState({ rackid: $("#sensor_rack").val() });
               } else {
                  this.setState({
                     error: true,
                     success: false,
                     message:
                        "No rack is registered for the floor. Please select some other floor.",
                  });
               }
            }
         })
         .catch((error) => {
            // console.log(error);
            if (error.response.status === 403) {
               this.setState({
                  success: false,
                  error: true,
                  message: "User session had timed out. Please login again.",
               });
               this.timeout = setTimeout(() => {
                  localStorage.setItem("isLogged", "failed");
                  window.location.pathname = "/"
               }, 1000 * 2)
            } else if (error.response.status === 400) {
               this.setState({
                  success: false,
                  error: true,
                  message: "Request Failed.",
               });
            } else {
               this.setState({
                  success: false,
                  error: true,
                  message: "Error occurred. Please try again.",
               });
            }
         });
   };

   inputHandler = (event) => {
      this.setState({ [event.target.name]: event.target.value });
   };

   changeSensorType = (event) => {
      this.setState({ tagType: event.target.value });
      $("#coordinate_block").css("display", "none");
      $("#position_block").css("display", "none");
      if (event.target.value === "iaq") {
         $("#coordinate_block").css("display", "block");
      } else {
         $("#position_block").css("display", "block");
      }
   };

   changeFloor = (event) => {
      this.setState({ floorid: event.target.value });
   };

   changeRack = (event) => {
      this.setState({ rackid: event.target.value });
   };

   registerSensor = (e) => {
      e.preventDefault();
      if (
         this.state.macid.length !== 17 ||
         this.state.macid.match(
            "^5a-c2-15-[a-x0-9]{2}-[a-x0-9]{2}-[a-x0-9]{2}"
         ) === null
      ) {
         this.setState({
            displayModal: true,
            message:
               'Invalid Sensor ID entered. Please enter a valid one. Please follow the pattern "5a-c2-15-00-00-00"',
         });
      } else {
         this.setState({ rackid: $("#sensor_rack").val() });
         this.setState({ x: 0 });
         console.log(this.state);
         if (this.state.tagType === "temperature/humidity") {
            axios({
               method: "POST",
               url: sensor_register,
               data: this.state,
            })
               .then((response) => {
                  if (response.status === 201) {
                     this.setState({
                        error: false,
                        success: true,
                        message:
                           "Temperature/Humidity sensor is registered successfully.",
                     });
                  } else {
                     this.setState({
                        error: true,
                        success: false,
                        message: "Unable to register sensor.",
                     });
                  }
               })
               .catch((error) => {
                  // console.log(error);
                  if (error.response.status === 403) {
                     this.setState({
                        success: false,
                        error: true,
                        message: "User session had timed out. Please login again.",
                     });
                     this.timeout = setTimeout(() => {
                        localStorage.setItem("isLogged", "failed");
                        window.location.pathname = "/"
                     }, 1000 * 2)
                  } else if (error.response.status === 400) {
                     this.setState({
                        success: false,
                        error: true,
                        message: "Duplicate entry for the sensor.",
                     });
                  } else {
                     this.setState({
                        success: false,
                        error: true,
                        message: "Error occurred. Please try again.",
                     });
                  }
               });
         } else if (this.state.tagType === "iaq") {
            axios({ method: "POST", url: iaq_sensor_register, data: this.state })
               .then((response) => {
                  if (response.status === 201) {
                     this.setState({
                        error: false,
                        success: true,
                        message: "IAQ sensor is registered successfully.",
                     });
                  } else {
                     this.setState({
                        error: true,
                        success: false,
                        message: "Unable to register sensor.",
                     });
                  }
               })
               .catch((error) => {
                  // console.log(error);
                  if (error.response.status === 403) {
                     this.setState({
                        success: false,
                        error: true,
                        message: "User session had timed out. Please login again.",
                     });
                     this.timeout = setTimeout(() => {
                        localStorage.setItem("isLogged", "failed");
                        window.location.pathname = "/"
                     }, 1000 * 2)
                  } else if (error.response.status === 400) {
                     this.setState({
                        success: false,
                        error: true,
                        message: "Duplicate entry for sensor.",
                     });
                  } else {
                     this.setState({
                        success: false,
                        error: true,
                        message: "Error occurred. Please try again.",
                     });
                  }
               });
         }
      }
   };

   unregisterSensor = (e) => {
      e.preventDefault();
      if (
         this.state.macid.length !== 17 ||
         this.state.macid.match(
            "^5a-c2-15-[a-x0-9]{2}-[a-x0-9]{2}-[a-x0-9]{2}"
         ) === null
      ) {
         this.setState({
            displayModal: true,
            message:
               'Invalid Sensor ID entered. Please enter a valid one. Please follow the pattern "5a-c2-15-00-00-00"',
         });
      } else {
         if (this.state.tagType === "temperature/humidity") {
            axios({
               method: "DELETE",
               url: sensor_register,
               data: {
                  macid: this.state.macid,
               },
            })
               .then((response) => {
                  if (response.status === 200) {
                     this.setState({
                        error: false,
                        success: true,
                        message: "Temperature/Humidity Sensor Removed successfully.",
                     });
                  } else {
                     this.setState({
                        error: true,
                        success: false,
                        message: "Unable to remove sensor.",
                     });
                  }
               })
               .catch((error) => {
                  console.log(error);
                  if (error.response.status === 403) {
                     this.setState({
                        success: false,
                        error: true,
                        message: "User session had timed out. Please login again.",
                     });
                     this.timeout = setTimeout(() => {
                        localStorage.setItem("isLogged", "failed");
                        window.location.reload = "/"
                     }, 1000 * 2)
                  } else if (error.response.status === 400) {
                     this.setState({
                        success: false,
                        error: true,
                        message: "Request Failed.",
                     });
                  } else {
                     this.setState({
                        success: false,
                        error: true,
                        message: "Error occurred. Please try again.",
                     });
                  }
               });
         } else if (this.state.tagType === "iaq") {
            axios({
               method: "DELETE",
               url: iaq_sensor_register,
               data: {
                  macid: this.state.macid,
               },
            })
               .then((response) => {
                  if (response.status === 200) {
                     this.setState({
                        error: false,
                        success: true,
                        message: "IAQ Sensor Removed successfully.",
                     });
                  } else {
                     this.setState({
                        error: true,
                        success: false,
                        message: "Unable to remove sensor.",
                     });
                  }
               })
               .catch((error) => {
                  console.log(error);
                  if (error.response.status === 403) {
                     this.setState({
                        success: false,
                        error: true,
                        message: "User session had timed out. Please login again.",
                     });
                     this.timeout = setTimeout(() => {
                        localStorage.setItem("isLogged", "failed");
                        window.location.reload = "/"
                     }, 1000 * 2)
                  } else if (error.response.status === 400) {
                     this.setState({
                        success: false,
                        error: true,
                        message: "Request Failed.",
                     });
                  } else {
                     this.setState({
                        success: false,
                        error: true,
                        message: "Error occurred. Please try again.",
                     });
                  }
               });
         }
      }
   };

   render() {
      const { success, error, message, macid, x, y } = this.state;
      return (
         <Fragment>
             <div  style={{ overflow: 'hidden',float: "right", width: "78%", marginRight:'5px'}}>
            <p className={common.header} style={{ marginLeft: "35px" }}>Sensors</p>
            {error && (<p className={common.errorMsg}>{message}</p>)}
            {success && (<p className={common.successMsg}>{message}</p>)}

            <form className="container mt-2" style={{ marginLeft: "30px" }}
               onSubmit={this.registerSensor}>
               <div className="row">
                  <div className={common.textfield}>
                     <label style={{ color: "#564256" }}>Floor Name *</label>
                     <select
                        className={"form-select text-dark " + common.dropdowncolor}
                        id="sensor_floor"
                        onChange={(this.changeFloor, this.getRackDetails)}
                     ></select>
                  </div>

                  <div className={common.textfield}>
                     <label style={{ color: "#564256" }}>Rack ID *</label>
                     <select
                        className={"form-select  text-dark " + common.dropdowncolor}
                        id="sensor_rack"
                        onChange={this.changeRack}
                     ></select>
                  </div>
                  <div className={common.textfield}>
                     <label style={{ color: "#564256" }}>Sensor Type *</label>
                     <select
                        className={"form-select  text-dark " + common.dropdowncolor}
                        id="sensor_type"
                        onChange={this.changeSensorType}>
                        <option value="temperature/humidity">Temperature/Humidity</option>
                        <option value="iaq">IAQ</option>
                     </select>
                  </div>

                  <div className={common.textfield}>
                     <label style={{ color: "#564256" }}>Tag MAC ID *</label>
                     <input 
                     // /className={common.textfield}
                        type="text"
                        name="macid"
                        value={macid}
                        onChange={this.inputHandler}
                        className="form-control text-dark"
                        required
                     />
                  </div>

                  <div id="coordinate_block" style={{ display: "none", }}>
                     <div style={{ display: 'flex' }}>
                        <div className={common.textfield}>
                           <label style={{ color: "#564256" }}>X1 Co-odinate *</label>
                           <input className={common.textfield}
                              type="number"
                              name="x"
                              value={x}
                              onChange={this.inputHandler}
                              // className="form-control text-dark"
                              required
                           />
                        </div>

                        <div className={common.textfield}>
                           <label style={{ color: "#564256" }}>Y1 Co-odinate *</label>
                           <input className={common.textfield}
                              type="number"
                              name="y"
                              value={y}
                              onChange={this.inputHandler}
                              // className="form-control text-dark"
                              required
                           />
                        </div>
                     </div>
                  </div>

                  <div id="position_block" className={common.textfield}>
                     <label style={{ color: "#564256" }}>Sensor Position on Rack *</label>
                     <select
                        className={"form-select  text-dark " + common.dropdowncolor}
                        onChange={(e) => {
                           this.setState({
                              position: e.target.value,
                           });
                        }}>
                        <option value="FT">Front Top</option>
                        <option value="FM">Front Mid</option>
                        <option value="FB">Front Bottom</option>
                        <option value="RT">Rear Top</option>
                        <option value="RM">Rear Mid</option>
                        <option value="RB">Rear Bottom</option>
                     </select>
                  </div>

                  <div className={common.button_centermaster}>
                     <input
                        type="button"
                        onClick={this.unregisterSensor}
                        value="Remove Sensor"
                        className={common.btn + " " + common.fourth1} />

                     <input type="submit"
                        onClick={this.masterRegistration}
                        style={{ marginLeft: '25px' }}
                        value="Add Sensor"
                        className={common.btn + " " + common.fourth} />
                  </div>
               </div>
            </form>
            </div>
         </Fragment>
      )
   }
}
