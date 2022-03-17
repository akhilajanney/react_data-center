import React, { Fragment, Component } from "react";
import common from "../../styling/common.module.css";
import $ from "jquery";
import axios from "axios";
import { floormap_det, signal_repeater_register} from '../../urls/apiurls';

export default class Config_SignalRepeater extends Component {
   constructor(props) {
      super(props);
      this.state = {
         floorID: "",
         repeaterID: "",
         message: "",
         success: false,
         error: false,
      };
   }

   componentDidMount = () => {
      $("#repeater_floorname").empty();
      axios({ method: "GET", url: floormap_det })
         .then((response) => {
            console.log('Response--->', response);
            const data = response.data;
            if (data.length !== 0 && response.status === 200) {
               for (let i = 0; i < data.length; i++) {
                  $("#repeater_floorname").append(
                     "<option value=" + data[i].id + ">" + data[i].name + "</option>"
                  )
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
   };

   componentWillUnmount = () => {
      this.setState({
         floorID: "",
         repeaterID: "",
         message: "",
         success: false,
         error: false,
      });
      clearTimeout(this.timeout);
   };

   inputHandler = (event) => {
      this.setState({ [event.target.name]: event.target.value });
   };

   changeFloor = (event) => {
      this.setState({ floorID: event.target.value });
   };

   registerSignalRepeater = (e) => {
      e.preventDefault();
      const { floorID, repeaterID } = this.state;
      if (floorID.length > 0 && repeaterID.length > 0) {
         axios({
            method: "POST",
            url: signal_repeater_register,
            data: { floorid: floorID, macid: repeaterID },
         })
            .then((response) => {
               console.log(response);
               if (response.status === 201) {
                  this.setState({
                     success: true,
                     error: false,
                     message: "Signal Repeater is registered successfully.",
                  });
               } else {
                  this.setState({
                     success: false,
                     error: true,
                     message: "Unable to register Signal Repeater.",
                  });
               }
            })
            .catch((error) => {
               console.log(error);
               if (error.response.status === 403) {
                  this.setState({
                     success: false,
                     error: true,
                     message: "User session has timed out. Please login again.",
                  });
                  this.timeout = setTimeout(() => {
                     localStorage.setItem("isLogged", "failed");
                     window.location.pathname = "/"
                  }, 1000 * 2)
               } else if (error.response.status === 400) {
                  this.setState({
                     success: false,
                     error: true,
                     message: "Data duplication error.",
                  });
               } else {
                  this.setState({
                     success: false,
                     error: true,
                     message: "Error occurred.",
                  });
               }
            });
      }
   };

   unregisterRepeater = () => {
      // e.preventDefault();
      const { repeaterID } = this.state;
      axios({
         method: "DELETE",
         url: signal_repeater_register,
         data: { macid: repeaterID },
      })
         .then((response) => {
            console.log(response);
            if (response.status === 200) {
               this.setState({
                  success: true,
                  error: false,
                  message: "Signal Repeater is removed successfully.",
               });
            } else {
               this.setState({
                  success: false,
                  error: true,
                  message: "Unable to remove Signal Repeater.",
               });
            }
         })
         .catch((error) => {
            console.log(error);
            if (error.response.status === 403) {
               this.setState({
                  success: false,
                  error: true,
                  message: "User session has timed out. Please login again.",
               });
               this.timeout = setTimeout(() => {
                  localStorage.setItem("isLogged", "failed");
                  window.location.pathname = "/"
               }, 1000 * 2)
            } else {
               this.setState({
                  success: false,
                  error: true,
                  message: "Error occurred.",
               });
            }
         });
   };
   render() {
      const { success, error, message, repeaterID } = this.state;
      return (
         <Fragment>
            <div  style={{ overflow: 'hidden',float: "right", width: "78%", marginRight:'5px'}}>
            <p className={common.header}>Signal Repeater</p>
            {error && (<p className={common.errorMsg}>{message}</p>)}
            {success && (<p className={common.successMsg}>{message}</p>)}

            <form className="container mt-2"
               onSubmit={this.registerSignalRepeater}>
               <div className="row">
                  <div className={common.textfield}>
                     <label style={{color: "#564256"}}>Floor Name *</label>
                     <select
                        className={"form-select  text-dark  "+common.dropdowncolor}
                        id="repeater_floorname"
                        onChange={this.changeFloor}
                     ></select>
                  </div>

                  <div className={common.textfield}>
                     <label style={{color: "#564256"}}>Signal Repeater ID *</label>
                     <input 
                     // className={common.textfield}
                        type="text"
                        name="repeaterID"
                        value={repeaterID}
                        onChange={this.inputHandler}
                        className="form-control text-dark "
                        required
                     />
                  </div>
               </div>
               <div className={common.button_centermaster}>
                  <input type="submit"
                     value="Remove Gateway"
                     className={common.btn + " " + common.fourth1} />

                  <input type="submit"
                     style={{ marginLeft: '25px' }}
                     value="Register Gateway"
                     onClick={() => this.unregisterRepeater()}
                     className={common.btn + " " + common.fourth} />
               </div>
            </form>
            </div>
         </Fragment>
      )
   }
}
