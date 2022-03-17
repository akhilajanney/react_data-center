import React, { Component, Fragment, Suspense } from 'react';
import common from '../../styling/common.module.css';
import $ from 'jquery';
import axios from 'axios';
import { signal_repeater_register } from '../../urls/apiurls';

export default class Health_SignalRepeater extends Component {
   constructor(props) {
      super(props);
      this.state = {
         error: false,
         message: "",
         repeaterData: ""
      }
   }

   componentDidMount() {
      this.signalRepeaterData();
      // this.interval = setInterval(this.signalRepeaterData, 15 * 1000)


   }


   componentWillUnmount() {
      clearInterval(this.interval);
      clearTimeout(this.timeout);
      this.setState({ error: false, message: "", })
   }

   signalRepeaterData = (e) => {
      // console.log('===signalRepeaterData====',);
      axios({ method: "GET", url: signal_repeater_register })
         .then((response) => {
            if (response.status === 200 && response.data.length !== 0) {
               let data = response.data;
               console.log('signalrepeaters',data)
               $("#repeater_table tbody").empty();
               for (let i = 0; i < data.length; i++) {
                  let status = "red";
                  if (new Date() - new Date(data[i].lastseen) <= 2 * 60 * 1000) {
                     status = "green";
                  }
                  $("#repeater_table tbody").append(
                     "<tr><td>" +
                     (i + 1) +
                     "</td><td>" +
                     data[i].macid +
                     "</td><td>" +
                     data[i].lastseen.replace("T", " ").substr(0, 19) +
                     "</td><td>" +
                     "<div style='margin:auto; width:0px; padding:5px; border-radius:5px; background-color:" +
                     status +
                     ";'></div></td></tr>"
                  );
               }
            } else {
               this.setState({
                  error: true,
                  message: "No data found for Signal Repeater.",
               });
            }
         })
         .catch((error) => {
            if (error.response.status === 403) {
               this.setState({
                  error: true,
                  message: "User Session has timed out. Please login again.",
               });
               this.timeout = setTimeout(() => {
                  localStorage.setItem("isLogged", "failed");
                  window.location.pathname = "/"
               }, 1000 * 2)
            } else if (error.response.status === 404) {
               this.setState({
                  error: true,
                  message: "No data found for Signal Repeater.",
               });
            } else {
               this.setState({ error: true, message: "Request Failed." });
            }
         });
   }

   render() {
      const { error, message } = this.state;
      return (
         <Fragment>
             <div  style={{ overflow: 'hidden',float: "right", width: "78%", marginRight:'5px'}}>
            <p className={common.header}>Signal Repeater</p>
            {error && (<p className={common.errorMsg}>{message}</p>)}
            <div className="mt-3">
               <table className="table table-striped text-center table-hover" id="repeater_table">
                  <thead>
                     <tr>
                        <th>S.NO</th>
                        <th>ASSET MAC ID</th>
                        {/* <th>SENSOR TYPE</th>
                        <th>BATTERY STATUS(%)</th> */}
                        <th>LAST SEEN</th>
                        <th>STATUS</th>
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