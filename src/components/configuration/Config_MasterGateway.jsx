import React, { Component, Fragment } from 'react';
import common from '../../styling/common.module.css';
import axios from 'axios';
import $ from 'jquery';
import { floormap_det, mastergate_register } from '../../urls/apiurls';

export default class Config_MasterGateway extends Component {
   constructor(props) {
      super(props);
      this.state = {
         floorId: "",
         masterId: "",
         error: false,
         success: false,
         message: "",
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
               console.log('floorId: --->', data[0].id);
               this.setState({ floorId: data[0].id })
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
      console.log('##########===>', e.target.value);
      this.setState({ [e.target.name]: e.target.value })
   }

   masterRegistration = (e) => {
      e.preventDefault();
      console.log('masterRegistration=====>', this.state);
      const { floorId, masterId } = this.state;
      this.setState({ error: false, success: false, message: "" })
      axios({
         method: "POST", url: mastergate_register,
         data: { floorid: floorId, macaddress: masterId }
      })
         .then((response) => {
            if (response.status === 200) {
               this.setState({
                  success: true,
                  error: false,
                  message: "Master Gateway is registered successfully.",
               });
            } else {
               this.setState({
                  success: false,
                  error: true,
                  message: "Master Gateway  is not registered",
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
                  window.location.pathname = "/"
               }, 1000 * 2)
            } else if (error.response.status === 400) {
               this.setState({
                  success: false,
                  error: true,
                  message: "Master Gateway ID found.",
               });
            } else {
               this.setState({
                  success: false,
                  error: true,
                  message: "Error occurred. Please try again.",
               });
            }
         })
   }

   removeGateway = (e) => {
      console.log('removeGateway$$$$$$$$');
      e.preventDefault();
      this.setState({ error: false, success: false, message: "" })
      if (this.state.masterId.length > 0) {
         axios({
            method: "DELETE", url: mastergate_register,
            data: { macaddress: this.state.masterId }
         })
            .then((response) => {
               console.log(response);
               if (response.status === 200) {
                  this.setState({
                     success: true,
                     error: false,
                     message: "Master Gateway is removed successfully.",
                  });
               } else {
                  this.setState({
                     success: false,
                     error: true,
                     message: "Master Gateway is not removed.",
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
               } else if (error.response.status === 404) {
                  this.setState({
                     success: false,
                     error: true,
                     message: "Master Gateway ID is not found.",
                  });
               } else {
                  this.setState({
                     success: false,
                     error: true,
                     message: "Error occurred. Please try again.",
                  });
               }
            })
      }
   }

   changeFloor = (event) => {
      console.log('----changeFloor-----', event.target.value);
      this.setState({ floorId: event.target.value });
   };

   componentWillUnmount() {
      clearTimeout(this.timeout);
      this.setState({
         floorId: "",
         masterId: "",
         error: false,
         success: false,
         message: "",
      })
   }

   render() {
      const { error, success, message, masterId } = this.state;
      return (
         <Fragment>
            <div  style={{ overflow: 'hidden',float: "right", width: "78%", marginRight:'5px'}}>
            <p className={common.header}>
               Master Gateway
            </p>
            {error && (<p className={common.errorMsg}>{message}</p>)}
            {success && (<p className={common.successMsg}>{message}</p>)}

            <form className="container mt-2">
               <div className="row">
                  <div className={common.textfield}>
                     <label style={{ color: "#564256" }}>Floor Name *</label>
                     <select
                        className={"form-select text-dark " + common.dropdowncolor}
                        id="rack_floorname"
                        onChange={this.changeFloor}
                     ></select>
                  </div>

                  <div className={common.textfield}>
                     <label style={{ color: "#564256" }}>Rack MAC ID *</label>
                     <input 
                     // className={common.textfield}
                        type="text"
                        name="masterId"
                        value={masterId}
                        onChange={this.inputHandler}
                        className="form-control text-dark"
                        required
                     />
                  </div>

                  <div className={common.button_centermaster}>
                     <input type="submit"
                        value="Remove Gateway"
                        onClick={this.removeGateway}
                        className={common.btn + " " + common.fourth1} />

                     <input type="submit"
                        onClick={this.masterRegistration}
                        style={{ marginLeft: '25px' }}
                        value="Register Gateway"
                        className={common.btn + " " + common.fourth} />
                  </div>
               </div>
            </form>
            </div>
         </Fragment>
      )
   }
}
