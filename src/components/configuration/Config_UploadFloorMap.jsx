import React, { Component, Fragment } from 'react';
import common from '../../styling/common.module.css';
import axios from 'axios';
import { floormap_det } from '../../urls/apiurls';

export default class Config_UploadFloorMap extends Component {
   constructor(props) {
      super(props);
      this.state = {
         floorName: "",
         width: "",
         height: "",
         image: null,
         imagePreviewUrl: null,
         message: "",
         success: false,
         error: false,
      }
   }

   inputHandler = (e) => {
      this.setState({ [e.target.name]: e.target.value })
   }

   handleImage = (e) => {
      e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
         this.setState({
            image: file,
            imagePreviewUrl: reader.result,
         });
      };
      reader.readAsDataURL(file);
   }

   uploadImage = (event) => {
      event.preventDefault();
      this.setState({ success: false, error: false });
      if (
         this.state.floorName &&
         this.state.width &&
         this.state.height &&
         this.state.image
      ) {
         let form_data = new FormData();
         form_data.append("name", this.state.floorName);
         form_data.append("image", this.state.image, this.state.image.floorName);
         form_data.append("width", parseFloat(this.state.width));
         form_data.append("height", parseFloat(this.state.height));
         axios({
            method: "POST",
            url: floormap_det,
            data: form_data,
            headers: { "content-type": "multipart/formdata" },
         })
            .then((response) => {
               if (response.status === 201) {
                  this.setState({
                     success: true,
                     error: false,
                     message: "Floor map is uploaded successfully.",
                  });
                  this.setState({ floorName: "", image: "", width: "", height: "", imagePreviewUrl: null })
               }
            })
            .catch((error) => {
               // console.log(error);
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
                     message:
                        "Error occurred while uploading floormap. Please try again.",
                  });
               }
            });
      }
   }

   componentWillUnmount() {
      clearTimeout(this.timeout);
      this.setState({
         floorName: "",
         width: "",
         height: "",
         image: null,
         imagePreviewUrl: null,
         message: "",
         success: false,
         error: false,
      })
   }

   delete = () => {
      axios({ method: "DELETE", url: "/api/uploadmap", data: { id: "9" } })
         .then((res) => {
            console.log("==========>", res);
         })
         .catch((error) => {
            console.log("====>", error);
         });
   };

   render() {
      let { imagePreviewUrl } = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
         $imagePreview = <img alt="" src={imagePreviewUrl} style={{
            width: '30vw',
            height: '10vw',
         }} />;
      }
      const { floorName, width, height, message, success, error } = this.state;
      return (
         <Fragment>
            <div style={{ overflow: 'hidden', float: "right", width: "78%", marginRight: '5px' }}>
               <div className={common.maindiv}>
                  <p className={common.header} >
                     Upload Floormap
                  </p>
                  {error && (<p className={common.errorMsg}>{message}</p>)}
                  {success && (<p className={common.successMsg}>{message}</p>)}
                  <div className="mt-4" style={{ marginLeft: "35px" }}>
                     {$imagePreview}
                  </div>
                  <form className="container mt-2"
                     onSubmit={this.uploadImage}>
                     <div className="row">
                        <div className={common.textfield}>
                           <label style={{ color: "#564256" }}>FloorName *</label>
                           <input
                              // className={common.textfield}
                              type="text"
                              value={floorName}
                              name="floorName"
                              onChange={this.inputHandler}
                              className="form-control text-dark"
                              required />
                        </div>

                        <div className={common.textfield}>
                           <label style={{ color: "#564256" }}>Width *</label>
                           <input
                              // className={common.textfield}
                              type="number"
                              value={width}
                              name="width"
                              step="any"
                              onChange={this.inputHandler}
                              className="form-control  text-dark"
                              required />
                        </div>

                        <div className={common.textfield}>
                           <label style={{ color: "#564256" }}>Height *</label>
                           <input
                              // className={common.textfield} 
                              type="number"
                              value={height}
                              name="height"
                              step="any"
                              onChange={this.inputHandler}
                              className="form-control  text-dark"
                              required />
                        </div>

                        <div className={common.textfield}>
                           <label style={{ color: "#564256" }}>Floor Image*</label>
                           <input type="file" accept="image/*" name="image" id="image"
                              onChange={this.handleImage}
                              // className={common.textfield} 
                              className="form-control  text-dark"
                              required />
                        </div>
                     </div>


                     <div className={common.button_centerfloor}>
                        <input type="submit"
                           value="Register FloorMap"
                           className={common.btn + " " + common.fourth} />
                     </div>
                     {/* <div className="input-group">
                        <input
                           type="submit"
                           value="Delete Map"
                           onClick={this.delete}
                           className={common.btn + " " + common.fourth}
                        />
                     </div> */}
                  </form>
               </div>
            </div>
         </Fragment>
      )
   }
}
