import React, { Fragment, PureComponent } from "react";
import axios from "axios";
import $ from "jquery";
import common from '../../styling/common.module.css';
import {alerts_det} from '../../urls/apiurls';

export default class Alerts extends PureComponent {

   constructor(props) {
      super(props);
      this.state = {
         message: "",
         error: false,
      };
   }

   componentDidMount = () => {
      axios({ method: "GET", url: alerts_det })
         .then((response) => {
            console.log(response);
            if (response.status === 200 && response.data.length !== 0) {
               let data = response.data;
               $("#alerts_table tbody").empty();
               let count = 1;
               for (let i = data.length - 1; i >= 0; i--) {
                  if (count === 101) break;
                  $("#alerts_table tbody").append(
                     "<tr><td>" +
                     count +
                     "</td><td>" +
                     data[i].macid.tagid +
                     "</td><td>" +
                     data[i].value +
                     "</td><td>" +
                     data[i].lastseen.replace("T", " ").substr(0, 19) +
                     "</td></tr>"
                  );
                  count = count + 1;
               }
            } else {
               $("#alerts_table tbody").empty();
               this.setState({
                  error: true,
                  message: "No data found.",
               });
            }
         })
         .catch((error) => {
            console.log(error);
            if (error.response.status === 403) {
               this.setState({
                  error: true,
                  message: "User session had timed out. Please login again.",
               });
               this.timeout = setTimeout(() => {
                  localStorage.setItem("isLogged", "failed");
                  window.location.pathname= "/"
               },1000* 2)
            } else if (error.response.status === 400) {
               this.setState({
                  error: true,
                  message: "Request Failed.",
               });
            } else {
               this.setState({
                  error: true,
                  message: "Error occurred. Please try again.",
               });
            }
         });
   };

   /** On component un-load, clear timeout set on component load. */
   componentWillUnmount = () => {
      clearTimeout(this.timeout);
   };
   render() {
      const { error, message } = this.state;
      return (
         <Fragment>
            <div  style={{ overflow: 'hidden',float: "right", width: "78%", marginRight:'5px'}}>
            <p className={common.header}>Alerts</p>
            {error && (<p className={common.errorMsg}>{message}</p>)}

            <div className="mt-3">
               <table className="table table-striped text-center table-hover" id="alerts_table">
                  <thead>
                        <tr>
                           <th>S.No</th>
                           <th>ASSET MAC ID</th>
                           <th>TYPE</th>
                           <th>LAST SEEN</th>
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
