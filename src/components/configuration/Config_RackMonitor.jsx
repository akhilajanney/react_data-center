import React, { Component, Fragment } from 'react';
import $ from 'jquery';
import common from '../../styling/common.module.css';
import axios from 'axios';
import { floormap_det, rackmonitor_register } from '../../urls/apiurls';


export default class Config_RackMonitor extends Component {

   constructor(props) {
      super(props);
      this.state = {
         floorID: "",
         rackID: "",
         pdu: "",
         capacity: "",
         x1: "",
         y1: "",
         x2: "",
         y2: "",
         message: "",
         success: false,
         error: false,
      }
   }

   componentDidMount() {
      axios({ method: "GET", url: floormap_det })
         .then((response) => {
            console.log('Response--->', response);
            const data = response.data;
            $("#rack_floorname tbody").empty();
            if (data.length !== 0 && response.status === 200) {
               for (let i = 0; i < data.length; i++) {
                  $("#rack_floorname").append("<option value=" + data[i].id + ">" + data[i].name + "</option>")
               }
               this.setState({ floorID: data[0].id })
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
   }

   inputHandler = (e) => {
      this.setState({ [e.target.name]: e.target.value })
   }

   rackRegistration = (e) => {
      e.preventDefault();
      this.setState({ success: false, error: false, message: "" });
      const { floorID, rackID, pdu, capacity, x1, y1, x2, y2 } = this.state;

      if (rackID && capacity && x1 && y1 && x2 && y2) {
         if (
            rackID.length !== 17 ||
            rackID.match("^5a-c2-15-[a-x0-9]{2}-[a-x0-9]{2}-[a-x0-9]{2}") === null
         ) {
            this.setState({
               message: "Invalid Rack ID entered. Please check and enter valid one.",
            });
         } else {
            axios({
               method: "POST",
               url: rackmonitor_register,
               data: {
                  floorid: floorID,
                  macid: rackID,
                  pdu: pdu,
                  capacity: capacity,
                  x1: x1,
                  y1: y1,
                  x2: x2,
                  y2: y2,
               },
            })
               .then((response) => {
                  console.log(response);
                  if (response.status === 201 || response.status === 200) {
                     this.setState({
                        success: true,
                        message: "Rack Monitor Registered Successfully.",
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
                        message: "Bad request.",
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
   }

   componentWillUnmount() {
      clearTimeout(this.timeout);
      this.setState({
         macid: "",
         floorid: "",
         rackid: "",
         tagType: "",
         x: "",
         y: "",
         position: "",
         removeTag: false,
         message: "",
         success: false,
         error: false,
      })
   }

   render() {
      const { rackID, pdu, capacity, x1, y1, x2, y2, message, success, error } = this.state;
      return (
         <Fragment>
            <div style={{ overflow: 'hidden', float: "right", width: "78%", marginRight: '5px' }}>
               <p className={common.header}>Rack Monitor</p>
               {error && (<p className={common.errorMsg}>{message}</p>)}
               {success && (<p className={common.successMsg}>{message}</p>)}

               <form className="container mt-2"
                  onSubmit={this.rackRegistration}>
                  <div className="row">
                     <div className={common.textfield}>
                        <label style={{ color: "#564256" }}>Floor Name *</label>
                        <select
                           className={"form-select text-dark " + common.dropdowncolor}
                           id="rack_floorname"
                           onChange={this.changeFloor}
                        ></select>
                     </div>

                     <div className={common.textfield} style={{ marginLeft: "60px" }}>
                        <label style={{ color: "#564256" }}>Rack MAC ID *</label>
                        <input
                           // className={common.textfield}
                           type="text"
                           name="rackID"
                           value={rackID}
                           onChange={this.inputHandler}
                           className="form-control  text-dark"
                           required
                        />
                     </div>

                     <div className={common.textfield}>
                        <label style={{ color: "#564256" }}>PDU *</label>
                        <input
                           type="text"
                           name="pdu"
                           value={pdu}
                           onChange={this.inputHandler}
                           className="form-control text-dark"
                           required
                        />
                     </div>

                     <div className={common.textfield} style={{ marginLeft: "60px" }}>
                        <label style={{ color: "#564256" }}>Capacity *</label>
                        <input
                           type="text"
                           name="capacity"
                           value={capacity}
                           onChange={this.inputHandler}
                           className="form-control text-dark"
                           required
                        />
                     </div>

                     <div className={common.textfield}>
                        <label style={{ color: "#564256" }}>X1 *</label>
                        <input
                           name="x1"
                           type="number"
                           min="0"
                           step="any"
                           value={x1}
                           onChange={this.inputHandler}
                           className="form-control text-dark"
                           required
                        />
                     </div>

                     <div className={common.textfield} style={{ marginLeft: "60px" }}>
                        <label style={{ color: "#564256" }}>Y1 *</label>
                        <input
                           name="y1"
                           type="number"
                           min="0"
                           step="any"
                           value={y1}
                           onChange={this.inputHandler}
                           className="form-control text-dark"
                           required
                        />
                     </div>

                     <div className={common.textfield}>
                        <label style={{ color: "#564256" }}>X2 *</label>
                        <input
                           name="x2"
                           type="number"
                           min="0"
                           step="any"
                           value={x2}
                           onChange={this.inputHandler}
                           className="form-control text-dark"
                           required
                        />
                     </div>

                     <div className={common.textfield} style={{ marginLeft: "60px" }}>
                        <label style={{ color: "#564256" }}>Y2 *</label>
                        <input
                           name="y2"
                           type="number"
                           min="0"
                           step="any"
                           value={y2}
                           onChange={this.inputHandler}
                           className="form-control text-dark"
                           required
                        />
                     </div>
                  </div>
                  <div className={common.button_center}>
                     <input type="submit"
                        value="Register Rack"
                        className={common.btn + " " + common.fourth} />
                  </div>
               </form>
            </div>
         </Fragment>
      )
   }
}
