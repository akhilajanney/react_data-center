import React, { Component, Fragment } from 'react';
import common from '../../styling/common.module.css';
import $ from 'jquery';
import axios from 'axios';
import { assettag_det} from '../../urls/apiurls';

export default class Health_Assest extends Component {
   constructor(props) {
      super(props);
      this.state = {
         error: false,
         message: "",
      }
   }

   componentDidMount() {
      this.assestsHealthData();
      this.interval = setInterval(this.assestsHealthData, 15 * 1000)
   }
   componentWillUnmount() {
      clearInterval(this.interval);
      clearTimeout(this.timeout);
      this.setState({ error: false, message: "", })
   }

   assestsHealthData = (e) => {
      console.log('===assestsHealthData====',);
      axios({ method: "GET", url: assettag_det})
         .then((response) => {
            const data = response.data;
            console.log('=====>', response);
            if (data.length !== 0 && response.status === 200) {
               $("#assets_health tbody").empty();
               for (let i = 0; i < data.length; i++) {
                  let status = 'red';
                  if ((new Date() - new Date(data[i].lastseen)) <= (2 * 60 * 1000)) {
                     status = "green";
                  }
                  $("#assets_health tbody").append(
                     "<tr>" +
                     "<td>" + (i + 1) + "</td>" +
                     "<td>" + data[i].tagid + "</td>" +
                     "<td>" + data[i].battery + "</td>" +
                     "<td>" + data[i].lastseen.replace("T", " ").substr(0, 19) + "</td>" +
                     "<td>" +
                     "<div style = 'margin:auto;width:12px;height: 12px;border-radius:12px;background-color:" + status + "'></div>" + "</td> " +
                     "</tr>"
                  )
               }
            } else {
               this.setState({
                  error: true,
                  message: "No data found for assests tag Gateway.",
               });
            }
         })
         .catch((error) => {
            console.log('Health assests tag gate Error====', error);
            if (error.response.status === 403) {
               this.setState({
                  error: true,
                  message: "User Session has timed out. Please login again.",
               });
               this.timeout = setTimeout(() => {
                  localStorage.setItem("isLogged", "failed");
                  window.location.pathname = "/"
               }, 1000 * 2)
            } else {
               this.setState({ error: true, message: "Request Failed." });
            }
         })
   }

   
   render() {
      const { error, message } = this.state;
      return (
         <Fragment>
             <div  style={{ overflow: 'hidden',float: "right", width: "78%", marginRight:'5px'}}>
            <p className={common.header}>Assets Tag</p>
            {error && (<p className={common.errorMsg}>{message}</p>)}
            <div className="mt-2">
               <table className="table table-striped text-center table-hover" id="assets_health">
                  <thead>
                     <tr>
                        <th>S.NO</th>
                        <th>ASSET MAC ID</th>
                        <th>BATTERY STATUS(%)</th>
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
