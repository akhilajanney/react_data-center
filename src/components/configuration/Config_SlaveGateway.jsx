import React, { Component, Fragment } from 'react';
import common from '../../styling/common.module.css';
import axios from 'axios';
import $ from 'jquery';
import { mastergate_register, slavegate_register } from '../../urls/apiurls';

export default class Config_SlaveGateway extends Component {
   constructor(props) {
      super(props);
      this.state = {
         slaveId: "",
         masterId: "",
         error: false,
         success: false,
         message: "",
      }
   }
   componentDidMount() {
      axios({ method: "GET", url: mastergate_register })
         .then((response) => {
            // console.log(response);
            if (response.status === 200 && response.data.length !== 0) {
               $("#gatewayID").empty();
               for (let i = 0; i < response.data.length; i++) {
                  $("#gatewayID").append(
                     "<option value=" +
                     response.data[i].id +
                     ">" +
                     response.data[i].gatewayid +
                     "</option>"
                  );
               }
               this.setState({ masterId: response.data[0].id });
            } else {
               this.setState({
                  success: false,
                  error: true,
                  message: "No floor map details is found.",
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
            } else {
               this.setState({
                  success: false,
                  error: true,
                  message: "Error occurred. Please try again.",
               });
            }
         });
   }

   componentWillUnmount() {
      clearTimeout(this.timeout);
      this.setState({
         slaveId: "",
         masterId: "",
         error: false,
         success: false,
         message: "",
      })
   }

   inputHandler = (e) => {
      this.setState({ [e.target.name]: e.target.value })
   }

   slaveRegistration = (e) => {
      e.preventDefault();
      console.log('slaveRegistration=====>', this.state);
      const { slaveId, masterId } = this.state;
      axios({
         method: "POST", url: slavegate_register,
         data: { masterid: masterId, macaddress: slaveId },
      })
         .then((response) => {
            console.log('slaveRegistration=====>', response);
            if (response.status === 200 || response.status === 201) {
               this.setState({
                  success: true,
                  error: false,
                  message: "Slave Gateway is registered successfully.",
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
                  message: "Slave Gateway ID found.",
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

   changeGateway = (event) => {
      this.setState({ masterId: event.target.value, message: "", error: false, success: false });
   };

   removeGateway = (e) => {
      e.preventDefault();
      axios({
         method: "DELETE", url: slavegate_register,
         data: { macaddress: this.state.slaveId },
      })
         .then((response) => {
            console.log(response);
            if (response.status === 200) {
               this.setState({
                  success: true,
                  error: false,
                  message: "Slave Gateway is removed successfully.",
               });
            } else {
               this.setState({
                  success: false,
                  error: true,
                  message: "Slave Gateway is not removed.",
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
   render() {
      const { error, success, message, masterId, slaveId } = this.state;
      return (
         <Fragment>
            <div style={{ overflow: 'hidden', float: "right", width: "78%", marginRight: '5px' }}>
               <h3 className={common.header}>Slave Gateway</h3>
               {error && (<p className={common.errorMsg}>{message}</p>)}
               {success && (<p className={common.successMsg}>{message}</p>)}
               <form className="container mt-2">
                  <div className="row">
                     <div className={common.textfield}>
                        <label style={{ color: "#564256" }}>Master Gateway ID*</label>
                        <select
                           className={"form-select text-dark " + common.dropdowncolor}
                           id="gatewayID"
                           onChange={this.changeGateway}
                        ></select>
                     </div>

                     <div className={common.textfield}>
                        <label style={{ color: "#564256" }}>Slave Gateway ID*</label>
                        <input
                           // className={common.textfield}
                           type="text"
                           name="slaveId"
                           value={slaveId}
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
                           style={{ marginLeft: '25px' }}
                           value="Register Gateway"
                           onClick={this.slaveRegistration}
                           className={common.btn + " " + common.fourth} />
                     </div>
                  </div>

               </form>
            </div>
         </Fragment>

      )
   }
}
