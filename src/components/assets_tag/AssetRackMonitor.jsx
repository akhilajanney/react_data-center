import React, { Component, Fragment } from 'react';
import common from '../../styling/common.module.css';
import $ from 'jquery';
import axios from 'axios';
import { floormap_det, asset_rack_det } from '../../urls/apiurls';

export default class AssetRackMonitor extends Component {
   constructor(props) {
      super(props);
      this.state = {
         error: false,
         message: "",
      }
   }

   componentDidMount() {
      axios({ method: "GET", url: floormap_det})
         .then((response) => {
            // console.log(response);
            $("#rack_monitor_select").empty();
            if (response.status === 200 && response.data.length !== 0) {
               for (let i = 0; i < response.data.length; i++) {
                  $("#rack_monitor_select").append(
                     "<option value=" +
                     response.data[i].id +
                     ">" +
                     response.data[i].name +
                     "</option>"
                  );
               }
               this.getRackDetails();
               this.interval = setInterval(this.getRackDetails, 15 * 1000)
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
                  window.location.reload = "/"
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
      clearInterval(this.interval);
      clearTimeout(this.timeout);
      this.setState({ error: false, message: "", })
   }

   getRackDetails = () => {
      this.setState({ error: false, message:"" })
      // console.log('===getRackDetails====');
      axios({
         method: "GET",
         url: asset_rack_det + $("#rack_monitor_select").val(),
      })
         .then((response) => {
            console.log('===getRackDetails====',response);
            if (response.status === 200 && response.data.length !== 0) {
               let data = response.data;
               $("#rack_details_table tbody").empty();
               for (let i = 0; i < data.length; i++) {
                  $("#rack_details_table tbody").append(
                     "<tr><td>" +
                     (i + 1) +
                     "</td><td>" +
                     data[i].macid +
                     "</td><td>" +
                     data[i].pdu +
                     "</td><td>" +
                     data[i].capacity +
                     "</td></tr>"
                  );
               }
            } else {
               $("#rack_details_table tbody").empty();
               this.setState({
                  error: true,
                  success: false,
                  message:
                     "No rack is registered for the floor. Please select some other floor.",
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

   render() {
      const { error, message } = this.state;
      return (
         <Fragment>
              <div  style={{ overflow: 'hidden',float: "right", width: "78%", marginRight:'5px'}}>
            <p className={common.header}>
               Rack Monitor
            </p>
            {error && (<p className={common.errorMsg}>{message}</p>)}
            <select
               id="rack_monitor_select"
               style={{ width: "30%" }}
               onChange={this.getRackDetails}
               className="form-select bg-light text-dark border border-secondary mt-2"
            ></select>
            <div className="mt-3">
               <table className="table table-striped text-center table-hover" id="rack_details_table">
                  <thead>
                     <tr>
                        <th>S.No</th>
                        <th>RACK ID</th>
                        <th>PDU</th>
                        <th>CAPACITY</th>
                     </tr>
                  </thead>

                  <tbody></tbody>
               </table>
            </div>
            </div>
         </Fragment>
      )
   }
}
