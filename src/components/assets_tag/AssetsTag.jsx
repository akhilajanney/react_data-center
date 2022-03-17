import React, { Component, Fragment } from 'react';
import common from '../../styling/common.module.css';
import $ from 'jquery';
import axios from 'axios';
import { assettag_det} from '../../urls/apiurls';


export default class AssetsTag extends Component {
   constructor(props) {
      super(props);
      this.state = {
         error: false,
         message: "",
      };
   }

   componentDidMount = () => {
      this.assetTagDetails();
      this.interval = setInterval(this.assetTagDetails, 15 * 1000)
   }
   componentWillUnmount() {
      clearInterval(this.interval);
      clearTimeout(this.timeout);
      this.setState({ error: false, message: "", })
   }

   assetTagDetails = () => {
      console.log('assetTagDetails=========');
      axios({ method: "GET", url: assettag_det })
         .then((response) => {
            console.log(response);
            if (response.status === 200 && response.data.length !== 0) {
               let data = response.data;
               $("#asset_details_table tbody").empty();
               for (let i = 0; i < data.length; i++) {
                  let status = "red";
                  if (new Date() - new Date(data[i].lastseen) <= 2 * 60 * 1000) {
                     status = "green";
                  }
                  $("#asset_details_table tbody").append(
                     "<tr><td>" +
                     (i + 1) +
                     "</td><td>" +
                     data[i].tagid +
                     "</td><td>" +
                     data[i].rackno.macid +
                     "</td><td>" +
                     data[i].usage +
                     "</td><td>" +
                     data[i].lastseen.replace("T", " ").substr(0, 19) +
                     "</td><td>" +
                     "<div style='margin:auto; width:0px; padding:5px; border-radius:5px; background-color:" +
                     status +
                     ";'></div></td></tr>"
                  );
               }
            } else {
               $("#asset_details_table tbody").empty();
               this.setState({
                  error: true,
                  message: "No data found for MasterGateway.",
               });
            }
         })
         .catch((error) => {
            // console.log(error);
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
         });
   } 


   render() {
      const { error, message } = this.state;
      return (
         <Fragment>
             <div  style={{ overflow: 'hidden',float: "right", width: "78%", marginRight:'5px'}}>
            <p className={common.header}>Asset Tag</p>
            {error && (<p className={common.errorMsg}>{message}</p>)}
            <div className="mt-3">
               <table className="table table-striped text-center table-hover" id="asset_details_table">
                  <thead>
                     <tr>
                        <th>S.No</th>
                        <th>ASSET ID</th>
                        <th>RACK ID</th>
                        <th>UNIT USAGE</th>
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
