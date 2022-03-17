import React, { Component, Fragment } from 'react';
import common from '../../styling/common.module.css';
import $ from 'jquery';
import axios from 'axios';
import { slavegate_register } from '../../urls/apiurls';

export default class Health_SlaveGateway extends Component {
   constructor(props) {
      super(props);
      this.state = {
         error: false,
         message: "",
      }
   }

   componentDidMount() {
      this.slaveGate();
      this.interval = setInterval(this.slaveGate, 15 * 1000)
   }
   componentWillUnmount() {
      clearInterval(this.interval);
      clearTimeout(this.timeout);
      this.setState({ error: false, message: "", })
   }

   slaveGate = () => {
      console.log('===slaveGate====');
      axios({ method: "GET", url: slavegate_register })
         .then((response) => {
            const data = response.data;
            console.log('=====>', data);
            if (data.length !== 0 && response.status === 200) {
               $("#slave_table tbody").empty();
               for (let i = 0; i < data.length; i++) {
                  let status = 'red';
                  if ((new Date() - new Date(data[i].lastseen)) <= (2 * 60 * 1000)) {
                     status = "green";
                  }

                  $("#slave_table tbody").append(
                     "<tr>" +
                     "<td>" + (i + 1) + "</td>" +
                     "<td>" + data[i].gatewayid + "</td>" +
                     "<td>" + data[i].master.floor.name + "</td>" +
                     "<td>" + data[i].master.gatewayid + "</td>" +
                     "<td>" + data[i].lastseen.replace("T", " ").substr(0, 19) + "</td>" +
                     "<td>" +
                     "<div style = 'margin:auto;width:12px;height: 12px;border-radius:12px;background-color:" + status + "'></div></td> " +
                     "</tr>"
                  )
               }
            } else {
               this.setState({
                  error: true,
                  message: "No data found for Slave Gateway.",
               });
            }
         })
         .catch((error) => {
            console.log('Health Slave gate Error====', error);
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
            <p className={common.header}>Slave Gateway</p>
            {error && (<p className={common.errorMsg}>{message}</p>)}
            <div className="mt-3">
               <table className="table table-striped text-center table-hover" id="slave_table">
                  <thead>
                     <tr>
                        <th>S.NO</th>
                        <th>SLAVE ID</th>
                        <th>FLOOR NAME</th>
                        <th>MASTER GATEWAY ID</th>
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
