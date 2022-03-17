import React, { Component, Fragment } from 'react';
import common from '../../styling/common.module.css';
import $ from 'jquery';
import axios from 'axios';
import { health_sensors_det } from '../../urls/apiurls';

export default class Health_Sensors extends Component {
   constructor(props) {
      super(props);
      this.state = {
         error: false,
         message: "",
      }
   }

   componentDidMount() {
      this.sensorsData();
      this.interval = setInterval(this.sensorsData, 15 * 1000)
   }
   componentWillUnmount() {
      clearInterval(this.interval);
      clearTimeout(this.timeout);
      this.setState({ error: false, message: "", })
   }

   sensorsData = () => {
      console.log('===sensorsData====');
      axios({ method: "GET", url: health_sensors_det})
         .then((response) => {
            const data = response.data.Temphumidity;
            console.log('=====>', response);
            if (data.length !== 0 && response.status === 200) {
               $("#sensors_table tbody").empty();
               for (let i = 0; i < data.length; i++) {
                  let status = 'red';
                  if ((new Date() - new Date(data[i].lastseen)) <= (2 * 60 * 1000)) {
                     status = "green";
                  }

                  $("#sensors_table tbody").append(
                     "<tr>" +
                     "<td>" + (i + 1) + "</td>" +
                     "<td>" + data[i].macid + "</td>" +
                     "<td>Temp/Humid Sensor</td>" +
                     "<td>" + data[i].battery + "</td>" +
                     "<td>" + data[i].lastseen.replace("T", " ").substr(0, 19) + "</td>" +
                     "<td>" +
                     "<div style = 'margin:auto;width:12px;height: 12px;border-radius:12px;background-color:" + status + "'></div>" + "</td > " +
                     "</tr>"
                  )
               }
            } else {
               this.setState({
                  error: true,
                  message: "No data found for Sensors Gateway.",
               });
            }
         })
         .catch((error) => {
            console.log('Health Sensors gate Error====', error);
            if (error.response.status === 403) {
               this.setState({
                  error: true,
                  message: "User Session has timed out. Please login again.",
               });
               this.timeout = setTimeout(() => {
                  localStorage.setItem("isLogged", "failed");
                  window.location.pathname = "/"
               }, 1000 * 2);
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
            <p className={common.header}>Sensors</p>
            {error && (<p className={common.errorMsg}>{message}</p>)}
            <div className="mt-3">
               <table className="table table-striped text-center table-hover"  id="sensors_table">
                  <thead>
                     <tr>
                        <th>S.NO</th>
                        <th>MAC ID</th>
                        <th>SENSOR TYPE</th>
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
